import Reserva from "../models/Reserva";
import MantenimientoDeVehiculo from "../services/MantenimientoDeVehiculo";
import { Vehiculo } from "../models/Vehiculo";

export default class EstadisticaDeRentabilidad {

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
