import RegistroDia from "../models/RegistroDia";

export default class GestorKilometraje {
    private informacionDelRecorrido: RegistroDia[] 

    constructor(){
        this.informacionDelRecorrido = []
    }

    public setKmRecorridoXDia(registro : RegistroDia): void {
        const registroExistente = this.informacionDelRecorrido.find(
            r => r.getDia().toDateString() === registro.getDia().toDateString()
        );

        if (registroExistente) {
            registroExistente.setKmRecorrido(registroExistente.getKmRecorrido() + registro.getKmRecorrido());
        } else {
            this.informacionDelRecorrido.push(new RegistroDia(registro.getDia(), registro.getKmRecorrido()));
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
