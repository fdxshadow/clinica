// Invocar modo JavaScript 'strict'
'use strict';

// Crear el controller 'medicos'
angular.module('medicos').controller('MedicosController', ['$scope', '$routeParams', '$location', 'Authentication', 'MedicosResource', '$localStorage', 'orderByFilter', 
    function($scope, $routeParams, $location, Authentication, MedicosResource, $localStorage ,orderByFilter) {
        // Exponer el service Authentication
        $scope.authentication = Authentication;
        
        $scope.$storage = $localStorage;
        $scope.buttonVisibility = false;
        // metodo para seleccionar uno de los medicos en el caso de uso agregar nuevo ingreso
        $scope.setMedico = function(index){
            $scope.$storage.medico = $scope.medicos[index];
            $scope.buttonVisibility = true;
        };

        $scope.visibility_medicos = true;
        $scope.toogleVisibility_medicos = function(){
            $scope.visibility_medicos = !$scope.visibility_medicos;
            $scope.closeAlert();
        }
        // ordenar tabla de medicos por alguna columna determinada
        $scope.propertyName = null;
        $scope.reverse = false;
        $scope.sortBy = function(propertyName) {
            $scope.reverse = (propertyName !== null && $scope.propertyName === propertyName)? !$scope.reverse : false;
            $scope.propertyName = propertyName;
            $scope.medicos = orderByFilter($scope.medicos, $scope.propertyName, $scope.reverse);
        };

        // Crear un nuevo método controller para crear nuevos medicos
        $scope.create = function() {
            // Usar los campos form para crear un nuevo objeto $resource medico
            var medico = new MedicosResource({
                run: this.run,
                nombre: this.nombre,
                especialidad: this.especialidad
            });

            // Usar el método '$save' de medico para enviar una petición POST apropiada
            medico.$save(function(response) {
                // Si un medico fue creado de modo correcto, redireccionar al usuario a la página del medico 
                $scope.medicos.push(response);
                $scope.toogleVisibility_medicos();
            }, function(errorResponse) {
                // En otro caso, presentar al usuario el mensaje de error
                $scope.error = errorResponse.data.message;
            });
        };

        // Crear un nuevo método controller para recuperar una lista de medicos
        $scope.find = function() {
            // Usar el método 'query' de medico para enviar una petición GET apropiada
            $scope.medicos = MedicosResource.query();
        };

        $scope.find_fromAdministracion = function() {
            $scope.medicos = MedicosResource.query();
            if($scope.style_tr) $scope.style_tr.splice(0, $scope.style_tr.length);
            else $scope.style_tr = [];
            for (var i = $scope.medicos.length - 1; i >= 0; i--) $scope.style_tr.push('');
        };

        // Crear un nuevo método controller para recuperar un unico medico
        $scope.findOne = function() {
            // Usar el método 'get' de medico para enviar una petición GET apropiada
            $scope.medico = MedicosResource.get({
                medicoId: $routeParams.medicoId
            });
        };

        // Crear un nuevo método controller para actualizar un único Procedimiento
        $scope.update = function(index) {
            $scope.medico = $scope.medicos[index];
            // Usar el método '$update' de Procedimiento para enviar una petición PUT apropiada
            $scope.medico.$update(function() {
                // Si un Procedimiento fue actualizado de modo correcto, redirigir el user a la página del Procedimiento
                $scope.quitChangedAlert(index);
            }, function(errorResponse) {
                // En otro caso, presenta al user un mensaje de error
                $scope.error = errorResponse.data.message;
            });
        };

        // Crear un nuevo método controller para borrar un único Procedimiento
        $scope.delete = function(index) {
            $scope.medico = $scope.medicos[index];
            // Usar el método '$remove' del Procedimiento para borrar el Procedimiento
            $scope.medico.$remove(function() {
                $scope.medicos.splice(index, 1);
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