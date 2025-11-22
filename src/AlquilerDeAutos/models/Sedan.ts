import { TARIFAS_AUTOS } from "../constants/constants";
import { EstadoVehiculo } from "../enums/EstadoVehiculo";
import RegistroDia from "./RegistroDia.js";
import TemporadaBase from "./TemporadaBase.js";
import { Vehiculo } from "./Vehiculo";

/**
 * Representa un vehiculo de tipo Sedan dentro del sistema
 * 
 * Esta clase hereda de {@link Vehiculo}
 * 
 * Permite calcular el costo total del alquiler segun su tarifa base diaria y aplicando un cargo $0.2 por cada km
 * recorrido, sin limite diario.
 * 
 * @extends Vehiculo
 */
export default class Sedan extends Vehiculo {

    /**
     * Crea una nueva instancia de vehículo tipo Sedan.
     * * @constructor
     * @param matricula - Matricula del vehiculo.
     * @param contadorKm - Kilometraje total acumulado del vehiculo.
     */
    constructor(matricula: string, contadorKm: number) {
        super(matricula, contadorKm);
        this.setTarifaBase(TARIFAS_AUTOS.SEDAN.BASE);
        this.setTarifaExtra(TARIFAS_AUTOS.SEDAN.EXTRA);
    }

    /**
     * Calcula el costo total del alquiler del vehículo Sedan.
     * * * La fórmula suma la tarifa base diaria ajustada por temporada (multiplicada por los días)
     * * * más el total de kilómetros recorridos multiplicado por la tarifa extra.
     * * @param totalDelRecorrido - Arreglo de objetos {@link RegistroDia} con los kilómetros recorridos por día.
     * @param temporada - Temporada vigente (alta, media o baja).
     * @returns {number} El monto total del alquiler.
     */
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
