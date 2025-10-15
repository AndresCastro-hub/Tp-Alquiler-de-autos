import { EstadoVehiculo } from "../AlquilerDeAutos/enums/EstadoVehiculo";
import Cliente from "../AlquilerDeAutos/models/Cliente";
import Reserva from "../AlquilerDeAutos/models/Reserva";
import { Vehiculo } from "../AlquilerDeAutos/models/Vehiculo";
import GestionDeReservas from "../AlquilerDeAutos/services/GestionDeReserva";
import GestorKilometraje from "../AlquilerDeAutos/services/GestorKilometraje";

const mockCliente = {
  getNombre: jest.fn().mockReturnValue("Juan"),
  getApellido: jest.fn().mockReturnValue("Perez"),
  getEmail: jest.fn().mockReturnValue("juan@example.com"),
};

let estadoActual = EstadoVehiculo.Disponible;
let contadorKm = 0;

const mockVehiculo = {
  getMatricula: jest.fn().mockReturnValue("ABC123"),
  getEstado: jest.fn(() => estadoActual),
  setEstado: jest.fn((nuevoEstado) => {
    estadoActual = nuevoEstado;
  }),
  getContadorKm: jest.fn(() => contadorKm),
  setContadorKm: jest.fn((nuevoKm) => {
    contadorKm = nuevoKm;
  }),
  getTarifaBase: jest.fn().mockReturnValue(300),
  getTarifaExtra: jest.fn().mockReturnValue(30),
  calcularTarifa: jest.fn().mockImplementation((recorridos: any[]) => {
    const totalKm = recorridos.reduce((sum, r) => sum + r.getKmRecorrido(), 0);
    return 300 + totalKm * 30;
  }),
};

const mockGestorKm = {
  getTotalKmRecorridos: jest.fn().mockReturnValue(80),
  setKmRecorridoXDia: jest.fn(),
  getRegistros: jest.fn().mockReturnValue([
    { getKmRecorrido: jest.fn().mockReturnValue(50) },
    { getKmRecorrido: jest.fn().mockReturnValue(30) },
  ]),
};

const mockReserva = {
  getVehiculo: jest.fn().mockReturnValue(mockVehiculo),
  getCliente: jest.fn().mockReturnValue(mockCliente),
  getFechaInicioReserva: jest.fn().mockReturnValue(new Date("2025-09-18")),
  getFechaFinReserva: jest.fn().mockReturnValue(new Date("2025-09-20")),
  setCliente: jest.fn(),
  setVehiculo: jest.fn(),
  setFechaInicioReserva: jest.fn(),
  setFechaFinReserva: jest.fn(),
  getGestionDelKilometraje: jest.fn().mockReturnValue(mockGestorKm),
  calcularCostoTotal: jest.fn().mockImplementation(() => {
    const registros = mockGestorKm.getRegistros();
    return mockVehiculo.calcularTarifa(registros);
  }),
  getGestorKm: jest.fn().mockReturnValue(mockGestorKm),
} as unknown as Reserva;

describe("GestionDeReservas", () => {
  let gestion: GestionDeReservas;

  beforeEach(() => {
    gestion = new GestionDeReservas();
    estadoActual = EstadoVehiculo.Disponible;
    contadorKm = 0;
  });

  it("debería iniciar sin reservas", () => {
    expect((gestion as any).reservas).toHaveLength(0);
  });

  it("debería agregar una reserva si el vehículo está disponible", () => {
    gestion.agregarReserva(mockReserva);
    const reservas = (gestion as any).reservas;

    expect(reservas).toHaveLength(1);
    expect(reservas[0]).toBe(mockReserva);
    expect(mockVehiculo.setEstado).toHaveBeenCalledWith(EstadoVehiculo.EnAlquiler);
  });

  it("debería lanzar error si el vehículo no está disponible en esas fechas", () => {
    gestion.agregarReserva(mockReserva);
    estadoActual = EstadoVehiculo.EnAlquiler;

    const reservaSuperpuesta = new Reserva(
      mockCliente as unknown as Cliente,
      mockVehiculo as unknown as Vehiculo,
      mockGestorKm as unknown as GestorKilometraje,
      new Date(),
      new Date()
    );

    expect(() => gestion.agregarReserva(reservaSuperpuesta)).toThrow(
      `El vehículo ${mockVehiculo.getMatricula()} no está disponible en esas fechas.`
    );
  });

  it("debería cerrar una reserva, actualizar km y cambiar estado a 'NecesitaLimpieza'", () => {
    mockGestorKm.getTotalKmRecorridos.mockReturnValue(80);
    gestion.agregarReserva(mockReserva);

    const costoTotal = gestion.cerrarReserva(mockReserva);

    expect(mockVehiculo.setContadorKm).toHaveBeenCalledWith(80);
    expect(mockVehiculo.setEstado).toHaveBeenCalledWith(EstadoVehiculo.NecesitaLimpieza);
    expect(costoTotal).toBeGreaterThan(0);
  });

  it("debería permitir múltiples reservas para distintos vehículos", () => {
    const otroVehiculo = {
      getMatricula: jest.fn().mockReturnValue("XYZ789"),
      getEstado: jest.fn().mockReturnValue(EstadoVehiculo.Disponible),
      setEstado: jest.fn(),
      getContadorKm: jest.fn().mockReturnValue(100),
      setContadorKm: jest.fn(),
      getTarifaBase: jest.fn().mockReturnValue(400),
      getTarifaExtra: jest.fn().mockReturnValue(20),
      calcularTarifa: jest.fn().mockReturnValue(600),
    } as unknown as Vehiculo;

    const otroGestorKm = {
      getTotalKmRecorridos: jest.fn().mockReturnValue(50),
      setKmRecorridoXDia: jest.fn(),
      getRegistros: jest.fn().mockReturnValue([]),
    } as unknown as GestorKilometraje;

    const otraReserva = new Reserva(
      mockCliente as unknown as Cliente,
      otroVehiculo,
      otroGestorKm,
      new Date("2025-09-25"),
      new Date("2025-09-28")
    );

    gestion.agregarReserva(mockReserva);
    gestion.agregarReserva(otraReserva);

    const reservas = (gestion as any).reservas;
    expect(reservas).toHaveLength(2);
    expect(reservas[1].getVehiculo()).toBe(otroVehiculo);
  });
});
