import { TARIFAS_AUTOS } from "../constants/constants";
import { EstadoVehiculo } from "../enums/EstadoVehiculo";
import RegistroDia from "./RegistroDia.js";
import TemporadaBase from "./TemporadaBase.js";
import { Vehiculo } from "./Vehiculo";

/**
 * Representa un vehiculo de tipo SUV dentro del sistema
 * 
 * Esta clase hereda de {@link Vehiculo}
 * 
 * Permite calcular el costo total del alquiler segun su tarifa base diaria 
 * aplicando el cargo fijo adicional por seguro y un cargo variable si se superan
 * los 500 km en total durante el periodo de alquiler
 * @extends Vehiculo
 */
export default class Suv extends Vehiculo {

    private tarifaFijaSeguro: number

    /**
     * Crea una nueva instancia de vehículo tipo SUV.
     * * @constructor
     * @param matricula - Matricula del vehiculo.
     * @param contadorKm - Kilometraje total acumulado del vehiculo.
     */

    constructor(matricula: string, contadorKm: number) {
        super(matricula, contadorKm);
        this.setTarifaBase(TARIFAS_AUTOS.SUV.BASE);
        this.setTarifaExtra(TARIFAS_AUTOS.SUV.EXTRA)
        this.tarifaFijaSeguro = TARIFAS_AUTOS.SUV.SEGURO;
    }

    /**
     * Calcula el costo total del alquiler del vehículo SUV.
     * * * La fórmula suma la tarifa base diaria ajustada por temporada, más la tarifa fija diaria del seguro,
     * * * más un cargo variable por kilómetro si el total de km recorridos supera los 500 km.
     * * @param totalDelRecorrido - Arreglo de objetos {@link RegistroDia} con los kilómetros recorridos por día.
     * @param temporada - Temporada vigente (alta, media o baja).
     * @returns {number} El monto total del alquiler.
     */

    calcularTarifa(totalDelRecorrido: RegistroDia[], temporada: TemporadaBase): number {
        const diasTranscurridos = totalDelRecorrido.length;
        let kmTotalesRecorridos = 0;
        let montoExtra = 0;

        for (let i = 0; i < diasTranscurridos; i++) {
            kmTotalesRecorridos += totalDelRecorrido[i].getKmRecorrido();
        }

        if (kmTotalesRecorridos > 500) {
            montoExtra = kmTotalesRecorridos * this.getTarifaExtra();
        }
        const tarifaBaseTemporada = this.calcularTarifaBaseSegunTemporada(temporada);

        return diasTranscurridos * tarifaBaseTemporada + diasTranscurridos * this.tarifaFijaSeguro + montoExtra;
    }
} 