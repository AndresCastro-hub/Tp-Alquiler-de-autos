import { EstadoVehiculo } from "../enums/EstadoVehiculo";
import RegistroDia from "./RegistroDia";
import TemporadaBase from "./TemporadaBase";

/**
 * **Clase abstracta que representa un vehículo en el sistema.**
 *
 * Define las propiedades y métodos comunes a todos los tipos de vehículos,
 * incluyendo su estado, kilometraje, matrícula, tarifa base y tarifa extra.
 *
 * Las subclases concretas `Compacto`, `Sedan` y `Suv`
 * implementan el método abstracto {@link Vehiculo.calcularTarifa | calcularTarifa}
 * para definir su propia lógica de cálculo de tarifa.
 *
 */

export abstract class Vehiculo {
    private matricula: string;
    private estado: EstadoVehiculo;
    private contadorKm: number;
    private tarifaBase: number;
    private tarifaExtra: number;

    /**
     * Crea una nueva instancia de vehiculo
     * 
     * @param matricula - Matricula del vehiculo
     * @param estado - Estado actual del vehiculo (disponible, en alquiler, en mantenmiento)
     * @param contadorKm - Kilometraje total acumulado del vehiculo
     */

    constructor(matricula: string, estado: EstadoVehiculo, contadorKm: number) {
        this.matricula = matricula;
        this.estado = estado;
        this.contadorKm = contadorKm;
        this.tarifaBase = 0;
        this.tarifaExtra = 0;
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

    /**
     * Calcula la tarifa base segun la temporada vigente 
     * 
     * @param temporada 
     * @returns Tarifa base ajustada segun la temporada que corresponde
     */
    public calcularTarifaBaseSegunTemporada(temporada: TemporadaBase): number {
        return temporada.getPorcentajeDeTemporada(this.getTarifaBase());
    }

    /**
     * Calcula la tarifa total del vehiculo segun el recorridos por dias y la temporada
     * 
     * @param totalDelRecorrido - - Arreglo de objetos {@link RegistroDia} con los kilómetros recorridos por día
     * @param temporada - Temporada vigente (alta, media o baja) 
     * @returns Costo total del alquiler del vehiculo
     */
    abstract calcularTarifa(totalDelRecorrido: RegistroDia[], temporada: TemporadaBase): number;

    /**
     * Actualiza el contador de kilometros del vehiculo 
     * @param km - Cantidad de kilometros a agregar
     */
    public actualizarContador(km: number): void {
        this.contadorKm += km;
    }
}