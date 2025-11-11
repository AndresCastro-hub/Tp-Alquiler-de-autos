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
     * Crea una nueva instancia de vehiculo tipo Sedan
     * 
     * @param matricula - Matricula del vehiculo
     * @param estado - Estado actual del vehiculo (disponible, en alquiler o mantenmiento)
     * @param contadorKm - Cantidad de km acumulados del vehiculo
     */
    constructor(matricula: string, estado: EstadoVehiculo, contadorKm: number) {
        super(matricula, estado, contadorKm);
        this.setTarifaBase(TARIFAS_AUTOS.SEDAN.BASE);
        this.setTarifaExtra(TARIFAS_AUTOS.SEDAN.EXTRA);
    }

    /**
     * Calcula el costo total del alquiler del vehiculo Sedan
     * 
     * @param totalDelRecorrido - Arreglo de objetos {@link RegistroDia} con los kilómetros recorridos por día.
     * @param temporada - Temporada vigente (alta, media o baja)
     * @returns El monto total del alquiler y los km recorridos
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
