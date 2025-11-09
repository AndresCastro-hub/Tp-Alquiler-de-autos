import TemporadaBase from "../models/TemporadaBase";

export default class GestorDeTemporada {

    private temporadas: TemporadaBase[] = [];

    public agregarTemporada(temporada: TemporadaBase): void {
        this.temporadas.push(temporada)
    }

    public getTemporada(fechaDeInicio: Date): TemporadaBase {
        const temporadaEncontrada = this.temporadas.find(t => t.esValida(fechaDeInicio));

        if (!temporadaEncontrada) {
            throw new Error("No se encontró una temporada válida para la fecha especificada.");
        }

        return temporadaEncontrada;
    }

}