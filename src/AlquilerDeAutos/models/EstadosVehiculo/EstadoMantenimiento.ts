import ErrorVehiculoNoDisponible from "../../errors/excepcionVehiculoNoDisponible";
import EstadoDisponible from "./EstadoDisponible";
import IEstadoVehiculo from "./IEstadoVehiculo";
import { Vehiculo } from "../Vehiculo";
import ErrorEstadoIncorrecto from "../../errors/excepcionEstadoIncorrecto";

export default class EstadoMantenimiento implements IEstadoVehiculo {
    public reservar(vehiculo: Vehiculo): void {
        throw new ErrorVehiculoNoDisponible(`El vehículo ${vehiculo.getMatricula()} está en mantenimiendo, no se encuentra disponible.`);
    }
    
    public finalizarAlquiler(vehiculo: Vehiculo): void {
        throw new ErrorEstadoIncorrecto(`El vehículo ${vehiculo.getMatricula()} está en mantenimiento.`);
    }

    public finalizarMantenimiento(vehiculo: Vehiculo): void {
        vehiculo.setEstado(new EstadoDisponible());
    }

    public estaEnAlquiler(): boolean {
        return false;
    }
}