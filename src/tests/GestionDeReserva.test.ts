import ErrorVehiculoNoDisponible from "../AlquilerDeAutos/errors/excepcionVehiculoNoDisponible";
import Reserva from "../AlquilerDeAutos/models/Reserva";
import { Vehiculo } from "../AlquilerDeAutos/models/Vehiculo";
import GestionDeReservas from "../AlquilerDeAutos/services/GestionDeReserva";

describe("GestionDeReservas", () => {
  let gestion: GestionDeReservas;
  let vehiculoMock1: Vehiculo;

  beforeEach(() => {
    jest.clearAllMocks();
    gestion = new GestionDeReservas();

    let estadoVehiculoMock = { estaEnAlquiler: () => false };

    vehiculoMock1 = {
      getMatricula: jest.fn().mockReturnValue("ABC123"),

      getEstado: jest.fn().mockReturnValue(estadoVehiculoMock),

      reservar: jest.fn().mockImplementation(() => {
        estadoVehiculoMock = { estaEnAlquiler: () => true };
        vehiculoMock1.getEstado = jest.fn().mockReturnValue(estadoVehiculoMock);
      }),

      finalizarAlquiler: jest.fn(), 

      actualizarKMRecorridos: jest.fn(),

    } as unknown as Vehiculo;

  });

  it("debería iniciar sin reservas", () => {
    expect((gestion as any).reservas).toHaveLength(0);
  });

  it("chequearDisponibilidad: vehículo disponible y sin superposición", () => {
    const vehiculoDisponible: Vehiculo = {
      getMatricula: jest.fn().mockReturnValue("XXX111"),
    } as unknown as Vehiculo;

    const disponible = (gestion as any).chequearDisponibilidad(
      vehiculoDisponible,
      new Date("2025-05-01"),
      new Date("2025-05-10")
    );

    expect(disponible).toBe(true);
  });

  it("chequearDisponibilidad: vehículo en otro estado", () => {
    const vehiculoNoDisponible: Vehiculo = {
      getMatricula: jest.fn().mockReturnValue("YYY222"),
    } as unknown as Vehiculo;

    const disponible = (gestion as any).chequearDisponibilidad(
      vehiculoNoDisponible,
      new Date("2025-05-01"),
      new Date("2025-05-10")
    );

    expect(disponible).toBe(true);
  });

  it("chequearDisponibilidad: superposición con reserva existente", () => {
    const reservaExistente: Reserva = {
      getVehiculo: jest.fn().mockReturnValue({
        getMatricula: jest.fn().mockReturnValue("ZZZ333"),
      }),
      getFechaInicioReserva: jest.fn().mockReturnValue(new Date("2025-06-10")),
      getFechaFinReserva: jest.fn().mockReturnValue(new Date("2025-06-20")),
    } as unknown as Reserva;

    (gestion as any).reservas.push(reservaExistente);

    const vehiculo = {
      getMatricula: jest.fn().mockReturnValue("ZZZ333"),
    } as unknown as Vehiculo;

    const disponible = (gestion as any).chequearDisponibilidad(
      vehiculo,
      new Date("2025-06-15"),
      new Date("2025-06-25")
    );

    expect(disponible).toBe(false);
  });

  it("agregarReserva: agrega cuando esta disponible y marca vehículo en alquiler", () => {
    let estadoVehiculo1 = { estaEnAlquiler: () => false };
    vehiculoMock1 = {
      getMatricula: jest.fn().mockReturnValue("ABC123"),

      getEstado: jest.fn().mockReturnValue(estadoVehiculo1),

      reservar: jest.fn().mockImplementation(() => {
        estadoVehiculo1 = { estaEnAlquiler: () => true };
        vehiculoMock1.getEstado = jest.fn().mockReturnValue(estadoVehiculo1);
      }),

      actualizarKMRecorridos: jest.fn(),
    } as unknown as Vehiculo;

    const reservaMock1: Reserva = {
      getVehiculo: jest.fn().mockReturnValue(vehiculoMock1),
      getFechaInicioReserva: jest.fn().mockReturnValue(new Date("2025-07-01")),
      getFechaFinReserva: jest.fn().mockReturnValue(new Date("2025-07-10")),
    } as unknown as Reserva;

    gestion.agregarReserva(reservaMock1);

    expect((gestion as any).reservas).toHaveLength(1);
    expect(vehiculoMock1.reservar).toHaveBeenCalled();

    expect(vehiculoMock1.getEstado().estaEnAlquiler()).toBe(true);
  });

  it("agregarReserva: lanza ErrorVehiculoNoDisponible si vehículo no está disponible", () => {

    const vehiculoNoDisp: Vehiculo = {
      getMatricula: jest.fn().mockReturnValue("NO123"),
      reservar: jest.fn(),
    } as unknown as Vehiculo;

    (gestion as any).reservas.push({
      getVehiculo: () => ({ getMatricula: () => "NO123" }),
      getFechaInicioReserva: () => new Date("2025-07-30"),
      getFechaFinReserva: () => new Date("2025-08-10"),
    });

    const reservaMock: Reserva = {
      getVehiculo: jest.fn().mockReturnValue(vehiculoNoDisp),
      getFechaInicioReserva: jest.fn().mockReturnValue(new Date("2025-08-01")),
      getFechaFinReserva: jest.fn().mockReturnValue(new Date("2025-08-05")),
    } as unknown as Reserva;

    expect(() => gestion.agregarReserva(reservaMock))
      .toThrow(ErrorVehiculoNoDisponible);

    try {
      gestion.agregarReserva(reservaMock);
    } catch (e: any) {
      expect(e.message).toContain("El vehículo");
      expect(e.message).toContain("no está disponible");
    }
  });

  it("cerrarReserva: actualiza km, procesa mantenimiento y retorna costo", () => {
    const reservaMock1: Reserva = {
      getVehiculo: jest.fn().mockReturnValue(vehiculoMock1),
      getFechaInicioReserva: jest.fn().mockReturnValue(new Date("2025-05-20")),
      getFechaFinReserva: jest.fn().mockReturnValue(new Date("2025-05-25")),
      getGestionDelKilometraje: jest.fn().mockReturnValue({
        getTotalKmRecorridos: jest.fn().mockReturnValue(150),
      }),
      calcularCostoTotal: jest.fn().mockReturnValue(250),
    } as unknown as Reserva;

    (gestion as any).reservas.push(reservaMock1);

    const resultado = gestion.cerrarReserva(reservaMock1);

    expect(vehiculoMock1.actualizarKMRecorridos)
      .toHaveBeenCalledWith(150);

    expect(vehiculoMock1.finalizarAlquiler)
      .toHaveBeenCalled();

    expect(resultado).toBe(250);

    expect(reservaMock1.calcularCostoTotal)
      .toHaveBeenCalledTimes(1);
  });
});