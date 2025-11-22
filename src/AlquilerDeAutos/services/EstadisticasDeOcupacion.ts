import { Vehiculo } from "../models/Vehiculo";

/**
 * Analiza el nivel de ocupación de la flota de vehículos.
 * 
 * Calcula qué porcentaje de vehículos están en alquiler
 * en un momento dado.
 */

export default class EstadististicasDeOcupacion{

    /**
     * Cuenta cuántos vehículos están actualmente en alquiler.
     * 
     * @private
     * @param {Vehiculo[]} vehiculos - Lista de todos los vehículos
     * @returns {number} Cantidad de vehículos en estado "En Alquiler"
     */
    
    private ocupacionFlota (vehiculos: Array <Vehiculo>): number{
        //return vehiculos.filter(v => v.getEstado() === EstadoEnAlquiler).length
        return vehiculos.filter(v => v.estaEnAlquiler()).length;
    }

    /**
     * Calcula el porcentaje de ocupación de la flota.
     * 
     * **Fórmula:** (Vehículos en alquiler / Total de vehículos) × 100
     * 
     * @param {Vehiculo[]} vehiculos - Lista de todos los vehículos
     * @returns {number} Porcentaje de ocupación (0-100)
     * @throws {Error} Si la flota está vacía
     * 
     * @example
     * // Si hay 7 vehículos en alquiler de 10 totales:
     * porcentajeDeOcupacion(vehiculos); // Retorna 70
     */
    
    public porcentajeDeOcupacion(vehiculos: Array<Vehiculo>): number{
        const cantidadEnAlquiler = this.ocupacionFlota(vehiculos);
        const totalDeVehiculos = vehiculos.length;

        if(totalDeVehiculos === 0){
            throw new Error("La flota esta vacia");
        }

        return (cantidadEnAlquiler/totalDeVehiculos) * 100;
    }
}