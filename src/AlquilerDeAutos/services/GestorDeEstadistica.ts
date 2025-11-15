import EstadisticaDeRentabilidad from "./EstadisticaDeRentabilidad"
import EstadisticasDeAlquiler from "./EstadisticasDeAlquiler";
import EstadisticasDeOcupacion from "./EstadisticasDeOcupacion";
import { Vehiculo } from "../models/Vehiculo";
import Reserva from "../models/Reserva";
import MantenimientoDeVehiculo from "./MantenimientoDeVehiculo";

/**
 * Gestiona todas las estadísticas del sistema de alquiler.
 * 
 * Actúa como coordinador central que proporciona acceso a las
 * estadísticas de alquiler, rentabilidad y ocupación de la flota.
 */

export default class GestorEstadisticas {
    private rentabilidad: EstadisticaDeRentabilidad
    private alquiler: EstadisticasDeAlquiler
    private ocupacion: EstadisticasDeOcupacion

    /**
     * Inicializa el gestor de estadísticas.
     * 
     * Crea instancias de los tres gestores de estadísticas:
     * - Rentabilidad
     * - Alquiler
     * - Ocupación
     */
    
    constructor () {
        this.rentabilidad = new EstadisticaDeRentabilidad()
        this.alquiler = new EstadisticasDeAlquiler()
        this.ocupacion = new EstadisticasDeOcupacion()
    }
    
    /**
     * Encuentra el vehículo más alquilado en un período específico.
     * 
     * @param {Reserva[]} reservas - Lista de todas las reservas
     * @param {Date} fechaInicio - Fecha de inicio del período a analizar
     * @param {Date} fechaFin - Fecha de fin del período a analizar
     * @returns {string} Matrícula del vehículo más alquilado
     */
    
    public vehiculoMasAlquilado (reservas: Array<Reserva>, fechaInicio: Date, fechaFin: Date): string {
        return this.alquiler.vehiculoMasAlquilado(reservas, fechaInicio, fechaFin)
    }
    
    /**
     * Encuentra el vehículo menos alquilado en un período específico.
     * 
     * @param {Reserva[]} reservas - Lista de todas las reservas
     * @param {Date} fechaInicio - Fecha de inicio del período a analizar
     * @param {Date} fechaFin - Fecha de fin del período a analizar
     * @returns {string} Matrícula del vehículo menos alquilado
     */
    
    public vehiculoMenosAlquilado (reservas: Array<Reserva>, fechaInicio: Date, fechaFin: Date): string {
        return this.alquiler.vehiculoMinimoAlquilado(reservas, fechaInicio, fechaFin)
    }

    /**
     * Encuentra el vehículo con mayor rentabilidad neta.
     * 
     * Calcula: Rentabilidad = Ingresos - Costos de mantenimiento
     * 
     * @param {Reserva[]} reservas - Lista de reservas (para ingresos)
     * @param {MantenimientoDeVehiculo[]} mantenimientos - Lista de mantenimientos (para costos)
     * @returns {Vehiculo | null} Vehículo más rentable, o null si no hay reservas
     */
    
    public mayorRentabilidad (reservas: Reserva[], mantenimientos: MantenimientoDeVehiculo[]): Vehiculo | null {
        return this.rentabilidad.mayorRentabilidad(reservas, mantenimientos)
    }

        /**
     * Encuentra el vehículo con menor rentabilidad neta.
     * 
     * Calcula: Rentabilidad = Ingresos - Costos de mantenimiento
     * 
     * @param {Reserva[]} reservas - Lista de reservas (para ingresos)
     * @param {MantenimientoDeVehiculo[]} mantenimientos - Lista de mantenimientos (para costos)
     * @returns {Vehiculo | null} Vehículo menos rentable, o null si no hay reservas
     */
    
    public menorRentabilidad (reservas: Reserva[], mantenimientos: MantenimientoDeVehiculo[]): Vehiculo | null {
        return this.rentabilidad.menorRentabilidad(reservas, mantenimientos)
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
     * const ocupacion = gestorEstadisticas.ocupacionFlota(vehiculos);
     * console.log(`Ocupación: ${ocupacion}%`);
     */
    
    public ocupacionFlota (vehiculos: Array <Vehiculo>): number {
        return this.ocupacion.porcentajeDeOcupacion(vehiculos)
    }
}