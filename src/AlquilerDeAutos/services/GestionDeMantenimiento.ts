import { Vehiculo } from "../models/Vehiculo";
import MantenimientoDeVehiculo from "./MantenimientoDeVehiculo";

/**
 * Gestiona el mantenimiento de los vehículos en la flota.
 * 
 * Registra cuándo un vehículo requiere mantenimiento y cambia su estado
 * según los criterios de uso acumulado.
 */

export default class GestorDeMantenimiento{
    private vehiculosEnMantenimiento: MantenimientoDeVehiculo[] = [];

    /**
     * Registra un nuevo mantenimiento para un vehículo.
     * 
     * Crea un registro de mantenimiento con la fecha actual
     * y lo agrega a la lista de vehículos en mantenimiento.
     * 
     * @param {Vehiculo} vehiculo - Vehículo a registrar para mantenimiento
     * 
     * @example
     * const vehiculo = new Compacto("ABC-123", EstadoVehiculo.Disponible, 0);
     * gestorDeMantenimiento.registrarMantenimiento(vehiculo);
     */
    
    public registrarMantenimiento(vehiculo: Vehiculo){
        const mantenimientoNuevo = new MantenimientoDeVehiculo();
        mantenimientoNuevo.setFechaMantenimiento(new Date());
        mantenimientoNuevo.setVehiculo(vehiculo);
        this.vehiculosEnMantenimiento.push(mantenimientoNuevo)
    }

    public finalizarMantenimiento(vehiculo: Vehiculo): void{
        try{
            vehiculo.finalizarMantenimiento();
            this.registrarMantenimiento(vehiculo);
        } catch (error) {
            throw error;
        }
    }
}