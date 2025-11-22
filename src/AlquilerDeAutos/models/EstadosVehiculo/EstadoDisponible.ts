import EstadoEnAlquiler from "./EstadoEnAlquiler";
import IEstadoVehiculo from "./IEstadoVehiculo";
import { Vehiculo } from "../Vehiculo";
import ErrorEstadoIncorrecto from "../../errors/excepcionEstadoIncorrecto";

/**
 * Implementación del estado "Disponible" para un vehículo.
 * * Define el comportamiento de un vehículo cuando está listo para ser alquilado.
 */

export default class EstadoDisponible implements IEstadoVehiculo {
    
    /**
     * Reserva el vehículo.
     * * Cambia el estado del vehículo al estado 'En Alquiler'.
     *
     * @param vehiculo - La instancia del vehículo.
     */
    
    public reservar(vehiculo: Vehiculo): void {
        vehiculo.setEstado( new EstadoEnAlquiler() );
    }
    
    /**
     * Intenta finalizar el alquiler del vehículo.
     * * Lanza un error ya que el vehículo ya está en estado 'Disponible' (no está en alquiler).
     *
     * @param vehiculo - La instancia del vehículo.
     * @throws {ErrorEstadoIncorrecto}
     */
    
    public finalizarAlquiler(vehiculo: Vehiculo): void {
        throw new ErrorEstadoIncorrecto(`El vehículo ${vehiculo.getMatricula()} está disponible y no está siendo alquilado.`);
    }

    /**
     * Intenta finalizar el mantenimiento del vehículo.
     * * Lanza un error ya que el vehículo ya está en estado 'Disponible' (no está en mantenimiento).
     *
     * @param vehiculo - La instancia del vehículo.
     * @throws {ErrorEstadoIncorrecto}
     */
    
    public finalizarMantenimiento(vehiculo: Vehiculo): void {
        throw new ErrorEstadoIncorrecto(`El vehículo ${vehiculo.getMatricula()} está disponible y no puede realizar mantenimiento.`);
    }

    /**
     * Indica si el vehículo se encuentra actualmente en alquiler.
     *
     * @returns {boolean} Falso, ya que el vehículo está disponible.
     */
    
    public estaEnAlquiler(): boolean {
        return false;
    }
}