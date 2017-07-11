angular.module('clinicaApp').controller('RegistrarFacturaController', ['$scope', 'CONSTANTES_ESTADO_CONFIRMADO', 
	function ($scope, CONSTANTES_ESTADO_CONFIRMADO) {
		$scope.HCVBVisibility = false;
		$scope.FONASAVisibility = false;

	    $scope.showHCVB = function() {
			$scope.HCVBVisibility = true;
			$scope.FONASAVisibility = false;
			$scope.FONASALinkStyle = {'color': '#333', 'backgroundColor': '#fff'};
			$scope.HCVBLinkStyle = {'color': '#fff', 'backgroundColor': '#00ad84'};
        };
	    $scope.showFONASA = function() {
			$scope.HCVBVisibility = false;
			$scope.FONASAVisibility = true;
			$scope.HCVBLinkStyle = {'color': '#333', 'backgroundColor': '#fff'};
			$scope.FONASALinkStyle = {'color': '#fff', 'backgroundColor': '#00ad84'};
        };
  }]);
