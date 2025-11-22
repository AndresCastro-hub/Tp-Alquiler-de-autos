import EstadoEnAlquiler from "../AlquilerDeAutos/models/EstadosVehiculo/EstadoEnAlquiler";
import IEstadoVehiculo from "../AlquilerDeAutos/models/EstadosVehiculo/IEstadoVehiculo";
import { Vehiculo } from "../AlquilerDeAutos/models/Vehiculo";


describe("EstadoEnAlquiler", () => {

  let estado: IEstadoVehiculo;
  let vehiculoMock: Vehiculo;

  beforeEach(() => {
    estado = new EstadoEnAlquiler();

    vehiculoMock = {
      setEstado: jest.fn(),
      getMatricula: jest.fn().mockReturnValue("ABC123"),
      incrementarAlquiler: jest.fn(),
      necesitaMantenimiento: jest.fn().mockReturnValue(false),
      resetearValoresMantenimiento: jest.fn(),
    } as unknown as Vehiculo;

    jest.clearAllMocks();
  });

  it("reservar lanza ErrorVehiculoNoDisponible", () => {
    expect(() => estado.reservar(vehiculoMock)).toThrow();
  });

  it("finalizarAlquiler incrementa el alquiler sin mantenimiento", () => {
    estado.finalizarAlquiler(vehiculoMock);

    const mockIncrementar = vehiculoMock.incrementarAlquiler as unknown as jest.Mock;
    expect(mockIncrementar).toHaveBeenCalledTimes(1);
  });

  it("finalizarAlquiler cambia estado si necesita mantenimiento", () => {
    const necesitaMantenimientoMock = vehiculoMock.necesitaMantenimiento as unknown as jest.Mock;
    necesitaMantenimientoMock.mockReturnValue(true);

    estado.finalizarAlquiler(vehiculoMock);

    const mockSetEstado = vehiculoMock.setEstado as unknown as jest.Mock;
    const mockResetear = vehiculoMock.resetearValoresMantenimiento as unknown as jest.Mock;

    expect(mockSetEstado).toHaveBeenCalledTimes(1);
    expect(mockResetear).toHaveBeenCalledTimes(1);
  });

  it("finalizarMantenimiento lanza ErrorEstadoIncorrecto", () => {
    expect(() => estado.finalizarMantenimiento(vehiculoMock)).toThrow();
  });

  it("estaEnAlquiler devuelve true", () => {
    expect(estado.estaEnAlquiler()).toBe(true);
  });
});