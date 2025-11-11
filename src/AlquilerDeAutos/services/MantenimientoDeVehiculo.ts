import { COSTO_MANTENIMIENTO } from "../constants/constants";
import { Vehiculo } from "../models/Vehiculo";

export default class MantenimientoDeVehiculo{
    private fechaDeMantenimiento: Date;
    private costo: number;
    private vehiculo: Vehiculo;

    constructor(){
        this.fechaDeMantenimiento = new Date();
        this.costo = COSTO_MANTENIMIENTO;
        this.vehiculo = undefined as unknown as Vehiculo;
    }

    public setFechaMantenimiento(value: Date): void{
        this.fechaDeMantenimiento = value;
    }

    public setVehiculo(value:Vehiculo): void{
        this.vehiculo = value;
    }

    public getFechaMantenimiento(): Date{
        return this.fechaDeMantenimiento;
    }

    public getVehiculo(): Vehiculo{
        return this.vehiculo;
    }

    public getCosto(): number{
        return this.costo;
    }
}