import EstadisticaDeRentabilidad from "./EstadisticaDeRentabilidad"
import EstadisticasDeAlquiler from "./EstadisticasDeAlquiler";
import EstadisticasDeOcupacion from "./EstadisticasDeOcupacion";
import { Vehiculo } from "../models/Vehiculo";
import Reserva from "../models/Reserva";
import MantenimientoDeVehiculo from "./MantenimientoDeVehiculo";


export default class GestorEstadisticas {
    private rentabilidad: EstadisticaDeRentabilidad
    private alquiler: EstadisticasDeAlquiler
    private ocupacion: EstadisticasDeOcupacion

    constructor () {
        this.rentabilidad = new EstadisticaDeRentabilidad()
        this.alquiler = new EstadisticasDeAlquiler()
        this.ocupacion = new EstadisticasDeOcupacion()
    }
    
    public vehiculoMasAlquilado (reservas: Array<Reserva>, fechaInicio: Date, fechaFin: Date): string {
        return this.alquiler.vehiculoMasAlquilado(reservas, fechaInicio, fechaFin)
    }
    
    public vehiculoMenosAlquilado (reservas: Array<Reserva>, fechaInicio: Date, fechaFin: Date): string {
        return this.alquiler.vehiculoMinimoAlquilado(reservas, fechaInicio, fechaFin)
    }

    public mayorRentabilidad (reservas: Reserva[], mantenimientos: MantenimientoDeVehiculo[]): Vehiculo | null {
        return this.rentabilidad.mayorRentabilidad(reservas, mantenimientos)
    }

    public menorRentabilidad (reservas: Reserva[], mantenimientos: MantenimientoDeVehiculo[]): Vehiculo | null {
        return this.rentabilidad.menorRentabilidad(reservas, mantenimientos)
    }

    public ocupacionFlota (vehiculos: Array <Vehiculo>): number {
        return this.ocupacion.porcentajeDeOcupacion(vehiculos)
    }
}