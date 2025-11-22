import ErrorVehiculoNoDisponible from "../../errors/excepcionVehiculoNoDisponible";
import EstadoMantenimiento from "./EstadoMantenimiento";
import IEstadoVehiculo from "./IEstadoVehiculo";
import { Vehiculo } from "../Vehiculo";
import ErrorEstadoIncorrecto from "../../errors/excepcionEstadoIncorrecto";

export default class EstadoEnAlquiler implements IEstadoVehiculo {
    public reservar(vehiculo: Vehiculo): void {
        throw new ErrorVehiculoNoDisponible(`El vehículo ${vehiculo.getMatricula()} está en alquiler, no se encuentra disponible.`);
    }
    
    public finalizarAlquiler(vehiculo: Vehiculo): void {
        vehiculo.incrementarAlquiler();
                
        if (vehiculo.necesitaMantenimiento()) {
            vehiculo.setEstado( new EstadoMantenimiento() );
            vehiculo.resetearValoresMantenimiento();
        }
    }

    public finalizarMantenimiento(vehiculo: Vehiculo): void {
        throw new ErrorEstadoIncorrecto(`El vehículo ${vehiculo.getMatricula()} está en alquiler y no puede realizar mantenimiento.`);
    }

    public estaEnAlquiler(): boolean {
        return true;
    }
}