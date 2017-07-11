// Invocar modo JavaScript 'strict'
'use strict';

// Crear el controller 'productos'
angular.module('productos').controller('ProductosController', ['$scope', '$routeParams', '$location', 'Authentication', 'ProductosResource',
    function($scope, $routeParams, $location, Authentication, ProductosResource) {
        // Exponer el service Authentication
        $scope.authentication = Authentication;

        // Crear un nuevo método controller para crear nuevos productos
        $scope.create = function() {
            // Usar los campos form para crear un nuevo objeto $resource producto
            var producto = new ProductosResource({
                _id: this.codigoID,
                descripcion: this.descripcion,
                cantidadComprada: this.cantidadComprada,
                proveedor: this.proveedor
            });

            // Usar el método '$save' de producto para enviar una petición POST apropiada
            producto.$save(function(response) {
                NuevoIngresoService.producto = response;
                // Si un producto fue creado de modo correcto, redireccionar al usuario a la página del producto 
                $location.path('productos');
            }, function(errorResponse) {
                // En otro caso, presentar al usuario el mensaje de error
                $scope.error = errorResponse.data.message;
            });
        };

        // Crear un nuevo método controller para recuperar una lista de productos
        $scope.find = function() {
            // Usar el método 'query' de producto para enviar una petición GET apropiada
            $scope.productos = ProductosResource.query();
            // inicializar arreglo de inputs para recepcion de materiales
            $scope.recibidos = [];
            for (var i = $scope.productos.length - 1; i >= 0; i--) $scope.productos.push('');
        };

        // Crear un nuevo método controller para recuperar un unico producto
        $scope.findOne = function() {
            // Usar el método 'get' de producto para enviar una petición GET apropiada
            $scope.producto = ProductosResource.get({
                productoId: $routeParams.productoId
            });
        };

        $scope.updateStockProducto = function(index){
            $scope.producto = $scope.productos[index];
            $scope.producto.cantidadRecibida = $scope.producto.cantidadRecibida + $scope.recibidos[index];
            $scope.update();
            // $scope.productos[index] = $scope.producto;
            // $scope.recibidos[index] = '';
        };

        // Crear un nuevo método controller para actualizar un único producto
        $scope.update = function() {
            // Usar el método '$update' de producto para enviar una petición PUT apropiada
            $scope.producto.$update(function() {
                // Si un producto fue actualizado de modo correcto, redirigir el user a la página del producto 
                console.log('OK');
                $location.path('productos');
            }, function(errorResponse) {
                // En otro caso, presenta al user un mensaje de error
                $scope.error = errorResponse.data.message;
                console.log($scope.error);
            });
        };

        // Crear un nuevo método controller para borrar un único producto
        $scope.delete = function(producto) {
            // Si un producto fue enviado al método, borrarlo
            if (producto) {
                // Usar el método '$remove' del producto para borrar el producto
                producto.$remove(function() {
                    // Eliminar el producto de la lista de productos
                    for (var i in $scope.productos) {
                        if ($scope.productos[i] === producto) {
                            $scope.productos.splice(i, 1);
                        }
                    }
                });
            } else {
                // En otro caso, usar el método '$remove' de producto para borrar el producto
                $scope.producto.$remove(function() {
                    $location.path('productos');
                });
            }
        };

    }
]);