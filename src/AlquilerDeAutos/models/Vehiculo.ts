import EstadoDisponible from "./EstadosVehiculo/EstadoDisponible";
import IEstadoVehiculo from "./EstadosVehiculo/IEstadoVehiculo";
import RegistroDia from "./RegistroDia";
import TemporadaBase from "./TemporadaBase";
import { VehiculoMantenimiento } from "./VehiculoMantenimiento";

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
    private estado: IEstadoVehiculo;
    private contadorKm: number;
    private tarifaBase: number;
    private tarifaExtra: number;
    private mantenimiento: VehiculoMantenimiento;

    /**
     * Crea una nueva instancia de vehiculo.
     * * Inicializa el vehículo en estado {@link EstadoDisponible}.
     * * Inicializa el módulo de mantenimiento con el kilometraje inicial.
     * * @constructor
     * @param matricula - Matrícula del vehiculo.
     * @param contadorKm - Kilometraje total acumulado del vehiculo.
     */
    
    constructor(matricula: string, contadorKm: number) {
        this.matricula = matricula;
        this.estado = new EstadoDisponible();
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
    public getEstado(): IEstadoVehiculo {
        return this.estado;
    }
    public setEstado(estado: IEstadoVehiculo): void {
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

    /**
     * Determina si el vehículo ha alcanzado los umbrales (kilómetros o ciclos de alquiler) que requieren mantenimiento.
     * * @returns {boolean} `true` si se necesita mantenimiento; `false` en caso contrario.
     */
    
    public necesitaMantenimiento(): boolean {
        return this.mantenimiento.necesitaMantenimiento(this.contadorKm);
    }

    /**
     * Incrementa el contador interno de ciclos de alquiler completados por el vehículo.
     * * @returns {void}
     */
    
    public incrementarAlquiler(): void {
        this.mantenimiento.incrementarAlquiler();
    }

    /**
     * Resetea los contadores internos del vehículo utilizados para determinar el próximo mantenimiento (km desde el último servicio y ciclos de alquiler).
     * * @returns {void}
     */
    
    public resetearValoresMantenimiento(): void {
        this.mantenimiento.resetearValores();
    }

    /**
     * Actualiza el contador de kilometraje total del vehículo.
     * @param kmRecorridos - Cantidad de kilómetros recorridos durante el último período (ej. alquiler).
     * @returns {void}
     */
    
    public actualizarKMRecorridos(kmRecorridos: number): void{
        this.setContadorKm(this.getContadorKm() + kmRecorridos);
    }

    /**
     * Intenta reservar el vehículo, delegando la acción al objeto de estado actual.
     * * @returns {void}
     */
    
    public reservar(): void {
        this.estado.reservar(this);
    }

    /**
     * Intenta finalizar el alquiler del vehículo, delegando la acción al objeto de estado actual.
     * * @returns {void}
     */
    
    public finalizarAlquiler(): void {
        this.estado.finalizarAlquiler(this);
    }

    /**
     * Intenta finalizar el mantenimiento del vehículo, delegando la acción al objeto de estado actual.
     * * @returns {void}
     */
    
    public finalizarMantenimiento(): void {
        this.estado.finalizarMantenimiento(this);
    }

    /**
     * Verifica si el estado actual del vehículo es 'En Alquiler', delegando la verificación al objeto de estado.
     * * @returns {boolean} `true` si está en alquiler; `false` en caso contrario.
     */
    
    public estaEnAlquiler(): boolean {
        return this.estado.estaEnAlquiler();
    }
}