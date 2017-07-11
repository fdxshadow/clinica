var mainAppModuleName = 'CRHUV-App';

var mainAppModule = angular.module(mainAppModuleName, [
	'ngResource',
	'ngRoute',
	'ui.bootstrap',
	'ngStorage',
	'clinicaApp', 
	'users', 
	'pacientes', 
	'procedimientos', 
	'medicos', 
	'ingresos', 
	'tipoPago',
	'facturas', 
	'licitaciones',
	'compraDirecta',
	'productos',
	'directivos',
	'administracion'
]);

mainAppModule.constant('CONSTANTES_ESTADO_CREADO', 'Creado');
mainAppModule.constant('CONSTANTES_ESTADO_ESPERA', 'Espera');
mainAppModule.constant('CONSTANTES_ESTADO_REGISTRADO', 'Registrado');
mainAppModule.constant('CONSTANTES_ESTADO_CONFIRMADO', 'Confirmado');

mainAppModule.constant('CONSTANTES_RUT_UV', '60.921.000-1');
mainAppModule.constant('CONSTANTES_CENTRO_COSTOS', '318123013');

mainAppModule.constant('CONSTANTES_FACTURA_HCVB', 'Hospital Carlos Van Buren');
mainAppModule.constant('CONSTANTES_FACTURA_FONASA', 'Fonasa');

mainAppModule.config(['$locationProvider', 
	function($locationProvider){
		$locationProvider.hashPrefix('!');
	}
]);

angular.element(document).ready(function(){
	angular.bootstrap(document, [mainAppModuleName]);
});
