import MantenimientoDeVehiculo from "./MantenimientoDeVehiculo";

export default class GestorDeMantenimiento{
    private vehiculosEnMantemiento: MantenimientoDeVehiculo[] = [];

    public registrarMantenimiento(vehiculo: MantenimientoDeVehiculo){
        this.vehiculosEnMantemiento.push(vehiculo)
    }
}