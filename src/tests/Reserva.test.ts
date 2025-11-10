import Cliente from "../AlquilerDeAutos/models/Cliente";
import Reserva from "../AlquilerDeAutos/models/Reserva";
import { Vehiculo } from "../AlquilerDeAutos/models/Vehiculo";
import GestorDeTemporada from "../AlquilerDeAutos/services/GestorDeTemporada";
import GestorKilometraje from "../AlquilerDeAutos/services/GestorKilometraje";

const vehiculoMock: Vehiculo = {
    calcularTarifa: jest.fn().mockImplementation((informacionDelRecorrido,temporada)=>{
        let kmTotalesRecorridos = 0;
        const tarifaExtra = 0.20;
        const diasTranscurridos = informacionDelRecorrido.length;
        for (let i = 0; i < diasTranscurridos; i++) {
            kmTotalesRecorridos += informacionDelRecorrido[i].getKmRecorrido();
        }

        return diasTranscurridos * temporada.tarifaBaseTemporada + kmTotalesRecorridos * tarifaExtra;
    })
} as unknown as Vehiculo;

const gestorKilometrajeMock: GestorKilometraje = {
    getInformacionDelRecorrido: jest.fn().mockReturnValue([
        {getKmRecorrido: jest.fn().mockReturnValue(100)},
        {getKmRecorrido: jest.fn().mockReturnValue(200)},
        {getKmRecorrido: jest.fn().mockReturnValue(50)},
    ])
} as unknown as GestorKilometraje

const gestorTemporadaMock: GestorDeTemporada = {
    getTemporada: jest.fn().mockImplementation(()=>{
        return {tarifaBaseTemporada: 50};
    })
} as unknown as GestorDeTemporada

const clienteMock: Cliente = {
    getNombre: jest.fn().mockReturnValue('nombre')
} as unknown as Cliente;

describe("Clase Reserva", () => {
    let reserva: Reserva;

    beforeEach(() => {
        reserva = new Reserva(
            clienteMock,
            vehiculoMock,
            gestorKilometrajeMock,
            new Date("2025-09-18"),
            new Date("2025-09-20"),
            gestorTemporadaMock
        );
    });

    test("Debería crear la reserva correctamente", () => {
        expect(reserva.getCliente()).toBe(clienteMock);
        expect(reserva.getVehiculo()).toBe(vehiculoMock);
        expect(reserva.getFechaInicioReserva()).toEqual(new Date("2025-09-18"));
        expect(reserva.getFechaFinReserva()).toEqual(new Date("2025-09-20"));
        expect(reserva.getGestionDelKilometraje()).toBe(gestorKilometrajeMock);
    });

    test("Debería actualizar cliente y vehículo", () => {
        const clienteMock2: Cliente = {} as unknown as Cliente;
        const vehiculoMock2: Vehiculo = {} as unknown as Vehiculo;

        reserva.setCliente(clienteMock2);
        reserva.setVehiculo(vehiculoMock2);

        expect(reserva.getCliente()).toBe(clienteMock2);
        expect(reserva.getVehiculo()).toBe(vehiculoMock2);
    });

    test("Debería actualizar fechas de reserva", () => {
        const nuevaFechaInicio = new Date("2025-09-19");
        const nuevaFechaFin = new Date("2025-09-22");

        reserva.setFechaInicioReserva(nuevaFechaInicio);
        reserva.setFechaFinReserva(nuevaFechaFin);

        expect(reserva.getFechaInicioReserva()).toEqual(nuevaFechaInicio);
        expect(reserva.getFechaFinReserva()).toEqual(nuevaFechaFin);
    });

    test("Debería calcular el costo total correctamente", () => {
        expect(reserva.calcularCostoTotal()).toBe(220);
    });
});