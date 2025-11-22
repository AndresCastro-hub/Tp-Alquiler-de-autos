import ErrorVehiculoNoDisponible from "../errors/excepcionVehiculoNoDisponible";
import Reserva from "../models/Reserva";
import { Vehiculo } from "../models/Vehiculo";

/**
 * Gestiona las reservas de vehículos en el sistema.
 * 
 * Coordina la creación y cierre de reservas, verifica disponibilidad
 * de vehículos, actualiza su estado y procesa el mantenimiento.
 */

export default class GestionDeReservas {
    private reservas: Reserva[];

    /**
     * Inicializa el gestor de reservas.
     * * @constructor
     */
    
    constructor() {
        this.reservas = [];
    }

    /**
     * Agrega una nueva reserva al sistema.
     * * * Verifica la disponibilidad del vehículo y, si es válida, cambia el estado del vehículo a 'En Alquiler'.
     * * @public
     * @param {Reserva} reserva - Reserva a agregar.
     * @returns {void}
     * @throws {ErrorVehiculoNoDisponible} Si hay superposición de fechas.
     * @throws {Error} Propaga error si el estado actual del vehículo no permite la reserva (ej. está en Mantenimiento).
     * * @example
     * const reserva = new Reserva(cliente, vehiculo, inicio, fin, gestorTemporada);
     * gestionDeReservas.agregarReserva(reserva);
     */
    
    public agregarReserva(reserva: Reserva): void {

        const vehiculo = reserva.getVehiculo()
        const fechaInicio = reserva.getFechaInicioReserva()
        const fechaFinal = reserva.getFechaFinReserva()

        const elVehiculoEstaDisponible = this.chequearDisponibilidad(vehiculo, fechaInicio, fechaFinal);

        if (!elVehiculoEstaDisponible) {
            throw new ErrorVehiculoNoDisponible(`El vehículo ${reserva.getVehiculo().getMatricula()} no está disponible en esas fechas.`);
        }
        
        try {
            vehiculo.reservar();
        } catch (error) {
            throw error;
        }

        this.reservas.push(reserva);
    }

    /**
     * Cierra una reserva completada.
     * * * Actualiza el kilometraje del vehículo, llama a {@link Vehiculo.finalizarAlquiler | finalizarAlquiler()} para actualizar su estado y retorna el costo.
     * * @public
     * @param {Reserva} reserva - Reserva a cerrar.
     * @returns {number} Costo total del alquiler.
     * @throws {Error} Propaga error si el vehículo no está en estado 'En Alquiler'.
     * * @example
     * const costo = gestionDeReservas.cerrarReserva(reserva);
     * console.log(`Total a pagar: $${costo}`);
     */
    
    public cerrarReserva(reserva: Reserva): number {
        const vehiculo = reserva.getVehiculo();
        const cantidadDeKilometrosRecorridos = reserva.getGestionDelKilometraje().getTotalKmRecorridos();
        vehiculo.actualizarKMRecorridos(cantidadDeKilometrosRecorridos);
        try{
            vehiculo.finalizarAlquiler();
        } catch (error) {
            throw error;
        }
        
        return reserva.calcularCostoTotal();
    }

    /**
     * Verifica si un vehículo está disponible en un período específico.
     * * * Comprueba que no haya superposición de fechas con otras reservas existentes.
     * * @private
     * @param {Vehiculo} vehiculo - Vehículo a verificar.
     * @param {Date} fechaInicio - Fecha de inicio solicitada.
     * @param {Date} fechaFinal - Fecha de fin solicitada.
     * @returns {boolean} `true` si está disponible, `false` en caso contrario.
     */
    
    private chequearDisponibilidad(vehiculo: Vehiculo, fechaInicio: Date, fechaFinal: Date): boolean {
        const reservasVehiculo = this.reservas.filter(
            r => r.getVehiculo().getMatricula() === vehiculo.getMatricula()
        );

        const nuevoInicio = fechaInicio.getTime();
        const nuevoFin = fechaFinal.getTime();

        const existeSuperposicion = reservasVehiculo.some(r => {
            const inicio = r.getFechaInicioReserva().getTime();
            const fin = r.getFechaFinReserva().getTime();
            return nuevoInicio <= fin && nuevoFin >= inicio;
        });

        return !existeSuperposicion;
    }
}