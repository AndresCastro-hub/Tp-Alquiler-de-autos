import { TARIFAS_AUTOS } from "../constants/constants";
import { EstadoVehiculo } from "../enums/EstadoVehiculo";
import RegistroDia from "./RegistroDia.js";
import { Vehiculo } from "./Vehiculo";
export default class Compacto extends Vehiculo{

    constructor(matricula: string, estado: EstadoVehiculo, contadorKm: number){
        super(matricula, estado, contadorKm);
        this.setTarifaBase(TARIFAS_AUTOS.COMPACTO.BASE);
        this.setTarifaExtra(TARIFAS_AUTOS.COMPACTO.EXTRA);
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
