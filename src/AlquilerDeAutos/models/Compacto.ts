import { TARIFAS_AUTOS } from "../constants/constants";
import { EstadoVehiculo } from "../enums/EstadoVehiculo";
import RegistroDia from "./RegistroDia.js";
import TemporadaBase from "./TemporadaBase.js";
import { Vehiculo } from "./Vehiculo";

/**
 * Representa un vehículo de tipo Compacto dentro del sistema.
 * 
 * Esta clase hereda de {@link Vehiculo}
 * 
 * Permite calcular el costo total del alquiler segun  la temporada y de los km recorridos por día, 
 * aplicando una tarifa adicional si se pasan los 100 km diarios.
 * 
 * @extends Vehiculo
 */
export default class Compacto extends Vehiculo{

    /**
     * Crea una nueva instancia de vehiculo Compacto
     * 
     * @param matricula - Matricula del vehiculo
     * @param estado - Estado actual del vehiculo (disponible, en alquiler, mantenimiento)
     * @param contadorKm - Cantidad de km acumulados del vehiculo
     */

    constructor(matricula: string, contadorKm: number){
        super(matricula, contadorKm);
        this.setTarifaBase(TARIFAS_AUTOS.COMPACTO.BASE);
        this.setTarifaExtra(TARIFAS_AUTOS.COMPACTO.EXTRA);
    }

    /**
     * Calcula el costo total del alquiler del vehiculo Compacto
     * 
     * @param totalDelRecorrido - Arreglo de objetos {@link RegistroDia} con los kilómetros recorridos por día.
     * @param temporada - Temporada vigente (alta, media o baja)
     * @returns El monto total del alquiler y los km recorridos
     */
    calcularTarifa(totalDelRecorrido: RegistroDia[], temporada: TemporadaBase): number{

        const diasTranscurridos = totalDelRecorrido.length;
        let kmExtra = 0;

        for (let i = 0; i < diasTranscurridos; i++) {
            const odometroDiario = totalDelRecorrido[i].getKmRecorrido();

            if(odometroDiario > 100){
                kmExtra += (odometroDiario - 100);
            }
        }

        const tarifaBaseTemporada = this.calcularTarifaBaseSegunTemporada(temporada);
        return tarifaBaseTemporada * diasTranscurridos + kmExtra * this.getTarifaExtra();
    }
}
