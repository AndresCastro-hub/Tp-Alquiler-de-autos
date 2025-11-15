import { EstadoVehiculo } from "../enums/EstadoVehiculo";
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

    /**
     * Procesa el mantenimiento de un vehículo.
     * 
     * Incrementa el contador de alquileres del vehículo y verifica
     * si necesita mantenimiento. Si lo requiere, cambia su estado
     * a "En Mantenimiento" y registra el mantenimiento.
     * 
     * @param {Vehiculo} vehiculo - Vehículo a procesar
     * 
     * @example
     * gestorDeMantenimiento.procesarMantenimiento(vehiculo);
     */
    
    public procesarMantenimiento(vehiculo: Vehiculo): void{
        vehiculo.incrementarAlquiler();
        
        if (vehiculo.necesitaMantenimiento()) {
            vehiculo.setEstado(EstadoVehiculo.EnMantenimiento);
            this.registrarMantenimiento(vehiculo);
            vehiculo.resetearValoresMantenimiento();
        }
    }

    public finalizarMantenimiento(vehiculo: Vehiculo): void{
        vehiculo.setEstado(EstadoVehiculo.Disponible);
    }
}