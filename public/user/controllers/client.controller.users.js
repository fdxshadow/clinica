// Invocar modo JavaScript 'strict'
'use strict';

// Crear el controller 'users'
angular.module('users').controller('UserController', ['$scope', '$routeParams', '$location', 'Authentication', 'UsersResource', 'orderByFilter', 
    function($scope, $routeParams, $location, Authentication, UsersResource, orderByFilter) {
        // Exponer el service Authentication
        $scope.authentication = Authentication;


        $scope.visibility_usuarios = true;
        $scope.toogleVisibility_usuario = function(){
            $scope.visibility_usuarios = !$scope.visibility_usuarios;
            $scope.closeAlert();
        }
        // ordenar tabla de users por alguna columna determinada
        $scope.propertyName = null;
        $scope.reverse = false;
        $scope.sortBy = function(propertyName) {
            $scope.reverse = (propertyName !== null && $scope.propertyName === propertyName)? !$scope.reverse : false;
            $scope.propertyName = propertyName;
            $scope.users = orderByFilter($scope.users, $scope.propertyName, $scope.reverse);
        };


        // Crear un nuevo método controller para crear nuevos users
        $scope.create = function() {
            // Usar los campos form para crear un nuevo objeto $resource user
            var user = new UsersResource({
                nombre: this.nombre,
                apellido: this.apellido,
                email: this.email,
                username: this.username,
                password: this.password,
                tipoUsuario: this.tipoUsuario
            });
            user.$save(function(response) {// Si un user fue creado de modo correcto
                $scope.users.push(response);
                $scope.toogleVisibility_usuario();
            }, function(errorResponse) {
                // En otro caso, presentar al usuario el mensaje de error
                $scope.error = errorResponse.data.message;
            });
        };

        // Crear un nuevo método controller para recuperar una lista de users
        $scope.find = function() {
            // Usar el método 'query' de user para enviar una petición GET apropiada
            $scope.users = UsersResource.query();
        };

        $scope.find_fromAdministracion = function() {
            $scope.users = UsersResource.query();
            if($scope.style_tr) $scope.style_tr.splice(0, $scope.style_tr.length);
            else $scope.style_tr = [];
            for (var i = $scope.users.length - 1; i >= 0; i--) $scope.style_tr.push('');
        };

        // Crear un nuevo método controller para actualizar un único Procedimiento
        $scope.update = function(index) {
            $scope.user = $scope.users[index];
            // Usar el método '$update' de Procedimiento para enviar una petición PUT apropiada
            $scope.user.$update(function() {
                // Si un Procedimiento fue actualizado de modo correcto, redirigir el user a la página del Procedimiento 
                $scope.quitChangedAlert(index);
            }, function(errorResponse) {
                // En otro caso, presenta al user un mensaje de error
                $scope.error = errorResponse.data.message;
            });
        };

        // Crear un nuevo método controller para borrar un único Procedimiento
        $scope.delete = function(index) {
            $scope.user = $scope.users[index];
            // Usar el método '$remove' del Procedimiento para borrar el Procedimiento
            $scope.user.$remove(function() {
                $scope.users.splice(index, 1);
            });
            $location.path('home_administrador');
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
