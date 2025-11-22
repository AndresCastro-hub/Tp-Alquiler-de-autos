import ErrorVehiculoNoDisponible from "../errors/excepcionVehiculoNoDisponible";
import Reserva from "../models/Reserva";
import { Vehiculo } from "../models/Vehiculo";
import GestorDeMantenimiento from "./GestionDeMantenimiento";

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
     * 
     * @param {GestorDeMantenimiento} gestorDeMantenimiento - Gestor responsable del mantenimiento de vehículos
     */
    
    constructor() {
        this.reservas = [];
    }

    /**
     * Agrega una nueva reserva al sistema.
     * 
     * Verifica que el vehículo esté disponible en las fechas solicitadas.
     * Si es válida, marca el vehículo como "En Alquiler".
     * 
     * @param {Reserva} reserva - Reserva a agregar
     * @throws {ErrorVehiculoNoDisponible} Si el vehículo no está disponible en esas fechas
     * 
     * @example
     * const reserva = new Reserva(cliente, vehiculo, gestor, inicio, fin, gestorTemporada);
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
     * 
     * Actualiza el kilometraje del vehículo, procesa el mantenimiento
     * si es necesario y retorna el costo total de la reserva.
     * 
     * @param {Reserva} reserva - Reserva a cerrar
     * @returns {number} Costo total del alquiler
     * 
     * @example
     * const costo = gestionDeReservas.cerrarReserva(reserva);
     * console.log(`Total a pagar: $${costo}`);
     */
    
    public cerrarReserva(reserva: Reserva): number {
        const vehiculo = reserva.getVehiculo();
        const cantidadDeKilometrosRecorridos = reserva.getGestionDelKilometraje().getTotalKmRecorridos();
        vehiculo.actualizarKMRecorridos(cantidadDeKilometrosRecorridos);
        //this.gestorMantenimiento.procesarMantenimiento(vehiculo);
        try{
            vehiculo.finalizarAlquiler();
        } catch (error) {
            throw error;
        }
        
        return reserva.calcularCostoTotal();
    }

    /**
     * Verifica si un vehículo está disponible en un período específico.
     * 
     * Comprueba:
     * - El estado del vehículo sea "Disponible"
     * - No haya superposición con otras reservas en esas fechas
     * 
     * @private
     * @param {Vehiculo} vehiculo - Vehículo a verificar
     * @param {Date} fechaInicio - Fecha de inicio solicitada
     * @param {Date} fechaFinal - Fecha de fin solicitada
     * @returns {boolean} true si está disponible, false en caso contrario
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