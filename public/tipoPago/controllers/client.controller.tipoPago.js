// Invocar modo JavaScript 'strict'
'use strict';

// Crear el controller 'tipoPago'
angular.module('tipoPago').controller('TipoPagoController', ['$scope', '$routeParams', '$location', 'Authentication', 'TipoPagoResource', '$localStorage',
    function($scope, $routeParams, $location, Authentication, TipoPagoResource, $localStorage) {
        // Exponer el service Authentication
        $scope.authentication = Authentication;
        $scope.$storage = $localStorage;
        $scope.buttonVisibility = false;

        // metodo para seleccionar uno de los tipoPago en el caso de uso agregar nuevo ingreso
        $scope.setTipoPago = function(index){
            $scope.$storage.tipoPago = $scope.tipoPagos[index];
            $location.path('registrar_ingreso');
        };

        // Crear un nuevo método controller para crear nuevos tipoPago
        $scope.create = function() {
            // Usar los campos form para crear un nuevo objeto $resource tipoPago
            var tipoPago = new TipoPagoResource({
                nombre: this.nombre,
                descuento: this.descuento
            });

            // Usar el método '$save' de tipoPago para enviar una petición POST apropiada
            tipoPago.$save(function(response) {
                // Si un tipoPago fue creado de modo correcto, redireccionar al usuario a la página del tipoPago 
                $location.path('tipoPagos');
            }, function(errorResponse) {
                // En otro caso, presentar al usuario el mensaje de error
                $scope.error = errorResponse.data.message;
            });
        };

        // Crear un nuevo método controller para recuperar una lista de tipoPago
        $scope.find = function() {
            // Usar el método 'query' de tipoPago para enviar una petición GET apropiada
            $scope.tipoPagos = TipoPagoResource.query();
        };

        // Crear un nuevo método controller para recuperar un unico tipoPago
        $scope.findOne = function() {
            // Usar el método 'get' de tipoPago para enviar una petición GET apropiada
            $scope.tipoPago = TipoPagoResource.get({
                tipoPagoId: $routeParams.tipoPagoId
            });
        };

        // Crear un nuevo método controller para actualizar un único tipoPago
        $scope.update = function() {
            // Usar el método '$update' de tipoPago para enviar una petición PUT apropiada
            $scope.tipoPago.$update(function() {
                // Si un tipoPago fue actualizado de modo correcto, redirigir el user a la página del tipoPago 
                $location.path('tipoPagos');
            }, function(errorResponse) {
                // En otro caso, presenta al user un mensaje de error
                $scope.error = errorResponse.data.message;
            });
        };

        // Crear un nuevo método controller para borrar un único tipoPago
        $scope.delete = function(tipoPago) {
            // Si un tipoPago fue enviado al método, borrarlo
            if (tipoPago) {
                // Usar el método '$remove' del tipoPagos para borrar el tipoPago
                tipoPago.$remove(function() {
                    // Eliminar el tipoPago de la lista de tipoPago
                    for (var i in $scope.tipoPagos) {
                        if ($scope.tipoPagos[i] === tipoPago) {
                            $scope.tipoPagos.splice(i, 1);
                        }
                    }
                });
            } else {
                // En otro caso, usar el método '$remove' de tipoPago para borrar el tipoPago
                $scope.tipoPago.$remove(function() {
                    $location.path('tipoPagos');
                });
            }
        };
    }
]);