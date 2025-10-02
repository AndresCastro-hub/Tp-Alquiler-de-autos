import { EstadoVehiculo } from "./enums/EstadoVehiculo";
import RegistroDia from "./models/RegistroDia.js";
import Vehiculo from "./vehiculo.ts"
export default class Sedan extends Vehiculo{
    
    private tarifaBase: number;
    private tarifaExtra: number;

    constructor(matricula: string, estado: EstadoVehiculo, contadorKm: number){
        super(matricula, estado, contadorKm);
        this.tarifaBase = 50;
        this.tarifaExtra = 0.20;
    }

calcularTarifa(totalDelRecorrido: RegistroDia[]): number{
    let diasTranscurridos = totalDelRecorrido.length();
    let kmTotalesRecorridos = 0;
    
    for (let i=1; i <= diasTranscurridos; i++){
        kmTotalesRecorridos += this.totalDelRecorrido;
    }
     return diasTranscurridos * this.tarifaBase + kmTotalesRecorridos * this.tarifaExtra;
 }
}
