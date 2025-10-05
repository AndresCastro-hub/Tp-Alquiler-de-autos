import { EstadoVehiculo } from "./enums/EstadoVehiculo";
import RegistroDia from "./models/RegistroDia.js";
import { Vehiculo } from "./models/Vehiculo";
export default class Compacto extends Vehiculo{

    constructor(matricula: string, estado: EstadoVehiculo, contadorKm: number){
        super(matricula, estado, contadorKm);
        this.setTarifaBase(30);
        this.setTarifaExtra(0.15);
    }

    calcularTarifa(totalDelRecorrido: RegistroDia[]): number{

            let diasTranscurridos = totalDelRecorrido.length;
            let kmExtra = 0;

            for (let i = 0; i < diasTranscurridos; i++) {

            let odometroDiario = totalDelRecorrido[i].getKmRecorrido();

            if(odometroDiario > 100){
                kmExtra += (odometroDiario - 100);
            }
        }

        return this.getTarifaBase() * diasTranscurridos + kmExtra * this.getTarifaExtra();
    }
}
