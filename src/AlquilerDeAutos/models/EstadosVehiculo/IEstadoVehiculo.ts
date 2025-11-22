import { Vehiculo } from "../Vehiculo";

/**
 * Interfaz que define las operaciones que un vehículo puede realizar,
 * las cuales varían según su estado actual (Patrón State).
 * * * Todas las clases de estado (Disponible, EnAlquiler, Mantenimiento)
 * * deben implementar esta interfaz para definir su comportamiento específico.
 */

export default interface IEstadoVehiculo {
    
    /**
     * Define el comportamiento al intentar reservar el vehículo.
     * * @param vehiculo - La instancia del vehículo sobre la que se aplica la acción.
     */
    
    reservar(vehiculo: Vehiculo): void;
    
    /**
     * Define el comportamiento al intentar finalizar un alquiler del vehículo.
     * * @param vehiculo - La instancia del vehículo sobre la que se aplica la acción.
     */
    
    finalizarAlquiler(vehiculo: Vehiculo): void;
    
    /**
     * Define el comportamiento al intentar finalizar el mantenimiento del vehículo.
     * * @param vehiculo - La instancia del vehículo sobre la que se aplica la acción.
     */
    
    finalizarMantenimiento(vehiculo: Vehiculo): void;
    
    /**
     * Indica si el vehículo, en su estado actual, se considera "en alquiler".
     * * @returns {boolean} Verdadero si está en alquiler; Falso en caso contrario.
     */
    
    estaEnAlquiler(): boolean;
}