import { EstadoVehiculo } from "../enums/EstadoVehiculo";
import ErrorVehiculoNoDisponible from "../errors/excepcionVehiculoNoDisponible";
import Reserva from "../models/Reserva";
import { Vehiculo } from "../models/Vehiculo";
import GestorDeMantenimiento from "./GestionDeMantenimiento";


export default class GestionDeReservas {
    private reservas: Reserva[];
    private gestorMantenimiento: GestorDeMantenimiento;

    constructor(gestorDeMantenimiento: GestorDeMantenimiento) {
        this.reservas = [];
        this.gestorMantenimiento = gestorDeMantenimiento;
    }

    public agregarReserva(reserva: Reserva): void {

        const vehiculo = reserva.getVehiculo()
        const fechaInicio = reserva.getFechaInicioReserva()
        const fechaFinal = reserva.getFechaFinReserva()

        const elVehiculoEstaDisponible = this.chequearDisponibilidad(vehiculo, fechaInicio, fechaFinal);

        if (!elVehiculoEstaDisponible) {
            throw new ErrorVehiculoNoDisponible(`El vehículo ${reserva.getVehiculo().getMatricula()} no está disponible en esas fechas porque esta en estado: ${vehiculo.getEstado()}.`);
        }

        this.reservas.push(reserva);
        this.marcarVehiculoEnAlquiler(reserva.getVehiculo())
    }

    public cerrarReserva(reserva: Reserva): number {
        const vehiculo = reserva.getVehiculo();
        const cantidadDeKilometrosRecorridos = reserva.getGestionDelKilometraje().getTotalKmRecorridos()
        this.actualizarKilometrajeRecorrido(vehiculo, cantidadDeKilometrosRecorridos)

        this.procesarMantenimiento(vehiculo);

        this.eliminarReserva(reserva)
        return reserva.calcularCostoTotal();
    }

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

        const elVehiculoEstaDisponible = vehiculo.getEstado() === EstadoVehiculo.Disponible

        return !existeSuperposicion && elVehiculoEstaDisponible;
    }

    private eliminarReserva(reserva: Reserva): void {
        const filtroReservaActual = this.reservas.filter(re => re !== reserva)
        this.reservas = filtroReservaActual
    }

    private marcarVehiculoEnAlquiler(vehiculo: Vehiculo): void {
        vehiculo.setEstado(EstadoVehiculo.EnAlquiler);
    }

    private actualizarKilometrajeRecorrido(vehiculo: Vehiculo, kmRecorridos: number): void {
        const kmFinal = vehiculo.getContadorKm() + kmRecorridos;
        vehiculo.setContadorKm(kmFinal);
    }

    private procesarMantenimiento(vehiculo: Vehiculo): void {
        vehiculo.incrementarAlquiler();

        if (vehiculo.necesitaMantenimiento()) {
            vehiculo.setEstado(EstadoVehiculo.EnMantenimiento);
            vehiculo.registrarMantenimiento(this.gestorMantenimiento);
        }
    }

}