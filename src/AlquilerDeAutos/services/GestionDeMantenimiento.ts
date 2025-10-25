import MantenimientoDeVehiculo from "./MantenimientoDeVehiculo";

export default class GestorDeMantenimiento{
    private vehiculosEnMantenimiento: MantenimientoDeVehiculo[] = [];

    public registrarMantenimiento(vehiculo: MantenimientoDeVehiculo){
        this.vehiculosEnMantenimiento.push(vehiculo)
    }
}