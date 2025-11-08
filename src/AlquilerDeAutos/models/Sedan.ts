import { TARIFAS_AUTOS } from "../constants/constants";
import { EstadoVehiculo } from "../enums/EstadoVehiculo";
import RegistroDia from "./RegistroDia.js";
import TemporadaBase from "./TemporadaBase.js";
import { Vehiculo } from "./Vehiculo";
export default class Sedan extends Vehiculo {

    constructor(matricula: string, estado: EstadoVehiculo, contadorKm: number) {
        super(matricula, estado, contadorKm);
        this.setTarifaBase(TARIFAS_AUTOS.SEDAN.BASE);
        this.setTarifaExtra(TARIFAS_AUTOS.SEDAN.EXTRA);
    }

    calcularTarifa(totalDelRecorrido: RegistroDia[], temporada: TemporadaBase): number {
        const diasTranscurridos = totalDelRecorrido.length;
        let kmTotalesRecorridos = 0;

        for (let i = 0; i < diasTranscurridos; i++) {
            kmTotalesRecorridos += totalDelRecorrido[i].getKmRecorrido();
        }

        const tarifaBaseTemporada = this.calcularTarifaBaseSegunTemporada(temporada);

        return diasTranscurridos * tarifaBaseTemporada + kmTotalesRecorridos * this.getTarifaExtra();
    }
}
