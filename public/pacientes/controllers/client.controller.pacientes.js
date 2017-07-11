// Invocar modo JavaScript 'strict'
'use strict';

// Crear el controller 'pacientes'
angular.module('pacientes').controller('PacientesController', ['$scope', '$routeParams', '$location', 'Authentication', 'PacientesResource', '$localStorage',
    function($scope, $routeParams, $location, Authentication, PacientesResource, $localStorage) {
        // Exponer el service Authentication
        $scope.authentication = Authentication;
        $scope.$storage = $localStorage;
        $scope.buttonVisibility = false;
        
        // metodo para seleccionar uno de los pacientes en el caso de uso agregar nuevo ingreso
        $scope.setPaciente = function(index){
//            NuevoIngresoService.paciente = $scope.pacientes[index];
            $scope.$storage.paciente = $scope.pacientes[index];
            $scope.buttonVisibility = true;
        };

        // Crear un nuevo método controller para crear nuevos pacientes
        $scope.create = function() {
            // Usar los campos form para crear un nuevo objeto $resource paciente
            var paciente = new PacientesResource({
                run: this.run,
                nombre: this.nombre,
                fono: this.fono
            });

            // Usar el método '$save' de paciente para enviar una petición POST apropiada
            paciente.$save(function(response) {
//                NuevoIngresoService.paciente = response;
                $scope.$storage.paciente = response;
                // Si un paciente fue creado de modo correcto, redireccionar al usuario a la página del paciente 
                $location.path('procedimientos');
            }, function(errorResponse) {
                // En otro caso, presentar al usuario el mensaje de error
                $scope.error = errorResponse.data.message;
            });
        };

        // Crear un nuevo método controller para recuperar una lista de pacientes
        $scope.find = function() {
            // Usar el método 'query' de paciente para enviar una petición GET apropiada
            $scope.pacientes = PacientesResource.query();
        };

        // Crear un nuevo método controller para recuperar un unico paciente
        $scope.findOne = function() {
            // Usar el método 'get' de paciente para enviar una petición GET apropiada
            $scope.paciente = PacientesResource.get({
                pacienteId: $routeParams.pacienteId
            });
        };

        // Crear un nuevo método controller para actualizar un único paciente
        $scope.update = function() {
            // Usar el método '$update' de paciente para enviar una petición PUT apropiada
            $scope.paciente.$update(function() {
                // Si un paciente fue actualizado de modo correcto, redirigir el user a la página del paciente 
                $location.path('pacientes');
            }, function(errorResponse) {
                // En otro caso, presenta al user un mensaje de error
                $scope.error = errorResponse.data.message;
            });
        };

        // Crear un nuevo método controller para borrar un único paciente
        $scope.delete = function(paciente) {
            // Si un paciente fue enviado al método, borrarlo
            if (paciente) {
                // Usar el método '$remove' del paciente para borrar el paciente
                paciente.$remove(function() {
                    // Eliminar el paciente de la lista de pacientes
                    for (var i in $scope.pacientes) {
                        if ($scope.pacientes[i] === paciente) {
                            $scope.pacientes.splice(i, 1);
                        }
                    }
                });
            } else {
                // En otro caso, usar el método '$remove' de paciente para borrar el paciente
                $scope.paciente.$remove(function() {
                    $location.path('pacientes');
                });
            }
        };

    }
]);