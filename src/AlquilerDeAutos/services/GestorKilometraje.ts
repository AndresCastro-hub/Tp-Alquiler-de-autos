import RegistroDia from "../models/RegistroDia";

export default class GestorKilometraje {
    private informacionDelRecorrido: RegistroDia[] 

    constructor(){
        this.informacionDelRecorrido = []
    }

    public setKmRecorridoXDia(dia: Date, kmRecorridos: number): void {
        const registroExistente = this.informacionDelRecorrido.find(
            r => r.getDia().toDateString() === dia.toDateString()
        );

        if (registroExistente) {
            registroExistente.setKmRecorrido(registroExistente.getKmRecorrido() + kmRecorridos);
        } else {
            this.informacionDelRecorrido.push(new RegistroDia(dia, kmRecorridos));
        }
    }

    public getInformacionDelRecorrido(): RegistroDia[] {
        return this.informacionDelRecorrido;
    }

    public getTotalKmRecorridos(): number {
        return this.informacionDelRecorrido.reduce(
            (total, recorrido) => total + recorrido.getKmRecorrido(),
            0
        );
    }
}
