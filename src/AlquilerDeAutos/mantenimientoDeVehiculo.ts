export default class MantenimientoDeVehiculo{
    private fechaDeMantenimiento: Date;
    private costo: number;
    private matricula: string;

    constructor(){
        this.fechaDeMantenimiento = new Date;
        this.costo = 200;
        this.matricula = "";
    }

    public setFechaMantenimiento(value: Date): void{
        this.fechaDeMantenimiento = value;
    }

    public setMatricula(value:string): void{
        this.matricula = value;
    }

    public getFechaMantenimiento(): Date{
        return this.fechaDeMantenimiento;
    }

    public getMatricula(): string{
        return this.matricula;
    }

    public getCosto(): number{
        return this.costo;
    }
}