
export default abstract class TemporadaBase{
    constructor(private mesesValidos: number[]) {
    }

    esValida(fecha: Date): boolean {
        const mes = fecha.getMonth() + 1; 
        return this.mesesValidos.includes(mes); 
    }

    abstract getPorcentajeDeTemporada(tarifaBase: number): number;
}
