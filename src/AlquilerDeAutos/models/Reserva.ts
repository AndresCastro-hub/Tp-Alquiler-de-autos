import GestorDeTemporada from "../services/GestorDeTemporada";
import GestorKilometraje from "../services/GestorKilometraje";
import Cliente from "./Cliente";
import { Vehiculo } from "./Vehiculo";

/**
 * Representa una reserva realizada por un cliente  para un vehiculo
 * 
 * Hace de coordinador entre el cliente, el vehiculo y los gestores de 
 * kilometraje como asi tambien de temporada, permitiendo asi
 * calcular el costo total de la reseva segun su duracion y temporada
 */
export default class Reserva {
    /**
     * 
     * @param cliente - Instancia del {@link Cliente} que tiene una reserva asociada
     * @param vehiculo - Instancia del {@link Vehiculo} alquilado
     * @param gestionDelKilometraje - Gestor que administra la infromacion del recorrido
     * @param fechaInicioReserva - Fecha de inicio de la reserva
     * @param fechaFinReserva - Fecha de finalizacion de la reserva
     * @param gestorDeTemporada - Gestor responsable de determinar la temporada vigente
     */
    constructor(
        private cliente: Cliente,
        private vehiculo: Vehiculo,
        private gestionDelKilometraje: GestorKilometraje,
        private fechaInicioReserva: Date,
        private fechaFinReserva: Date,
        private gestorDeTemporada: GestorDeTemporada
    ) {}

    public getCliente(): Cliente {
        return this.cliente;
    }

    public getVehiculo(): Vehiculo {
        return this.vehiculo;
    }

    public getFechaInicioReserva(): Date {
        return this.fechaInicioReserva
    }

    public getFechaFinReserva(): Date {
        return this.fechaFinReserva
    }

    public setCliente(cliente: Cliente): void {
        this.cliente = cliente;
    }

    public setVehiculo(vehiculo: Vehiculo): void {
        this.vehiculo = vehiculo;
    }

    public setFechaInicioReserva(fechaInicio: Date): void{
        this.fechaInicioReserva = fechaInicio
    }

    public setFechaFinReserva(fechaFinal: Date): void{
        this.fechaFinReserva = fechaFinal
    }

    public getGestionDelKilometraje(): GestorKilometraje{
        return this.gestionDelKilometraje
    }

    /**
     * Calcula el costo total de la reserva
     * Usa el gestor de kilometraje para obtener informacion del recorrido
     * Usa el gestor de temporada para determinar el porcentaje de ajuste
     * Delega el calculo final al vehiculo asociado 
     * 
     * @returns Costo total del alquiler del vehiculo
     */
    public calcularCostoTotal(): number {
        const informacionDelRecorrido = this.gestionDelKilometraje.getInformacionDelRecorrido();
        const temporada = this.gestorDeTemporada.getTemporada(this.fechaInicioReserva)
        return this.vehiculo.calcularTarifa(informacionDelRecorrido,temporada)
    }
}
