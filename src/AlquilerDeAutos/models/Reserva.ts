import GestorDeTemporada from "../services/GestorDeTemporada";
import GestorKilometraje from "../services/GestorKilometraje";
import Cliente from "./Cliente";
import { Vehiculo } from "./Vehiculo";

export default class Reserva {
    private cliente: Cliente;
    private vehiculo: Vehiculo;
    private gestionDelKilometraje: GestorKilometraje;
    private fechaInicioReserva: Date;
    private fechaFinReserva: Date;
    private gestorDeTemporada: GestorDeTemporada

    constructor(
        cliente: Cliente, 
        vehiculo: Vehiculo, 
        gestionDelKilometraje: GestorKilometraje, 
        fechaInicioReserva: Date, 
        fechaFinReserva: Date,
        gestorDeTemporada: GestorDeTemporada
        
    ) {
        this.cliente = cliente
        this.vehiculo = vehiculo
        this.gestionDelKilometraje = gestionDelKilometraje
        this.fechaInicioReserva = fechaInicioReserva;
        this.fechaFinReserva = fechaFinReserva;
        this.gestorDeTemporada = gestorDeTemporada
    }


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

    public calcularCostoTotal(): number {
        const informacionDelRecorrido = this.gestionDelKilometraje.getInformacionDelRecorrido();
        const temporada = this.gestorDeTemporada.getTemporada(this.fechaInicioReserva)
        return this.vehiculo.calcularTarifa(informacionDelRecorrido,temporada)
    }
}
