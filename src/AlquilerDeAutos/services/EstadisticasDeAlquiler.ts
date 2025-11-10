
import Reserva from "../models/Reserva";

export default class EstadisticasDeAlquiler {

    public vehiculoMasAlquilado(reservas: Array<Reserva>, fechaInicio: Date, fechaFin: Date): string{
        return this.obtenerMaximoMinimo(reservas, fechaInicio , fechaFin, true);
    }   

    public vehiculoMinimoAlquilado(reservas: Array<Reserva>, fechaInicio: Date, fechaFin: Date): string{
        return this.obtenerMaximoMinimo(reservas, fechaInicio, fechaFin);
    }

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