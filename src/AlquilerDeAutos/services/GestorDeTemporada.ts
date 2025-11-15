import TemporadaBase from "../models/TemporadaBase";

/**
 * Gestiona las temporadas del sistema de alquiler.
 * 
 * Mantiene un registro de todas las temporadas disponibles (alta, baja, media)
 * y permite consultar qué temporada es válida para una fecha específica.
 */

export default class GestorDeTemporada {

    private temporadas: TemporadaBase[] = [];

    /**
     * Agrega una nueva temporada al sistema.
     * 
     * @param {TemporadaBase} temporada - Temporada a agregar (alta, baja o media)
     * 
     * @example
     * const temporadaAlta = new TemporadaAlta();
     * gestorDeTemporada.agregarTemporada(temporadaAlta);
     */
    
    public agregarTemporada(temporada: TemporadaBase): void {
        this.temporadas.push(temporada)
    }

    /**
     * Obtiene la temporada válida para una fecha específica.
     * 
     * Busca entre todas las temporadas registradas cuál es válida
     * para la fecha proporcionada.
     * 
     * @param {Date} fechaDeInicio - Fecha para la cual buscar la temporada
     * @returns {TemporadaBase} Temporada válida para esa fecha
     * @throws {Error} Si no existe una temporada válida para la fecha especificada
     * 
     * @example
     * const temporada = gestorDeTemporada.getTemporada(new Date(2025, 0, 15));
     * console.log(temporada.getNombre()); // Ejemplo: "Temporada Baja"
     */
    
    public getTemporada(fechaDeInicio: Date): TemporadaBase {
        const temporadaEncontrada = this.temporadas.find(t => t.esValida(fechaDeInicio));

        if (!temporadaEncontrada) {
            throw new Error("No se encontró una temporada válida para la fecha especificada.");
        }

        return temporadaEncontrada;
    }

}