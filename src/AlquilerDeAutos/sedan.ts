import { EstadoVehiculo } from "./enums/EstadoVehiculo";
import RegistroDia from "./models/RegistroDia.js";
import { Vehiculo } from "./models/Vehiculo";
export default class Sedan extends Vehiculo{

    constructor(matricula: string, estado: EstadoVehiculo, contadorKm: number){
        super(matricula, estado, contadorKm);
        this.setTarifaBase(50);
        this.setTarifaExtra(0.20);
    }

calcularTarifa(totalDelRecorrido: RegistroDia[]): number{
    let diasTranscurridos = totalDelRecorrido.length;
    let kmTotalesRecorridos = 0;
    
    for (let i=1; i < diasTranscurridos; i++){
        kmTotalesRecorridos += totalDelRecorrido[i].getKmRecorrido();
    }
     return diasTranscurridos * this.getTarifaBase() + kmTotalesRecorridos * this.getTarifaExtra();
 }
}
