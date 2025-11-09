import { EstadoVehiculo } from "../enums/EstadoVehiculo";
import GestorDeMantenimiento from "../services/GestionDeMantenimiento";
import MantenimientoDeVehiculo from "../services/MantenimientoDeVehiculo";
import RegistroDia from "./RegistroDia";
import TemporadaBase from "./TemporadaBase";
import { VehiculoMantenimiento } from "./VehiculoMantenimiento";

export abstract class Vehiculo {
    private matricula: string;
    private estado: EstadoVehiculo;
    private contadorKm: number;
    private tarifaBase: number;
    private tarifaExtra: number;
    private mantenimiento: VehiculoMantenimiento;

    constructor(matricula: string, estado: EstadoVehiculo, contadorKm: number) {
        this.matricula = matricula;
        this.estado = estado;
        this.contadorKm = contadorKm;
        this.tarifaBase = 0;
        this.tarifaExtra = 0;
        this.mantenimiento = new VehiculoMantenimiento(new Date(), contadorKm);
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

    public calcularTarifaBaseSegunTemporada(temporada: TemporadaBase): number {
        return temporada.getPorcentajeDeTemporada(this.getTarifaBase());
    }

    abstract calcularTarifa(totalDelRecorrido: RegistroDia[], temporada: TemporadaBase): number;

    public actualizarContador(km: number): void {
        this.contadorKm += km;
    }

    //ITEM 2
    public necesitaMantenimiento(): boolean {
        return this.mantenimiento.necesitaMantenimiento(this.contadorKm);
    }

    public incrementarAlquiler(): void {
        this.mantenimiento.incrementarAlquiler();
    }

    public resetearValoresMantenimiento(): void {
        this.mantenimiento.resetearValores();
    }

    public actualizarKMRecorridos(kmRecorridos: number): void{
        this.setContadorKm(this.getContadorKm() + kmRecorridos);
    }
}