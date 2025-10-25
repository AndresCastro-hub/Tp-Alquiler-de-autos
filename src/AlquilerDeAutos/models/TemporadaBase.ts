
export default abstract class TemporadaBase{
    private mesesValidos: number[];

    constructor(meses: number[]) {
        this.mesesValidos = meses;
    }

    esValida(fecha: Date): boolean {
        const mes = fecha.getMonth() + 1; 
        return this.mesesValidos.includes(mes); 
    }

    abstract getPorcentajeDeTemporada(tarifaBase: number): number;
}
