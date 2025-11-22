import ErrorVehiculoNoDisponible from "../../errors/excepcionVehiculoNoDisponible";
import EstadoMantenimiento from "./EstadoMantenimiento";
import IEstadoVehiculo from "./IEstadoVehiculo";
import { Vehiculo } from "../Vehiculo";
import ErrorEstadoIncorrecto from "../../errors/excepcionEstadoIncorrecto";

/**
 * Implementación del estado "En Alquiler" para un vehículo.
 * * Define el comportamiento de un vehículo cuando está siendo utilizado por un cliente.
 */

export default class EstadoEnAlquiler implements IEstadoVehiculo {
    
    /**
     * Intenta reservar el vehículo.
     * * Siempre lanza un error porque un vehículo en alquiler no está disponible.
     *
     * @param vehiculo - La instancia del vehículo.
     * @throws {ErrorVehiculoNoDisponible}
     */
    
    public reservar(vehiculo: Vehiculo): void {
        throw new ErrorVehiculoNoDisponible(`El vehículo ${vehiculo.getMatricula()} está en alquiler, no se encuentra disponible.`);
    }
    
    /**
     * Finaliza el alquiler del vehículo y determina el siguiente estado.
     * * Incrementa el contador de alquileres.
     * * Si el vehículo necesita mantenimiento (por KM o ciclos de alquiler), cambia su estado a 'Mantenimiento' y resetea contadores.
     *
     * @param vehiculo - La instancia del vehículo cuyo alquiler finaliza.
     */
    
    public finalizarAlquiler(vehiculo: Vehiculo): void {
        vehiculo.incrementarAlquiler();
                
        if (vehiculo.necesitaMantenimiento()) {
            vehiculo.setEstado( new EstadoMantenimiento() );
            vehiculo.resetearValoresMantenimiento();
        }
    }

    /**
     * Intenta finalizar el mantenimiento del vehículo.
     * * Lanza un error ya que esta acción no es válida mientras el vehículo está en alquiler.
     *
     * @param vehiculo - La instancia del vehículo.
     * @throws {ErrorEstadoIncorrecto}
     */
    
    public finalizarMantenimiento(vehiculo: Vehiculo): void {
        throw new ErrorEstadoIncorrecto(`El vehículo ${vehiculo.getMatricula()} está en alquiler y no puede realizar mantenimiento.`);
    }

    /**
     * Indica si el vehículo se encuentra actualmente en alquiler.
     *
     * @returns {boolean} Verdadero, ya que el vehículo está en alquiler.
     */
    
    public estaEnAlquiler(): boolean {
        return true;
    }
}