import EstadisticasDeAlquiler from "../AlquilerDeAutos/services/EstadisticasDeAlquiler";
import Reserva from "../AlquilerDeAutos/models/Reserva"; 
import { Vehiculo } from "../AlquilerDeAutos/models/Vehiculo"; 

const crearVehiculoMock = (matricula: string) => ({
    getMatricula: () => matricula,
} as Vehiculo);

const crearReservaMock = (
    matricula: string, 
    fechaInicio: Date, 
    fechaFin: Date
): Reserva => ({
    getVehiculo: () => crearVehiculoMock(matricula),
    getFechaInicioReserva: () => fechaInicio,
    getFechaFinReserva: () => fechaFin,
} as Reserva);

describe('EstadisticasDeAlquiler', () => {

    let estadisticas: EstadisticasDeAlquiler;

    beforeEach(() => {
        estadisticas = new EstadisticasDeAlquiler(); 
    });

    // fechas para el período de búsqueda
    const PERIODO_INICIO = new Date('2024-01-01');
    const PERIODO_FIN = new Date('2024-01-31');

    test('Identifica el vehículo más alquilado correctamente', () => {
        const reservas: Array<Reserva> = [
            crearReservaMock('AAA111', new Date('2024-01-05'), new Date('2024-01-07')),
            crearReservaMock('BBB222', new Date('2024-01-10'), new Date('2024-01-12')),
            crearReservaMock('AAA111', new Date('2024-01-15'), new Date('2024-01-17')),
            crearReservaMock('CCC333', new Date('2024-01-20'), new Date('2024-01-22')), 
            crearReservaMock('AAA111', new Date('2024-01-25'), new Date('2024-01-27')),
        ];

        const masAlquilado = estadisticas.vehiculoMasAlquilado(reservas, PERIODO_INICIO, PERIODO_FIN);

        expect(masAlquilado).toBe('AAA111');
    });
    
    test('Identifica el vehículo menos alquilado correctamente (no empates)', () => { 
        // El primero que encuentra (BBB222) será el 'menos alquilado'.
        const reservas: Array<Reserva> = [
            crearReservaMock('AAA111', new Date('2024-01-05'), new Date('2024-01-07')), 
            crearReservaMock('BBB222', new Date('2024-01-10'), new Date('2024-01-12')), 
            crearReservaMock('AAA111', new Date('2024-01-15'), new Date('2024-01-17')),
            crearReservaMock('CCC333', new Date('2024-01-20'), new Date('2024-01-22')), 
            crearReservaMock('AAA111', new Date('2024-01-25'), new Date('2024-01-27')),
        ];

        const menosAlquilado = estadisticas.vehiculoMinimoAlquilado(reservas, PERIODO_INICIO, PERIODO_FIN);

        expect(menosAlquilado).toBe('BBB222'); 
    });
    
    test('Ignora las reservas fuera del rango de fechas', () => {
        const reservas: Array<Reserva> = [
            crearReservaMock('DENTRO', new Date('2024-01-10'), new Date('2024-01-15')), 
            crearReservaMock('FUERA', new Date('2024-01-25'), new Date('2024-02-01')), 
            crearReservaMock('FUERA', new Date('2023-12-25'), new Date('2024-01-05')), 
            crearReservaMock('DENTRO', new Date('2024-01-20'), new Date('2024-01-25')), 
        ];

        const masAlquilado = estadisticas.vehiculoMasAlquilado(reservas, PERIODO_INICIO, PERIODO_FIN);
        const menosAlquilado = estadisticas.vehiculoMinimoAlquilado(reservas, PERIODO_INICIO, PERIODO_FIN);

        expect(masAlquilado).toBe('DENTRO');
        expect(menosAlquilado).toBe('DENTRO');
    });

    test('Devuelve cadena vacía cuando no hay reservas', () => {
        const reservas: Array<Reserva> = [];

        expect(estadisticas.vehiculoMasAlquilado(reservas, PERIODO_INICIO, PERIODO_FIN)).toBe('');
        expect(estadisticas.vehiculoMinimoAlquilado(reservas, PERIODO_INICIO, PERIODO_FIN)).toBe('');
    });

});