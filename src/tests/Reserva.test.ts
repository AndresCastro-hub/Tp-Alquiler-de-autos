import { EstadoVehiculo } from "../AlquilerDeAutos/enums/EstadoVehiculo";
import Cliente from "../AlquilerDeAutos/models/Cliente";
import RegistroDia from "../AlquilerDeAutos/models/RegistroDia";
import Reserva from "../AlquilerDeAutos/models/Reserva";
import { Vehiculo } from "../AlquilerDeAutos/models/Vehiculo";
import GestorKilometraje from "../AlquilerDeAutos/services/GestorKilometraje";

class VehiculoMock extends Vehiculo {
    calcularTarifa(totalDelRecorrido: RegistroDia[]): number {
        const kmTotal = totalDelRecorrido.reduce((acc, r) => acc + r.getKmRecorrido(), 0);
        return this.getTarifaBase() + kmTotal * 10;
    }
}

describe("Clase Reserva", () => {
    let cliente: Cliente;
    let vehiculo: VehiculoMock;
    let gestorKilometraje: GestorKilometraje;
    let reserva: Reserva;

    beforeEach(() => {
        cliente = new Cliente("Juan", "Perez", "juan@example.com");
        vehiculo = new VehiculoMock("ABC123", EstadoVehiculo.Disponible, 0, 100, 20);
        gestorKilometraje = new GestorKilometraje();
        reserva = new Reserva(
            cliente,
            vehiculo,
            gestorKilometraje,
            new Date("2025-09-18"),
            new Date("2025-09-20")
        );
    });

    test("Debería crear la reserva correctamente", () => {
        expect(reserva.getCliente()).toBe(cliente);
        expect(reserva.getVehiculo()).toBe(vehiculo);
        expect(reserva.getFechaInicioReserva()).toEqual(new Date("2025-09-18"));
        expect(reserva.getFechaFinReserva()).toEqual(new Date("2025-09-20"));
        expect(reserva.getGestionDelKilometraje()).toBe(gestorKilometraje);
    });

    test("Debería actualizar cliente y vehículo", () => {
        const nuevoCliente = new Cliente("Ana", "Gomez", "ana@example.com");
        const nuevoVehiculo = new VehiculoMock("XYZ789", EstadoVehiculo.Disponible, 0, 200, 30);

        reserva.setCliente(nuevoCliente);
        reserva.setVehiculo(nuevoVehiculo);

        expect(reserva.getCliente()).toBe(nuevoCliente);
        expect(reserva.getVehiculo()).toBe(nuevoVehiculo);
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
        gestorKilometraje.setKmRecorridoXDia(new Date("2025-09-18"), 10); // 10 km
        gestorKilometraje.setKmRecorridoXDia(new Date("2025-09-19"), 5);  // 5 km

        // VehiculoMock: tarifa = tarifaBase + 10 * kmTotal
        // tarifaBase = 100, kmTotal = 15 => 100 + 15*10 = 250
        expect(reserva.calcularCostoTotal()).toBe(250);
    });

    test("Debería retornar los registros de kilometraje desde el gestor", () => {
        gestorKilometraje.setKmRecorridoXDia(new Date("2025-09-18"), 20);
        const registros = reserva.getGestionDelKilometraje().getInformacionDelRecorrido();

        expect(registros.length).toBe(1);
        expect(registros[0].getKmRecorrido()).toBe(20);
        expect(registros[0].getDia()).toEqual(new Date("2025-09-18"));
    });
});
