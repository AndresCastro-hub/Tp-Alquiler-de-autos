export default class MantenimientoVehiculo{

    private fechaMantenimiento: Date;
    private costo: number;
    private modelo: string; // o mejor por matricula?

    constructor(){
        this.fechaMantenimiento = new Date() // esta ok? debo agregar set/get?
        this.costo = 50; // valor fijo?
        this.modelo= "";
    }

    public setModelo(value: string){
        this.modelo = value;
    }

    public getCosto(){
        return this.costo;
    }

    public getModelo(){
        return this.modelo
    }

}