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
     * Crea una nueva instancia de vehiculo SUV
     * 
     * @param matricula - Matricula del vehiculo
     * @param estado - Estado actual del vehiculo (disponible, en alquiler, mantenimiento)
     * @param contadorKm - Cantidad de km acumulados del vehiculo
     */

    constructor(matricula: string, estado: EstadoVehiculo, contadorKm: number) {
        super(matricula, estado, contadorKm,);
        this.setTarifaBase(TARIFAS_AUTOS.SUV.BASE);
        this.setTarifaExtra(TARIFAS_AUTOS.SUV.EXTRA)
        this.tarifaFijaSeguro = TARIFAS_AUTOS.SUV.SEGURO;
    }

    /**
     * Calcula el costo total del alquiler del vehiculo SUV
     * 
     * @param totalDelRecorrido - Arreglo de objetos {@link RegistroDia} con los kilómetros recorridos por día.
     * @param temporada - Temporada vigente (alta, media o baja)
     * @returns El monto total del alquiler y los km recorridos
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