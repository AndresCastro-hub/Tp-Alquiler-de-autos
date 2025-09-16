export default class Compacto extends Vehiculo{
    
    private tarifaBase: number;
    private tarifaExtra: number;
    private kmRecorridosXDia: number;

    constructor(){
        super();
        this.tarifaBase = 30;
        this.tarifaExtra = 0.15;
        this.kmRecorridosXDia = 0;
    }

    calcularTarifa(fechaInicio: Date, fechaFinal: Date, kmRecorridos: number): number{

            let tiempoTranscurrido = fechaFinal - fechaInicio; // como obtengo unicamente los dias y no ms?

            let kmExtra = 0;

            for (let i = 1; i <= tiempoTranscurrido; i++) {

            let odometroDiario = this.getKmRecorridosXDia;

            if(odometroDiario > 100){
                kmExtra += (odometroDiario - 100);
            }
        }
        return this.tarifaBase * tiempoTranscurrido + this.tarifaExtra * kmExtra;
    }
    public setKmRecorridosXDia(value: number){
        this.kmRecorridosXDia = value;
    }

    public getKmRecorridosXDia(){
        return this.getKmRecorridosXDia;
    }
}