// Invocar modo JavaScript 'strict'
'use strict';

// Crear el controller 'ingresos'
angular.module('ingresos').controller('IngresosController', ['$scope', '$routeParams', '$location', 'Authentication', 'TipoPagoResource', 'ProcedimientosResource', 'IngresosResource', '$filter', 'orderByFilter', 'CONSTANTES_FACTURA_HCVB', 'CONSTANTES_FACTURA_FONASA',
    function($scope, $routeParams, $location, Authentication, TipoPagoResource, ProcedimientosResource, IngresosResource, $filter, orderByFilter, CONSTANTES_FACTURA_HCVB, CONSTANTES_FACTURA_FONASA) {
        // Exponer el service Authentication
        $scope.authentication = Authentication;
   
        //====== ordenar tabla de ingresos por alguna columna determinada ======//
        //======================================================================//
        $scope.propertyName = null;
        $scope.reverse = false;
        $scope.sortBy = function(propertyName) {
            $scope.reverse = (propertyName !== null && $scope.propertyName === propertyName)? !$scope.reverse : false;
            $scope.propertyName = propertyName;
            $scope.ingresos = orderByFilter($scope.ingresos, $scope.propertyName, $scope.reverse);
        };
        // filtros 
        $scope.filterBy = function() {
            var nombreProcedimiento = ($scope.filtro_procedimiento == null)? undefined: $scope.filtro_procedimiento.nombre;
            var nombreTipoPago = ($scope.filtro_tipoPago == null)? undefined: $scope.filtro_tipoPago.nombre;

            $scope.ingresos = $filter('filter')($scope.ingresos_unfiltered, {
                paciente: {nombre: $scope.filtro_nombrePaciente},
                medico: {nombre: $scope.filtro_nombreMedico},
                procedimiento: {nombre: nombreProcedimiento},
                tipoPago: {nombre: nombreTipoPago},
                codigoPago: $scope.filtro_codigoPago
            });
        };


        //============ Paginacion de la tabla de ingresos ======================//
        //======================================================================//
        $scope.currentPage = 1;   //pagina actual
        $scope.itemsPerPage = 10; //catidad de items por pagina
        $scope.maxSize = 5;       //Cantidad máxima de botones en la barra de paginación
        $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
        };
        $scope.pageChanged = function() {
            console.log('Page changed to: ' + $scope.currentPage);
        };
        $scope.setItemsPerPage = function(num) {
          $scope.itemsPerPage = num;
          $scope.currentPage = 1; //reset to first paghe
        };


        // calcular monto total de los ingresos
        $scope.getMontoTotal = function() {
            $scope.montoTotalIngresos = 0;
            for (var i = $scope.ingresos.length - 1; i >= 0; i--) {
                $scope.montoTotalIngresos = $scope.montoTotalIngresos + $scope.ingresos[i].monto;
            }
            return $scope.montoTotalIngresos;
        };


        //========================== CRUD Ingresos ==========================//
        //======================================================================//
        $scope.create = function() {
            // Usar los campos form para crear un nuevo objeto $resource ingreso
            var ingreso = new IngresosResource({
              codigoPago: $scope.codigoPago,
              paciente: $scope.paciente._id,
              medico: $scope.medico._id,
              procedimiento: $scope.procedimiento._id,
              tipoPago: $scope.tipoPago._id,
              monto: $scope.procedimiento.precio,
              estado: $scope.estadoIngreso
              // fecha y responsable se asigna en backend
            });
            // // Usar el método '$save' de ingreso para enviar una petición POST apropiada
             ingreso.$save(function(response) {
                // Si un ingreso fue creado de modo correcto, redireccionar al usuario a la página del ingreso 
                $location.path('home_administrativo');
            }, function(errorResponse) {
                // En otro caso, presentar al usuario el mensaje de error
                $scope.error = errorResponse.data.message;
            });
        };

        // Crear un nuevo método controller para recuperar una lista de ingresos
        $scope.find = function() {
            // Usar el método 'query' de ingreso para enviar una petición GET apropiada
            $scope.ingresos_unfiltered = IngresosResource.query();
            $scope.ingresos = $scope.ingresos_unfiltered;
        };

        $scope.find_byFecha = function() {
            $scope.customPeriodoVisibility = $scope.periodo == $scope.periodos.custom;
            $scope.ingresos_unfiltered = IngresosResource.query(
                {fecha: $scope.periodo.start},
                function(){
                    $scope.filterBy();// filtrar resultados
                    $scope.initChartTimeline();
                    $scope.initChartData('tipoPago', $scope.tipoPagos, $scope.Chart_tipoPagosLabels, $scope.Chart_tipoPagosData);
                    $scope.initChartData('procedimiento', $scope.procedimientos, $scope.Chart_ProcedimientosLabels, $scope.Chart_ProcedimientosData);
                    $scope.setupChart_doughnut('tipoPagos', $scope.Chart_tipoPagosLabels, $scope.Chart_tipoPagosData);
                    $scope.setupChart_doughnut('procedimientos', $scope.Chart_ProcedimientosLabels, $scope.Chart_ProcedimientosData);
                }, function(errorResponse) {
                    $scope.error = errorResponse.data.message;
                }
            );
        };

        $scope.findIngresosHCVB_byEstado = function(_estado) {
            $scope.findIngresosByTipoPago_Estado(CONSTANTES_FACTURA_HCVB, _estado);
        };
        
        $scope.findIngresosFonasa_byEstado = function(_estado) {
            $scope.findIngresosByTipoPago_Estado(CONSTANTES_FACTURA_FONASA, _estado);
        };
        
        $scope.findIngresosByTipoPago_Estado = function(_tipoPago, _estado) {
            $scope.ingresos_unfiltered = IngresosResource.query({
                nombreTipoPago: _tipoPago,
                nombreEstado: _estado
            });
            $scope.ingresos = $scope.ingresos_unfiltered;
        };
        // Crear un nuevo método controller para recuperar un unico ingreso
        $scope.findOne = function() {
            // Usar el método 'get' de ingreso para enviar una petición GET apropiada
            $scope.ingreso = IngresosResource.get({
                ingresoId: $routeParams.ingresoId
            });
        };
        // Crear un nuevo método controller para actualizar un único ingreso
        $scope.update = function() {
            // Usar el método '$update' de ingreso para enviar una petición PUT apropiada
            $scope.ingreso.$update(function() {
                // Si un ingreso fue actualizado de modo correcto, redirigir el user a la página del ingreso 
                $location.path('ingresos');
            }, function(errorResponse) {
                // En otro caso, presenta al user un mensaje de error
                $scope.error = errorResponse.data.message;
            });
        };

        // Crear un nuevo método controller para borrar un único ingreso
        $scope.delete = function(ingreso) {
            // Si un ingreso fue enviado al método, borrarlo
            if (ingreso) {
                // Usar el método '$remove' del ingreso para borrar el ingreso
                ingreso.$remove(function() {
                    // Eliminar el ingreso de la lista de ingresos
                    for (var i in $scope.ingresos) {
                        if ($scope.ingresos[i] === ingreso) {
                            $scope.ingresos.splice(i, 1);
                        }
                    }
                });
            } else {
                // En otro caso, usar el método '$remove' de ingreso para borrar el ingreso
                $scope.ingreso.$remove(function() {
                    $location.path('ingresos');
                });
            }
        };


        //======================================================================//
        $scope.find_Procedimientos = function() {
            // Usar el método 'query' de ingreso para enviar una petición GET apropiada
            $scope.procedimientos = ProcedimientosResource.query(
                {},
                function(){
                    if($scope.ingresos){
                        $scope.initChartData('procedimiento', $scope.procedimientos, $scope.Chart_ProcedimientosLabels, $scope.Chart_ProcedimientosData);
                        $scope.setupChart_doughnut('procedimientos', $scope.Chart_ProcedimientosLabels, $scope.Chart_ProcedimientosData);
                    }
                }, function(errorResponse) {
                    $scope.error = errorResponse.data.message;
                }
            );
        };
        $scope.find_tipoPago = function() {
            // Usar el método 'query' de ingreso para enviar una petición GET apropiada
            $scope.tipoPagos = TipoPagoResource.query(
                {},
                function(){
                    if($scope.ingresos){
                        $scope.initChartData('tipoPago', $scope.tipoPagos, $scope.Chart_tipoPagosLabels, $scope.Chart_tipoPagosData);
                        $scope.setupChart_doughnut('tipoPagos', $scope.Chart_tipoPagosLabels, $scope.Chart_tipoPagosData);
                    }
                }, function(errorResponse) {
                    $scope.error = errorResponse.data.message;
                }
            );
        };


        //========================== Filtro de Fechas ==========================//
        //======================================================================//
        $scope.today = function() {
            return new Date();
        };
        // Disable weekend selection
        function disabled(data) {
            var date = data.date,
              mode = data.mode;
            return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
        }
        $scope.initDates = function() {
            var date = new Date();
            var year = date.getYear();
            var month = date.getMonth();
            var semesterStart = month >= 7 ? 7: 2; // 

            $scope.periodos = {
                lastMonth: {
                    name: 'Último Mes',
                    start: new Date(year, month, 1),
                    end: $scope.today()
                },
                lastSemester: {
                    name: 'Último Semestre',
                    start: new Date(year, semesterStart, 1),
                    end: $scope.today()
                },
                lastYear: {
                    name: 'Último Año',
                    start: new Date(year, 1, 1),
                    end: $scope.today()
                },
                custom: {
                    name: 'Personalizado',
                    start: null,
                    end:   null
                }
            };
            console.log($scope.periodos);
        };
        $scope.dateOptions = {
            dateDisabled: disabled,
            formatYear: 'yyyy',
            formatMonth: 'MMMM',
            maxDate: new Date(),
            minDate: new Date(2017, 4, 1),
            startingDay: 1,
            showWeeks: false
        };
        $scope.initDates = function() {
            var date = new Date();
            var year = date.getYear();
            var month = date.getMonth();
            var semesterStart = month >= 7 ? 7: 2; // 

            $scope.periodos = {
                lastMonth: {
                    name: 'Último Mes',
                    start: new Date(year, month, 1),
                    end: $scope.today()
                },
                lastSemester: {
                    name: 'Último Semestre',
                    start: new Date(year, semesterStart, 1),
                    end: $scope.today()
                },
                lastYear: {
                    name: 'Último Año',
                    start: new Date(year, 1, 1),
                    end: $scope.today()
                },
                custom: {
                    name: 'Personalizado',
                    start: null,
                    end:   null
                }
            };
        sssssss};

        $scope.format = 'dd - MMMM - yyyy';
        $scope.initDates();
        $scope.periodo = $scope.periodos.lastMonth;
        $scope.find_byFecha();






        //========================== Graficos ==========================//
        //======================================================================//
        $scope.doughnutChart_colors = ['#004D40', '#00796B', '#009688', '#4DB6AC', '#B2DFDB', '#B0BEC5', '#78909C', '#546E7A', '#37474F','#0a6d4d'];
        $scope.Chart_tipoPagosLabels=[];
        $scope.Chart_tipoPagosData  =[];
        $scope.Chart_ProcedimientosLabels=[];
        $scope.Chart_ProcedimientosData  =[];
        $scope.Chart_procedimientos;
        $scope.Chart_tipoPagos;

        $scope.setupChart_doughnut = function(chartID, chartLabels, chartData){//, chartLabel, chartColors_Background, chartColors_Border, chartOptions){
            var ctx = document.getElementById(chartID);
            var chart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: chartLabels,
                    datasets: [{
                        label: '# of Votes',
                        data: chartData,
                        backgroundColor: $scope.doughnutChart_colors,
                        borderColor: $scope.doughnutChart_colors,
                        borderWidth: 1
                    }]
                },
                options: $scope.chartOptionsDoughnut
            });
            chart.update();
        };

        $scope.chartOptionsDoughnut = {
            legend: {
                display: false,
                usePointStyle: true,
                position: 'right'
            },
            tooltips: { 
                callbacks: {
                    label: function(tooltipItem, data) {
                        var indice = tooltipItem.index;                 
                        return  $filter('currency')(data.datasets[0].data[indice], '$', 0);
                    },
                    title: function(tooltipItem, data) {
                        var indice = tooltipItem[0].index;
                        return  data.labels[indice];
                    }
                }
            }
        }

        $scope.initChartData = function(label, keys, labels, data) {
            labels.splice(0, labels.length);
            data.splice(0, data.length);            
            for (var i = 0; i < keys.length; i++) {
                labels.push(keys[i].nombre);
                var sum = 0;
                for (var j = 0; j < $scope.ingresos.length; j++) {
                    if($scope.ingresos[j][label] && $scope.ingresos[j][label].nombre == labels[i]){
                        sum+= $scope.ingresos[j].monto;
                    }
                }
                data.push(sum);
            }
        };

        $scope.initChartTimeline = function(){
            var j = 0;
            if($scope.Chart_timeLineData){$scope.Chart_timeLineData.splice(0, $scope.Chart_timeLineData.length);}
            else {$scope.Chart_timeLineData = [];}

            while (j < $scope.ingresos.length) {
                var fechaInicial = new Date($scope.ingresos[j].fecha);
                var fecha = fechaInicial;
                var day = fecha.getDate();
                var month = fecha.getMonth();
                var sum = 0;
                
                while(fecha.getDate() == day && fecha.getMonth() == month ){
                    sum+= $scope.ingresos[j++].monto;
                    if(j == $scope.ingresos.length) break;
                    fecha = new Date($scope.ingresos[j].fecha);
                }                
                $scope.Chart_timeLineData.push({
                    x: fechaInicial,
                    y: sum
                });
            }
            // console.log($scope.Chart_timeLineData);
            // generar grafico
            var ctx = document.getElementById('tiempo');
            var chart = new Chart(ctx, {
                type: 'line',
                data: {
                    datasets: [{
                        label: 'Ingresos durante el periodo',
                        backgroundColor: $scope.doughnutChart_colors[4],
                        borderColor: $scope.doughnutChart_colors[0],
                        data: $scope.Chart_timeLineData,
                        fill: 'start'
                    }]
                },
                options: {
//                    events: ['click'],
                    maintainAspectRatio: false,
                    spanGaps: false,
                    elements: {
                        line: {
                            tension: 0.4
                        }
                    },
                    scales: {
                        xAxes: [{
                            type: 'time',
                            time: {
                                // min: moment($filter('date')($scope.periodo.start, 'yyyy-MM-dd')),
                                // max: moment($filter('date')($scope.periodo.end, 'yyyy-MM-dd')),
                                displayFormats: {
                                    quarter: 'MMM YYYY'
                                }
                            }
                        }],
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    },
                    legend: {
                        display: false
                    },
                    tooltips: { 
                        callbacks: {
                            label: function(tooltipItem, data) {
                                return $filter('currency')(tooltipItem.yLabel, '$', 0);
                            },
                            title: function(tooltipItem, data) {
                                return $filter('date')(tooltipItem[0].xLabel, 'dd  MMMM, yyyy');
                            }
                        }
                    }
                },
            });
            chart.update();

        };




}]);
