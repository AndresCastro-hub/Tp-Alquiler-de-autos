
import Reserva from "../models/Reserva";
import MantenimientoDeVehiculo from "../services/MantenimientoDeVehiculo";
import { Vehiculo } from "../models/Vehiculo";

export default class EstadisticaDeRentabilidad {

    /**
     * Agrupa y suma los ingresos generados por cada vehículo a partir de las reservas.
     *
     * @private
     * @param {Reserva[]} reservas - Lista de reservas a procesar
     * @returns {Map<string, number>} Mapa donde la clave es la matrícula y el valor es el ingreso total
     */
    
    private obtenerIngresosPorVehiculo(reservas: Reserva[]): Map<string, number> {
        const ingresosPorVehiculo = new Map<string, number>();

        reservas.forEach((reserva) => {
            const matricula = reserva.getVehiculo().getMatricula();
            const ingreso = reserva.calcularCostoTotal();
            const ingresoActual = ingresosPorVehiculo.get(matricula) || 0;
            ingresosPorVehiculo.set(matricula, ingresoActual + ingreso);
        });

        return ingresosPorVehiculo;
    }

    /**
     * Agrupa y suma los costos de mantenimiento por vehículo.
     *
     * @private
     * @param {MantenimientoDeVehiculo[]} mantenimientos - Lista de registros de mantenimiento
     * @returns {Map<string, number>} Mapa donde la clave es la matrícula y el valor es el costo total de mantenimiento
     */
    
    private obtenerCostoMantenimiento(mantenimientos: MantenimientoDeVehiculo[]): Map<string, number> {
        const costoPorVehiculo = new Map<string, number>();

        mantenimientos.forEach((mantenimiento) => {
            const matricula = mantenimiento.getVehiculo().getMatricula();
            const costo = mantenimiento.getCosto();
            const costoActual = costoPorVehiculo.get(matricula) || 0;
            costoPorVehiculo.set(matricula, costoActual + costo);
        });

        return costoPorVehiculo;
    }

    /**
     * Determina el vehículo con mayor rentabilidad neta (ingresos - costos) entre los vehículos que aparecen en las reservas.
     *
     * - Calcula ingresos acumulados por vehículo a partir de las reservas.
     * - Calcula costos de mantenimiento acumulados por vehículo.
     * - Retorna el vehículo con la mayor diferencia (ingreso - costo).
     *
     * Si hay empate se devuelve el primer vehículo evaluado con esa rentabilidad mayor.
     * Si la lista de reservas está vacía retorna `null`.
     *
     * @param {Reserva[]} reservas - Lista de reservas para calcular ingresos
     * @param {MantenimientoDeVehiculo[]} mantenimientos - Lista de mantenimientos para calcular costos
     * @returns {Vehiculo | null} Vehículo con mayor rentabilidad o null si no hay reservas
     */
    
    public mayorRentabilidad(reservas: Reserva[], mantenimientos: MantenimientoDeVehiculo[]): Vehiculo | null {
        
        const ingresos = this.obtenerIngresosPorVehiculo(reservas);
        const costos = this.obtenerCostoMantenimiento(mantenimientos);

        let mayorRentabilidad = -Infinity;
        let vehiculoConMayorRentabilidad: Vehiculo | null = null;

        reservas.forEach((reserva) => {
            const vehiculo = reserva.getVehiculo();
            const matricula = vehiculo.getMatricula();
            const ingreso = ingresos.get(matricula) || 0;
            const costo = costos.get(matricula) || 0;
            const rentabilidad = ingreso - costo;

            if (rentabilidad > mayorRentabilidad) {
                mayorRentabilidad = rentabilidad;
                vehiculoConMayorRentabilidad = vehiculo;
            }
        });

        return vehiculoConMayorRentabilidad;
    }

     /**
     * Determina el vehículo con menor rentabilidad neta (ingresos - costos) entre los vehículos que aparecen en las reservas.
     *
     * - Calcula ingresos acumulados por vehículo a partir de las reservas.
     * - Calcula costos de mantenimiento acumulados por vehículo.
     * - Retorna el vehículo con la menor diferencia (ingreso - costo).
     *
     * Si hay empate se devuelve el primer vehículo evaluado con esa rentabilidad menor.
     * Si la lista de reservas está vacía retorna `null`.
     *
     * @param {Reserva[]} reservas - Lista de reservas para calcular ingresos
     * @param {MantenimientoDeVehiculo[]} mantenimientos - Lista de mantenimientos para calcular costos
     * @returns {Vehiculo | null} Vehículo con menor rentabilidad o null si no hay reservas
     */
    
    public menorRentabilidad(reservas: Reserva[], mantenimientos: MantenimientoDeVehiculo[]): Vehiculo | null {
        const ingresos = this.obtenerIngresosPorVehiculo(reservas);
        const costos = this.obtenerCostoMantenimiento(mantenimientos);

        let menorRentabilidad = Infinity;
        let vehiculoConMenorRentabilidad: Vehiculo | null = null;

        reservas.forEach((reserva) => {
            const vehiculo = reserva.getVehiculo();
            const matricula = vehiculo.getMatricula();
            const ingreso = ingresos.get(matricula) || 0;
            const costo = costos.get(matricula) || 0;
            const rentabilidad = ingreso - costo;

            if (rentabilidad < menorRentabilidad) {
                menorRentabilidad = rentabilidad;
                vehiculoConMenorRentabilidad = vehiculo;
            }
        });

        return vehiculoConMenorRentabilidad;
    }
}
