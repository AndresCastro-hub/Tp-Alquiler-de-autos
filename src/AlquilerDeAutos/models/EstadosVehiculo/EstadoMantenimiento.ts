import ErrorVehiculoNoDisponible from "../../errors/excepcionVehiculoNoDisponible";
import EstadoDisponible from "./EstadoDisponible";
import IEstadoVehiculo from "./IEstadoVehiculo";
import { Vehiculo } from "../Vehiculo";
import ErrorEstadoIncorrecto from "../../errors/excepcionEstadoIncorrecto";

/**
 * Implementación del estado "En Mantenimiento" para un vehículo.
 * * Define el comportamiento de un vehículo cuando está bajo revisión o reparación.
 */


export default class EstadoMantenimiento implements IEstadoVehiculo {
    
    /**
         * Intenta reservar el vehículo.
         * * Siempre lanza un error porque un vehículo en mantenimiento no está disponible.
         *
         * @param vehiculo - La instancia del vehículo.
         * @throws {ErrorVehiculoNoDisponible}
         */
    
    public reservar(vehiculo: Vehiculo): void {
        throw new ErrorVehiculoNoDisponible(`El vehículo ${vehiculo.getMatricula()} está en mantenimiendo, no se encuentra disponible.`);
    }
    
     /**
         * Intenta finalizar el alquiler del vehículo.
         * * Lanza un error ya que el vehículo ya está en mantenimiento.
         *
         * @param vehiculo - La instancia del vehículo.
         * @throws {ErrorEstadoIncorrecto}
         */
    
    public finalizarAlquiler(vehiculo: Vehiculo): void {
        throw new ErrorEstadoIncorrecto(`El vehículo ${vehiculo.getMatricula()} está en mantenimiento.`);
    }

    /**
         * Finaliza el mantenimiento del vehículo.
         * * Cambia el estado del vehículo al estado 'Disponible'.
         *
         * @param vehiculo - La instancia del vehículo cuyo estado se actualizará.
         */
    
    public finalizarMantenimiento(vehiculo: Vehiculo): void {
        vehiculo.setEstado(new EstadoDisponible());
    }

     /**
     * Indica si el vehículo se encuentra actualmente en alquiler.
     *
     * @returns {boolean} Falso, ya que el vehículo está en mantenimiento.
     */
    
    public estaEnAlquiler(): boolean {
        return false;
    }
}