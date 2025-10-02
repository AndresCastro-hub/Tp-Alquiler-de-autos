export default class MantenimientoDeVehiculo{
    private fechaDeMantenimiento: Date;
    private costo: number;
    private matricula: string;

    constructor(){
        this.fechaDeMantenimiento = new Date;
        this.costo = 200;
        this.matricula = "";
    }

    public setFechaMantenimiento(value: Date){
        this.fechaDeMantenimiento = value;
    }

    public setMatricula(value:string){
        this.matricula;
    }

    public getFechaMantenimiento(){
        return this.fechaDeMantenimiento;
    }

    public getMatricula(){
        return this.matricula;
    }

    public getCosto(){
        return this.costo;
    }
}