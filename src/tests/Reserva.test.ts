import { EstadoVehiculo } from "../AlquilerDeAutos/enums/EstadoVehiculo";
import Cliente from "../AlquilerDeAutos/models/Cliente";
import RegistroDia from "../AlquilerDeAutos/models/RegistroDia";
import Reserva from "../AlquilerDeAutos/models/Reserva";
import { Vehiculo } from "../AlquilerDeAutos/models/Vehiculo";
import GestorKilometraje from "../AlquilerDeAutos/services/GestorKilometraje";

describe("Clase Reserva", () => {
    let mockCliente: Cliente;
    let mockVehiculo: Vehiculo;
    let mockGestorKm: jest.Mocked<GestorKilometraje>;
    let reserva: Reserva;

    beforeEach(() => {
        mockCliente = {
            getNombre: jest.fn().mockReturnValue("Juan"),
            getApellido: jest.fn().mockReturnValue("Perez"),
            getEmail: jest.fn().mockReturnValue("juan@example.com"),
        } as unknown as Cliente;

        mockVehiculo = {
            getMatricula: jest.fn().mockReturnValue("ABC123"),
            getEstado: jest.fn().mockReturnValue(EstadoVehiculo.Disponible),
            getContadorKm: jest.fn().mockReturnValue(0),
            getTarifaBase: jest.fn().mockReturnValue(300),
            getTarifaExtra: jest.fn().mockReturnValue(30),
            calcularTarifa: jest.fn().mockImplementation((recorridos: RegistroDia[]) => {
                const totalKm = recorridos.reduce((sum, r) => sum + r.getKmRecorrido(), 0);
                return 300 + totalKm * 30;
            }),
        } as unknown as Vehiculo;

        const registrosMock: RegistroDia[] = [
            new RegistroDia(new Date("2025-09-18"), 10),
            new RegistroDia(new Date("2025-09-19"), 5),
        ];

        mockGestorKm = {
            setKmRecorridoXDia: jest.fn(),
            getInformacionDelRecorrido: jest.fn().mockReturnValue(registrosMock),
            getTotalKmRecorridos: jest.fn().mockReturnValue(15),
        } as unknown as jest.Mocked<GestorKilometraje>;

        reserva = new Reserva(
            mockCliente,
            mockVehiculo,
            mockGestorKm,
            new Date("2025-09-18"),
            new Date("2025-09-20")
        );
    });

    test("Debería crear la reserva correctamente", () => {
        expect(reserva.getCliente()).toBe(mockCliente);
        expect(reserva.getVehiculo()).toBe(mockVehiculo);
        expect(reserva.getFechaInicioReserva()).toEqual(new Date("2025-09-18"));
        expect(reserva.getFechaFinReserva()).toEqual(new Date("2025-09-20"));
        expect(reserva.getGestionDelKilometraje()).toBe(mockGestorKm);
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
        const costo = reserva.calcularCostoTotal();

        expect(mockGestorKm.getInformacionDelRecorrido).toHaveBeenCalled();
        expect(mockVehiculo.calcularTarifa).toHaveBeenCalledWith(
            mockGestorKm.getInformacionDelRecorrido()
        );
        expect(costo).toBe(750); // 300 + (10+5)*30 = 750
    });

    test("Debería retornar los registros de kilometraje desde el gestor", () => {
        const registros = reserva.getGestionDelKilometraje().getInformacionDelRecorrido();

        expect(mockGestorKm.getInformacionDelRecorrido).toHaveBeenCalled();
        expect(registros.length).toBe(2);
        expect(registros[0].getKmRecorrido()).toBe(10);
        expect(registros[1].getKmRecorrido()).toBe(5);
    });
});
