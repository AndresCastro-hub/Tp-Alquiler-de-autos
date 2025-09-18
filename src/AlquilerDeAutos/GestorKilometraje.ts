import { ITotalDelRecorrido } from "./interfaces/ITotalDelRecorrido";

export default class GestorKilometraje {
    private informacionDelRecorrido: ITotalDelRecorrido[] = []

    public setKmRecorridoXDia(dia: Date, kmRecorridos: number): void {
        this.informacionDelRecorrido.push({dia,kmRecorridos})
    }

    public getInformacionDelRecorrido () : ITotalDelRecorrido[]{
        return this.informacionDelRecorrido;
    }

}