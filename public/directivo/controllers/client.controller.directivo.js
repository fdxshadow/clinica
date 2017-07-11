// Invocar modo JavaScript 'strict'
'use strict';

// Crear el controller 'ingresos'
angular.module('directivos').controller('DirectivosController', ['$scope', '$routeParams', '$location', '$http', 'Authentication',
    function($scope, $routeParams, $location, $http, Authentication) {
        // Exponer el service Authentication
        $scope.authentication = Authentication;

        $scope.egresos = [
            {operacionales: 80.000}
        ];
        
        $http.get('http://venomws.uv.cl/MovPptoCR-war/ws/movPptocr?P_CCOSTO=318123013&ANIO=2017').//'http://rest-service.guides.spring.io/greeting').
            then(function(response) {
                $scope.WSresponse = response.data;
        });

        $scope.findEstadoResultadoByPeriodo = function() {
            return IngresosResource.query({
                year:  $scope.year,
                month: $scope.month
            });
        };
        
    }
]);