import { Vehiculo } from "../Vehiculo";

export default interface IEstadoVehiculo {
    reservar(vehiculo: Vehiculo): void;
    finalizarAlquiler(vehiculo: Vehiculo): void;
    finalizarMantenimiento(vehiculo: Vehiculo): void;
    estaEnAlquiler(): boolean;
}