import { COSTO_MANTENIMIENTO } from "../constants/constants";
import { Vehiculo } from "../models/Vehiculo";

/**
 * Representa un registro de mantenimiento realizado a un vehículo.
 * 
 * Almacena la información del mantenimiento incluyendo fecha,
 * costo y vehículo asociado.
 */

export default class MantenimientoDeVehiculo{
    private fechaDeMantenimiento: Date;
    private costo: number;
    private vehiculo: Vehiculo;

    /**
     * Inicializa un nuevo registro de mantenimiento.
     * 
     * - Fecha: Se establece a la fecha y hora actual
     * - Costo: Se establece con el valor constante de costo de mantenimiento
     * - Vehículo: Se inicializa como undefined (debe asignarse después)
     */
    
    constructor(){
        this.fechaDeMantenimiento = new Date();
        this.costo = COSTO_MANTENIMIENTO;
        this.vehiculo = undefined as unknown as Vehiculo;
    }

    /**
     * Establece la fecha del mantenimiento.
     * 
     * @param {Date} value - Fecha en que se realizó el mantenimiento
     * 
     * @example
     * mantenimiento.setFechaMantenimiento(new Date(2025, 0, 15));
     */
    
    public setFechaMantenimiento(value: Date): void{
        this.fechaDeMantenimiento = value;
    }

    /**
     * Establece el vehículo al que se le realizó el mantenimiento.
     * 
     * @param {Vehiculo} value - Vehículo asociado al mantenimiento
     * 
     * @example
     * mantenimiento.setVehiculo(compacto);
     */
    
    public setVehiculo(value:Vehiculo): void{
        this.vehiculo = value;
    }

    /**
     * Obtiene la fecha del mantenimiento realizado.
     * 
     * @returns {Date} Fecha del mantenimiento
     */
    
    public getFechaMantenimiento(): Date{
        return this.fechaDeMantenimiento;
    }

    /**
     * Obtiene el vehículo asociado al mantenimiento.
     * 
     * @returns {Vehiculo} Vehículo que fue mantenido
     */
    
    public getVehiculo(): Vehiculo{
        return this.vehiculo;
    }

    /**
     * Obtiene el costo del mantenimiento realizado.
     * 
     * El costo es fijo y se define en las constantes del sistema.
     * 
     * @returns {number} Costo del mantenimiento
     * 
     * @example
     * const costo = mantenimiento.getCosto(); // Retorna el valor de COSTO_MANTENIMIENTO
     */
    
    public getCosto(): number{
        return this.costo;
    }
}