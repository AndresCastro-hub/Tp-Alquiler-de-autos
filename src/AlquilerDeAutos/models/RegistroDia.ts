export default class RegistroDia {
    private dia: Date;
    private kmRecorrido: number;

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