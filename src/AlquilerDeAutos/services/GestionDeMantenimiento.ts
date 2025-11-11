import { EstadoVehiculo } from "../enums/EstadoVehiculo";
import { Vehiculo } from "../models/Vehiculo";
import MantenimientoDeVehiculo from "./MantenimientoDeVehiculo";

export default class GestorDeMantenimiento{
    private vehiculosEnMantenimiento: MantenimientoDeVehiculo[] = [];

    public registrarMantenimiento(vehiculo: Vehiculo){
        const mantenimientoNuevo = new MantenimientoDeVehiculo();
        mantenimientoNuevo.setFechaMantenimiento(new Date());
        mantenimientoNuevo.setVehiculo(vehiculo);
        this.vehiculosEnMantenimiento.push(mantenimientoNuevo)
    }

    public procesarMantenimiento(vehiculo: Vehiculo): void{
        vehiculo.incrementarAlquiler();
        
        if (vehiculo.necesitaMantenimiento()) {
            vehiculo.setEstado(EstadoVehiculo.EnMantenimiento);
            this.registrarMantenimiento(vehiculo);
            vehiculo.resetearValoresMantenimiento();
        }
    }
}