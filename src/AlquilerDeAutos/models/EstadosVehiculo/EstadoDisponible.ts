import EstadoEnAlquiler from "./EstadoEnAlquiler";
import IEstadoVehiculo from "./IEstadoVehiculo";
import { Vehiculo } from "../Vehiculo";
import ErrorEstadoIncorrecto from "../../errors/excepcionEstadoIncorrecto";

export default class EstadoDisponible implements IEstadoVehiculo {
    public reservar(vehiculo: Vehiculo): void {
        vehiculo.setEstado( new EstadoEnAlquiler() );
    }
    
    public finalizarAlquiler(vehiculo: Vehiculo): void {
        throw new ErrorEstadoIncorrecto(`El vehículo ${vehiculo.getMatricula()} está disponible y no está siendo alquilado.`);
    }

    public finalizarMantenimiento(vehiculo: Vehiculo): void {
        throw new ErrorEstadoIncorrecto(`El vehículo ${vehiculo.getMatricula()} está disponible y no puede realizar mantenimiento.`);
    }

    public estaEnAlquiler(): boolean {
        return false;
    }
}