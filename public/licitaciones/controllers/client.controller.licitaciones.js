// Invocar modo JavaScript 'strict'
'use strict';

// Crear el controller 'licitacions'
angular.module('licitaciones').controller('LicitacionesController', ['$scope', '$routeParams', '$location', 'Authentication', 'LicitacionesResource', 'LicitacionesResource',
    function($scope, $routeParams, $location, Authentication, LicitacionesResource, NuevoIngresoService) {
        // Exponer el service Authentication
        $scope.authentication = Authentication;
        $scope.buttonVisibility = false;

        // Crear un nuevo método controller para crear nuevos licitacions
        $scope.create = function() {
            // Usar los campos form para crear un nuevo objeto $resource licitacion
            var licitacion = new LicitacionesResource({
                run: this.run,
                nombre: this.nombre,
                fono: this.fono
            });

            // Usar el método '$save' de licitacion para enviar una petición POST apropiada
            licitacion.$save(function(response) {
                NuevoIngresoService.licitacion = response;
                // Si un licitacion fue creado de modo correcto, redireccionar al usuario a la página del licitacion 
                $location.path('licitaciones');
            }, function(errorResponse) {
                // En otro caso, presentar al usuario el mensaje de error
                $scope.error = errorResponse.data.message;
            });
        };

        // Crear un nuevo método controller para recuperar una lista de licitacions
        $scope.find = function() {
            // Usar el método 'query' de licitacion para enviar una petición GET apropiada
            $scope.licitaciones = LicitacionesResource.query();
        };

        // Crear un nuevo método controller para recuperar un unico licitacion
        $scope.findOne = function() {
            // Usar el método 'get' de licitacion para enviar una petición GET apropiada
            $scope.licitacion = LicitacionesResource.get({
                licitacionId: $routeParams.licitacionId
            });
        };

        // Crear un nuevo método controller para actualizar un único licitacion
        $scope.update = function() {
            // Usar el método '$update' de licitacion para enviar una petición PUT apropiada
            $scope.licitacion.$update(function() {
                // Si un licitacion fue actualizado de modo correcto, redirigir el user a la página del licitacion 
                $location.path('licitaciones/' + $scope.licitacion._id);
            }, function(errorResponse) {
                // En otro caso, presenta al user un mensaje de error
                $scope.error = errorResponse.data.message;
            });
        };

        // Crear un nuevo método controller para borrar un único licitacion
        $scope.delete = function(licitacion) {
            // Si un licitacion fue enviado al método, borrarlo
            if (licitacion) {
                // Usar el método '$remove' del licitacion para borrar el licitacion
                licitacion.$remove(function() {
                    // Eliminar el licitacion de la lista de licitacions
                    for (var i in $scope.licitaciones) {
                        if ($scope.licitaciones[i] === licitacion) {
                            $scope.licitaciones.splice(i, 1);
                        }
                    }
                });
            } else {
                // En otro caso, usar el método '$remove' de licitacion para borrar el licitacion
                $scope.licitacion.$remove(function() {
                    $location.path('licitaciones');
                });
            }
        };

    }
]);