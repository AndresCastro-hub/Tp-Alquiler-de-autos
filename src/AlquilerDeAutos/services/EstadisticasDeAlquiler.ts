
import Reserva from "../models/Reserva";

/**
 * Analiza estadísticas de alquileres de vehículos.
 * 
 * Permite identificar cuáles vehículos son más o menos alquilados
 * dentro de un período de tiempo específico.
 */

export default class EstadisticasDeAlquiler {

    /**
     * Encuentra el vehículo más alquilado en un período.
     * 
     * @param {Reserva[]} reservas - Lista de todas las reservas
     * @param {Date} fechaInicio - Fecha de inicio del período a analizar
     * @param {Date} fechaFin - Fecha de fin del período a analizar
     * @returns {string} Matrícula del vehículo más alquilado, o cadena vacía si no hay reservas
     */
    
    public vehiculoMasAlquilado(reservas: Array<Reserva>, fechaInicio: Date, fechaFin: Date): string{
        return this.obtenerMaximoMinimo(reservas, fechaInicio , fechaFin, true);
    }   

    /**
     * Encuentra el vehículo menos alquilado en un período.
     * 
     * @param {Reserva[]} reservas - Lista de todas las reservas
     * @param {Date} fechaInicio - Fecha de inicio del período a analizar
     * @param {Date} fechaFin - Fecha de fin del período a analizar
     * @returns {string} Matrícula del vehículo menos alquilado, o cadena vacía si no hay reservas
     */
    
    public vehiculoMinimoAlquilado(reservas: Array<Reserva>, fechaInicio: Date, fechaFin: Date): string{
        return this.obtenerMaximoMinimo(reservas, fechaInicio, fechaFin);
    }

    /**
     * Compara alquileres para encontrar el máximo o mínimo.
     * 
     * @private
     * @param {Reserva[]} reservas - Lista de reservas a analizar
     * @param {Date} fechaInicio - Fecha de inicio del período
     * @param {Date} fechaFin - Fecha de fin del período
     * @param {boolean} obtenerMaximo - Si es true busca el máximo, si es false busca el mínimo
     * @returns {string} Matrícula del vehículo encontrado
     */
    
    private obtenerMaximoMinimo(reservas: Array<Reserva>, fechaInicio: Date, fechaFin: Date, obtenerMaximo?: boolean): string {
        const contador = this.obtenerAlquilados(reservas, fechaInicio, fechaFin);

        let matriculaObtenida = "";
        let valorComparacion = obtenerMaximo ? 0 : Infinity;

        if (contador.size === 0) {
            return matriculaObtenida;
        }

        for (const [matricula, conteo] of contador.entries()) {
            const condicionDeRecorrida = obtenerMaximo ? conteo > valorComparacion : conteo < valorComparacion
            if (condicionDeRecorrida) {
                valorComparacion = conteo;
                matriculaObtenida = matricula;
            }
        }

        return matriculaObtenida;

    }

    /**
     * Cuenta cuántas veces fue alquilado cada vehículo en el período.
     * 
     * Filtra solo las reservas que caen completamente dentro del período especificado.
     * 
     * @private
     * @param {Reserva[]} reservas - Lista de reservas
     * @param {Date} fechaInicio - Fecha de inicio del período
     * @param {Date} fechaFin - Fecha de fin del período
     * @returns {Map<string, number>} Mapa con matrícula como clave y cantidad de alquileres como valor
     */
    
    private obtenerAlquilados(reservas: Array<Reserva>, fechaInicio: Date, fechaFin: Date): Map<string, number> {
        const contadorDeAlquileres = new Map;
        for (let i = 0; i < reservas.length; i++) {

            if (reservas[i].getFechaInicioReserva() >= fechaInicio && reservas[i].getFechaFinReserva() <= fechaFin) {

                const matriculaActual = reservas[i].getVehiculo().getMatricula();

                const conteoActual = contadorDeAlquileres.get(matriculaActual) || 0;
                contadorDeAlquileres.set(matriculaActual, conteoActual + 1);

            }
        }
        return contadorDeAlquileres;
    }
}