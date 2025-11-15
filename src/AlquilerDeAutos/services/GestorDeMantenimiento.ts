import MantenimientoDeVehiculo from "./MantenimientoDeVehiculo";

/**
 * Gestiona el registro de mantenimientos realizados en los vehículos.
 * 
 * Mantiene un historial de todos los mantenimientos realizados
 * en la flota de vehículos.
 */

export default class GestorDeMantenimiento{
    private vehiculosEnMantenimiento: MantenimientoDeVehiculo[] = [];

    /**
     * Registra un nuevo mantenimiento realizado.
     * 
     * Agrega el registro a la lista de mantenimientos históricos
     * del sistema.
     * 
     * @param {MantenimientoDeVehiculo} vehiculo - Registro de mantenimiento a registrar
     * 
     * @example
     * const mantenimiento = new MantenimientoDeVehiculo();
     * mantenimiento.setFechaMantenimiento(new Date());
     * mantenimiento.setVehiculo(vehiculo);
     * gestorDeMantenimiento.registrarMantenimiento(mantenimiento);
     */
    
    public registrarMantenimiento(vehiculo: MantenimientoDeVehiculo){
        this.vehiculosEnMantenimiento.push(vehiculo)
    }
}