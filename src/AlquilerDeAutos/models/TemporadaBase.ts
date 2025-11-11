/**
 * **Clase abstracta que representa una temporada dentro del sistema.**
 *
 * Define el comportamiento común de todas las temporadas,
 * incluyendo la validación de fechas y el cálculo del ajuste sobre la tarifa base.
 *
 * Las subclases `TemporadaAlta`, `TemporadaMedia` y `TemporadaBaja`
 * heredan de esta clase y definen su propia implementación del método
 * {@link getPorcentajeDeTemporada}, aplicando el porcentaje
 * de aumento o descuento correspondiente según la época del año.
 */
export default abstract class TemporadaBase{
    /**
     * Crea una nueva instnacia de temporada base
     * @param mesesValidos - Arreglo de numeros que representan los meses validos.
     */
    constructor(private mesesValidos: number[]) {
    }

    /**
     * Verifica si una fecha es valida.
     * 
     * @param fecha - Fecha a evaluar.
     * @returns true si el mes de la fecha esta dentro del arreglo de meses validos.
     */
    esValida(fecha: Date): boolean {
        const mes = fecha.getMonth() + 1; 
        return this.mesesValidos.includes(mes); 
    }

    /**
     * Debe ser implementada por las subclases para definir el porcentaje de ajuste
     * 
     * @param tarifaBase - Valor base de la tarifa diaria.
     * @returns El porcentaje de ajuste a aplicar sobre la tarifa base.
     */
    abstract getPorcentajeDeTemporada(tarifaBase: number): number;
}

