// Invocar modo JavaScript 'strict'
'use strict';

// Crear el controller 'Procedimientos'
angular.module('procedimientos').controller('ProcedimientosController', ['$scope', '$routeParams', '$location', 'Authentication', 'ProcedimientosResource', '$localStorage', 'orderByFilter', 
    function($scope, $routeParams, $location, Authentication, ProcedimientosResource, $localStorage, orderByFilter) {
        // Exponer el service Authentication
        $scope.authentication = Authentication;
        $scope.$storage = $localStorage;
        $scope.buttonVisibility = false;

        // metodo para seleccionar uno de los Procedimientos en el caso de uso agregar nuevo ingreso
        $scope.setProcedimiento = function(index){
//            NuevoIngresoService.procedimiento = $scope.procedimientos[index];
            $scope.$storage.procedimiento = $scope.procedimientos[index];
            $location.path('medicos');
        };

        $scope.visibility_procedimientos = true;
        $scope.toogleVisibility_procedimientos = function(){
            $scope.visibility_procedimientos = !$scope.visibility_procedimientos;
            $scope.closeAlert();
        }
        // ordenar tabla de procedimientos por alguna columna determinada
        $scope.propertyName = null;
        $scope.reverse = false;
        $scope.sortBy = function(propertyName) {
            $scope.reverse = (propertyName !== null && $scope.propertyName === propertyName)? !$scope.reverse : false;
            $scope.propertyName = propertyName;
            $scope.procedimientos = orderByFilter($scope.procedimientos, $scope.propertyName, $scope.reverse);
        };

        // Crear un nuevo método controller para crear nuevos procedimientos
        $scope.create = function() {
            // Usar los campos form para crear un nuevo objeto $resource Procedimiento
            var procedimiento = new ProcedimientosResource({
                nombre: this.nombre,
                precio: this.precio
            });

            // Usar el método '$save' de Procedimiento para enviar una petición POST apropiada
            procedimiento.$save(function(response) {
                // Si un Procedimiento fue creado de modo correcto, redireccionar al usuario a la página del Procedimiento 
                $scope.procedimientos.push(response);
                $scope.toogleVisibility_procedimientos();
            }, function(errorResponse) {
                // En otro caso, presentar al usuario el mensaje de error
                $scope.error = errorResponse.data.message;
            });
        };

        // Crear un nuevo método controller para recuperar una lista de procedimientos
        $scope.find = function() {
            // Usar el método 'query' de Procedimiento para enviar una petición GET apropiada
            $scope.procedimientos = ProcedimientosResource.query();
        };

        $scope.find_fromAdministracion = function() {
            $scope.procedimientos = ProcedimientosResource.query();
            if($scope.style_tr) $scope.style_tr.splice(0, $scope.style_tr.length);
            else $scope.style_tr = [];
            for (var i = $scope.procedimientos.length - 1; i >= 0; i--) $scope.style_tr.push('');
        };

        // Crear un nuevo método controller para recuperar un unico Procedimiento
        $scope.findOne = function() {
            // Usar el método 'get' de Procedimiento para enviar una petición GET apropiada
            $scope.procedimiento = ProcedimientosResource.get({
                procedimientoId: $routeParams.procedimientoId
            });
        };

        // Crear un nuevo método controller para actualizar un único Procedimiento
        $scope.update = function(index) {
            $scope.procedimiento = $scope.procedimientos[index];
            // Usar el método '$update' de Procedimiento para enviar una petición PUT apropiada
            $scope.procedimiento.$update(function() {
                // Si un Procedimiento fue actualizado de modo correcto, redirigir el user a la página del Procedimiento 
                $scope.quitChangedAlert(index);
            }, function(errorResponse) {
                // En otro caso, presenta al user un mensaje de error
                $scope.error = errorResponse.data.message;
            });
        };

        // Crear un nuevo método controller para borrar un único Procedimiento
        $scope.delete = function(index) {
            $scope.procedimiento = $scope.procedimientos[index];
            // Usar el método '$remove' del Procedimiento para borrar el Procedimiento
            $scope.procedimiento.$remove(function() {
                $scope.procedimientos.splice(index, 1);
            });
        };

        // Funcion para cerrar los mensajes de error
        $scope.closeAlert = function(){
            $scope.error = null;
        };

        $scope.setChangedAlert = function(index){
            $scope.style_tr[index] = {'backgroundColor': '#ffd3d3'};
        }
        $scope.quitChangedAlert = function(index){
            $scope.style_tr[index] = {};
        }

    }
]);