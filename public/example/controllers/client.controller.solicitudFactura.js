angular.module('clinicaApp').controller('SolicitudFacturaController', ['$scope', 'CONSTANTES_ESTADO_CONFIRMADO', '$sce',
	function ($scope, CONSTANTES_ESTADO_CONFIRMADO, $sce) {
		
		$scope.HCVBVisibility = false;
		$scope.FONASAVisibility = false;

            $scope.showHCVB = function() {
			$scope.HCVBVisibility = true;
			$scope.FONASAVisibility = false;
			$scope.FONASALinkStyle = {'color': '#333', 'backgroundColor': '#fff'};
			$scope.HCVBLinkStyle = {'color': '#fff', 'backgroundColor': '#00ad84'};
                  $scope.HCVB_precioUnitario = document.getElementById('montoTotalHCVB').innerHTML;
                  $scope.HCVB_precioTotal = document.getElementById('montoTotalHCVB').innerHTML;
            };
	      $scope.showFONASA = function() {
			$scope.HCVBVisibility = false;
			$scope.FONASAVisibility = true;
			$scope.HCVBLinkStyle = {'color': '#333', 'backgroundColor': '#fff'};
			$scope.FONASALinkStyle = {'color': '#fff', 'backgroundColor': '#00ad84'};
            };

            $scope.downloadSolicitudFacturaHCVB = function(){
                  var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
                  var f=new Date();
      			var fecha = f.getDate() + ' - ' + (f.getMonth()+1) + ' - ' + f.getFullYear();
                  facturaHCVB = new jsPDF('p', 'pt', 'letter');

                  facturaHCVB.setFontSize(8);
                  facturaHCVB.setFontStyle('normal');
         
                  facturaHCVB.rect(97,  68, 410, 60);
      	        facturaHCVB.text(100, 80, 'USO EXCLUSIVO ADMINISTRACION FACULTAD DE MEDICINA', null, null);

                  facturaHCVB.text(100, 100, 'FECHA RECEPCION', null, null);
                  facturaHCVB.rect(200, 92, 300,10);

                  facturaHCVB.text(100, 115, 'FECHA SOLICITUD', null, null);
                  facturaHCVB.rect(200, 107, 300,10);
                  facturaHCVB.text(200, 115, '  '+fecha, null, null);

                  facturaHCVB.text(100, 160, 'DOCUMENTO', null, null);
                  facturaHCVB.rect(200, 152, 300,10);
                  facturaHCVB.text(200, 160, ' FACTURA EXENTA', null, null);
                  facturaHCVB.setFontSize(6);
                  facturaHCVB.text(198, 170, '   (FACTURA AFECTA O EXENTA, NOTA CREDITO O DEBITO)', null, null);
                  facturaHCVB.setFontSize(8);

                  facturaHCVB.text(100, 190, 'NOMBRE O RAZON SOCIAL', null, null);
                  facturaHCVB.rect(220, 182, 280,10);
                  facturaHCVB.text(220, 190, ' SERVICIO NACIONAL DE SALUD HOSPITAL CARLOS VAN BUREN', null, null);

                  facturaHCVB.text(100, 205, 'DIRECCION', null, null);
                  facturaHCVB.rect(200, 197, 300,10);
                  facturaHCVB.text(200, 205, ' SAN IGNACIO N° 725', null, null);

                  facturaHCVB.text(100, 220, 'RUT', null, null);
                  facturaHCVB.rect(200, 212, 110,10);
                  facturaHCVB.text(200, 220, ' 61.602.054-4', null, null);

                  facturaHCVB.text(340, 220, 'TELEFONO', null, null);
                  facturaHCVB.rect(400, 212, 100,10);
                  facturaHCVB.text(400, 220, ' 32-2364965  32-2364091', null, null);
                  facturaHCVB.setFontSize(6);
                  facturaHCVB.text(398, 230, '     INDICAR CODIGO DE AREA', null, null);
                  facturaHCVB.setFontSize(8);

                  facturaHCVB.text(100, 260, 'GIRO', null, null);
                  facturaHCVB.rect(200, 252, 300,10);
                  facturaHCVB.text(200, 260, ' SALUD', null, null);

                  facturaHCVB.text(100, 275, 'GLOSA', null, null);
                  facturaHCVB.rect(200, 267, 300,25);
                  facturaHCVB.text(200, 275, ' '+$scope.HCVB_glosa, null, null);

                  facturaHCVB.text(100, 305, 'PRECIO UNITARIO', null, null);
                  facturaHCVB.rect(200, 297, 300,10);
                  facturaHCVB.text(200, 305, ' '+$scope.HCVB_precioUnitario, null, null);

                  facturaHCVB.text(100, 320, 'PRECIO TOTAL', null, null);
                  facturaHCVB.rect(200, 312, 300,10);
                  facturaHCVB.text(200, 320, ' '+$scope.HCVB_precioTotal, null, null);

                  facturaHCVB.text(100, 335, 'CENTROS DE RESPONSABILIDAD', null, null);
                  facturaHCVB.rect(235, 327, 265,10);
                  facturaHCVB.text(235, 335, ' '+$scope.HCVB_centroResponsabilidad, null, null);
                  facturaHCVB.setFontSize(6);
                  facturaHCVB.text(226, 343, 'SI SON DOS CENTROS, INDICAR CLARAMENTE EL MONTO ASOCIADO A CADA UNO DE ELLOS',null,null);
                  facturaHCVB.setFontSize(8);

                  facturaHCVB.text(100, 370, 'CONDICIONES DE PAGO', null, null);
                  facturaHCVB.rect(200, 362, 300,10);
                  facturaHCVB.text(200, 370, ' '+$scope.HCVB_centroResponsabilidad, null, null);
                  facturaHCVB.setFontSize(6);
                  facturaHCVB.text(200, 380, ' 30, 45, 60 DIAS U OTRO (ESPECIFICAR)',null,null);
                  facturaHCVB.setFontSize(8);

                  facturaHCVB.text(100, 400, 'NOMBRE Y CORREO DE CONTACTO', null, null);
                  facturaHCVB.text(100, 410, 'DE LA EMPRESA A QUIEN SE LE FACTURA', null, null);
                  facturaHCVB.rect(280, 392, 220,10);
                  facturaHCVB.text(280, 400, 'daniela.espinoza@redsalud.gov.cl', null, null);
                  facturaHCVB.rect(280, 402, 220,10);
                  facturaHCVB.rect(280, 412, 220,10);

      			facturaHCVB.setDrawColor(255,0,0);
                  facturaHCVB.rect(97, 428, 410, 145);
                  facturaHCVB.line(97, 510, 507, 510); // horizontal line
      			facturaHCVB.setDrawColor(0,0,0);

                  facturaHCVB.text(100, 440, 'DATOS SOLICITANTE', null, null);

                  facturaHCVB.text(100, 460, 'NOMBRE', null, null);
                  facturaHCVB.rect(200, 452, 300,10);
                  facturaHCVB.text(200, 460, ' FACULTAD DE MEDICINA,UNIVERSIDAD DE VALPARAISO', null, null);

                  facturaHCVB.text(100, 475, 'UNIDAD', null, null);
                  facturaHCVB.rect(200, 467, 300,10);
                  facturaHCVB.text(200, 475, ' CENTRO DE REPRODUCCION HUMANA', null, null);

                  facturaHCVB.text(100, 490, 'FECHA SOLICITUD', null, null);
                  facturaHCVB.rect(200, 482, 300,10);
                  facturaHCVB.text(200, 490, '  '+fecha, null, null);

                  facturaHCVB.line(250, 550, 465, 550); // horizontal line
                  facturaHCVB.text(300, 560, 'DRA. VERONICA CHAMY PICO', null, null);

                  // mostrar pdf en iframe
                  $scope.facturaHCVBSourceURL =  $sce.trustAsResourceUrl( facturaHCVB.output('dataurlstring') );
                  facturaHCVB.save('facturaHCVB.pdf');
            };


  }]);
