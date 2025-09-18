import { EstadoVehiculo } from "./enums/EstadoVehiculo";
import { ITotalDelRecorrido } from "./interfaces/ITotalDelRecorrido";

export abstract class Vehiculo {
    private matricula: string;
    private estado: EstadoVehiculo;
    private contadorKm: number;
    private tarifaBase: number;
    private tarifaExtra: number;

    constructor(matricula: string, estado: EstadoVehiculo, contadorKm: number, tarifaBase: number, tarifaExtra: number) {
        this.matricula = matricula;
        this.estado = estado;
        this.contadorKm = contadorKm;
        this.tarifaBase = tarifaBase;
        this.tarifaExtra = tarifaExtra;
    }

    public getMatricula(): string {
        return this.matricula;
    }
    public setMatricula(matricula: string): void {
        this.matricula = matricula;
    }
    public getEstado(): string {
        return this.estado;
    }
    public setEstado(estado: EstadoVehiculo): void {
        this.estado = estado;
    }
    public getContadorKm(): number {
        return this.contadorKm;
    }
    public setContadorKm(contadorKm: number): void {
        this.contadorKm = contadorKm;
    }
    public getTarifaBase(): number {
        return this.tarifaBase;
    }
    public setTarifaBase(tarifaBase: number): void {
        this.tarifaBase = tarifaBase;
    }
    public getTarifaExtra(): number {
        return this.tarifaExtra;
    }
    public setTarifaExtra(tarifaExtra: number): void {
        this.tarifaExtra = tarifaExtra;
    }
    
    abstract calcularTarifa(totalDelRecorrido: ITotalDelRecorrido[]): number;
    
    public actualizarContador(km: number): void {
        this.contadorKm += km;
    }
}