angular.module('ingresos')
  .provider('NuevoIngresoService', function () {

    // Private variables
    var pacienteData = null;
    var medicoData = null;
    var procedimientoData = null;
    var tipoPagoData = null;
    var codigoData = null;

    // Private constructor
    function Greeter() {
      this.greet = function () {
        return {
            paciente: pacienteData,
            medico: medicoData,
            procedimiento: procedimientoData,
            tipoPago: tipoPagoData,
            codigoPago: codigoData
        };
      };
    }

    // Method for instantiating
    this.$get = function () {
      return new Greeter();
    };
});
