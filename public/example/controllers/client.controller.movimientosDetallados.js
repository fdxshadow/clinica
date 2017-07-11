angular.module('clinicaApp').controller('MovimientosDetalladosController', ['$scope', 'CONSTANTES_ESTADO_CONFIRMADO', 
	function ($scope, CONSTANTES_ESTADO_CONFIRMADO) {
		$scope.egresosVisibility = false;
		$scope.ingresosVisibility = false;
		$scope.estadoConfirmado = CONSTANTES_ESTADO_CONFIRMADO;

	    $scope.showEgresos = function() {
			$scope.egresosVisibility = true;
			$scope.ingresosVisibility = false;
			$scope.ingresosLinkStyle = {'color': '#333', 'backgroundColor': '#fff'};
			$scope.egresosLinkStyle = {'color': '#fff', 'backgroundColor': '#00ad84'};
        };
	    $scope.showIngresos = function() {
			$scope.egresosVisibility = false;
			$scope.ingresosVisibility = true;
			$scope.egresosLinkStyle = {'color': '#333', 'backgroundColor': '#fff'};
			$scope.ingresosLinkStyle = {'color': '#fff', 'backgroundColor': '#00ad84'};
        };
  }]);
