import EstadoMantenimiento from "../AlquilerDeAutos/models/EstadosVehiculo/EstadoMantenimiento";
import IEstadoVehiculo from "../AlquilerDeAutos/models/EstadosVehiculo/IEstadoVehiculo";
import { Vehiculo } from "../AlquilerDeAutos/models/Vehiculo";

describe("EstadoMantenimiento", () => {

  let estado: IEstadoVehiculo;
  let vehiculoMock: Vehiculo;

  beforeEach(() => {
    estado = new EstadoMantenimiento();

    vehiculoMock = {
      setEstado: jest.fn(),
      getMatricula: jest.fn().mockReturnValue("ABC123"),
    } as unknown as Vehiculo;

    jest.clearAllMocks();
  });

  it("reservar lanza ErrorVehiculoNoDisponible", () => {
    expect(() => estado.reservar(vehiculoMock)).toThrow();
  });

  it("finalizarAlquiler lanza ErrorEstadoIncorrecto", () => {
    expect(() => estado.finalizarAlquiler(vehiculoMock)).toThrow();
  });

  it("finalizarMantenimiento cambia estado a EstadoDisponible", () => {
    estado.finalizarMantenimiento(vehiculoMock);

    const mockSetEstado = vehiculoMock.setEstado as unknown as jest.Mock;

    expect(mockSetEstado).toHaveBeenCalledTimes(1);
  });

  it("estaEnAlquiler devuelve false", () => {
    expect(estado.estaEnAlquiler()).toBe(false);
  });
});