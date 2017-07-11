// Invocar modo JavaScript 'strict'
'use strict';

// Crear el controller 'compraDirectas'
angular.module('compraDirecta').controller('CompraDirectaController', ['$scope', '$routeParams', '$location', 'Authentication', 'CompraDirectaResource', 'ProductosResource',
    function($scope, $routeParams, $location, Authentication, CompraDirectaResource, ProductosResource) {
        // Exponer el service Authentication
        $scope.authentication = Authentication;

        // Crear un nuevo método controller para crear nuevos compraDirectas
        $scope.create = function() {
            var compraDirecta = new CompraDirectaResource({
                unidad: this.unidad,
                centroResponsabilidad: this.centroResponsabilidad,
                nombreSolicitante: this.nombreSolicitante,
                lugarDespacho: this.lugarDespacho
            });
            compraDirecta.$save(function(response) {
                console.log('compra directa agregada: '+ compraDirecta);
                console.log(response);
                $scope.createProducts(response._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Crear un nuevo método controller para recuperar una lista de compraDirectas
        $scope.find = function() {
            // Usar el método 'query' de compraDirecta para enviar una petición GET apropiada
            $scope.compraDirectas = CompraDirectaResource.query();
        };

        // Crear un nuevo método controller para recuperar un unico compraDirecta
        $scope.findOne = function() {
            // Usar el método 'get' de compraDirecta para enviar una petición GET apropiada
            $scope.compraDirecta = CompraDirectaResource.get({
                compraDirectaId: $routeParams.compraDirectaId
            });
        };

        // Crear un nuevo método controller para actualizar un único compraDirecta
        $scope.update = function() {
            // Usar el método '$update' de compraDirecta para enviar una petición PUT apropiada
            $scope.compraDirecta.$update(function() {
                // Si un compraDirecta fue actualizado de modo correcto, redirigir el user a la página del compraDirecta 
                $location.path('compraDirectas');
            }, function(errorResponse) {
                // En otro caso, presenta al user un mensaje de error
                $scope.error = errorResponse.data.message;
            });
        };

        // Crear un nuevo método controller para borrar un único compraDirecta
        $scope.delete = function(compraDirecta) {
            // Si un compraDirecta fue enviado al método, borrarlo
            if (compraDirecta) {
                // Usar el método '$remove' del compraDirecta para borrar el compraDirecta
                compraDirecta.$remove(function() {
                    // Eliminar el compraDirecta de la lista de compraDirectas
                    for (var i in $scope.compraDirectas) {
                        if ($scope.compraDirectas[i] === compraDirecta) {
                            $scope.compraDirectas.splice(i, 1);
                        }
                    }
                });
            } else {
                // En otro caso, usar el método '$remove' de compraDirecta para borrar el compraDirecta
                $scope.compraDirecta.$remove(function() {
                    $location.path('compraDirectas');
                });
            }
        };

        $scope.closeAlert = function(){
            $scope.error = null;
        }        
// =================================================================================================================== //
// =========================== Funciones para productos de la compra directa ========================================= //
// =================================================================================================================== //
        $scope.init_empty_productos = function() {
            $scope.productos = [];
        };
        $scope.addProduct = function() {
            $scope.productos.push({
                cantidadComprada: '',
                descripcion: '',
                codigoID: '',
                proveedor: ''
            });
        };
        $scope.removeProduct = function(index) {
            $scope.productos.splice(index, 1);
        };

        $scope.createProducts = function(compraDirectaID){
            console.log('Create Productos de la compra directa');
            for (var i = $scope.productos.length - 1; i >= 0; i--) {
                var producto = new ProductosResource({
                    codigoID:                $scope.productos[i].codigoID,
                    descripcion:        $scope.productos[i].descripcion,
                    cantidadComprada:   $scope.productos[i].cantidadComprada,
                    proveedor:          $scope.productos[i].proveedor,
                    compraDirecta:      compraDirectaID
                });

                // Usar el método '$save' de producto para enviar una petición POST apropiada
                producto.$save(function(response) {
                    console.log('producto agregado: '+response);

                }, function(errorResponse) {
                    // En otro caso, presentar al usuario el mensaje de error
                    $scope.error = errorResponse.data.message;
                });
            }
            $location.path('home_administrativo');
        };

    }
]);