/**
 * Representa el registro diario de uso de un vehiculo
 * 
 * Guarda la fecha y los kilometros recorridos en un dia
 */

export default class RegistroDia {
    private dia: Date;
    private kmRecorrido: number;

    /**
     * Crea un nuevo registro diario
     * 
     * @param dia - Fecha del dia del registro
     * @param kmRecorrido - Cantidad de kilometros recorridos durante el dia
     */

    constructor(dia: Date, kmRecorrido: number) {
        this.dia = dia;
        this.kmRecorrido = kmRecorrido;
    }

    public getDia() : Date{
        return this.dia
    }

    public getKmRecorrido() : number{
        return this.kmRecorrido
    }

    public setDia(dia: Date): void{
        this.dia = dia
    }

    public setKmRecorrido(kmRecorrido: number): void{
        this.kmRecorrido = kmRecorrido
    }

}