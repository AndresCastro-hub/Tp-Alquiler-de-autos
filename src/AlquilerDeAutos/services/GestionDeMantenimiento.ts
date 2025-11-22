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
     * * Crea un registro de mantenimiento con la fecha actual y lo agrega a la lista.
     * * @public
     * @param {Vehiculo} vehiculo - Vehículo a registrar.
     * * @example
     * const vehiculo = new Compacto("ABC-123", 0);
     * gestorDeMantenimiento.registrarMantenimiento(vehiculo);
     */
    
    public registrarMantenimiento(vehiculo: Vehiculo){
        const mantenimientoNuevo = new MantenimientoDeVehiculo();
        mantenimientoNuevo.setFechaMantenimiento(new Date());
        mantenimientoNuevo.setVehiculo(vehiculo);
        this.vehiculosEnMantenimiento.push(mantenimientoNuevo)
    }

    /**
     * Finaliza el mantenimiento de un vehículo, delegando la acción al objeto Vehiculo.
     * * * Llama al método {@link Vehiculo.finalizarMantenimiento | finalizarMantenimiento()}
     * * * y registra el mantenimiento como completado.
     * * @public
     * @param {Vehiculo} vehiculo - Vehículo cuyo mantenimiento se va a finalizar.
     * @returns {void}
     * @throws {Error} Propaga cualquier error si el vehículo no está en estado 'Mantenimiento'.
     */
    
    public finalizarMantenimiento(vehiculo: Vehiculo): void{
        try{
            vehiculo.finalizarMantenimiento();
            this.registrarMantenimiento(vehiculo);
        } catch (error) {
            throw error;
        }
    }
}