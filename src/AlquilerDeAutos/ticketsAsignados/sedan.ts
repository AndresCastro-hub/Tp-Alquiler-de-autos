export default class Sedan extends Vehiculo{
    
    private tarifaBase: number;
    private tarifaExtra: number;

    constructor(){
        super();
        this.tarifaBase = 50;
        this.tarifaExtra = 0.20;
    }

    calcularTarifa(fechaInicio: Date, fechaFinal: Date, kmRecorridos: number): number{
        
        let tiempoTranscurrido = fechaFinal - fechaInicio;

        let cuotaExtra = kmRecorridos * this.tarifaExtra;

        return tiempoTranscurrido * this.tarifaBase + cuotaExtra;        
    }
}