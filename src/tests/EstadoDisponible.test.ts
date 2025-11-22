import EstadoDisponible from "../AlquilerDeAutos/models/EstadosVehiculo/EstadoDisponible";
import IEstadoVehiculo from "../AlquilerDeAutos/models/EstadosVehiculo/IEstadoVehiculo";
import { Vehiculo } from "../AlquilerDeAutos/models/Vehiculo";

describe("EstadoDisponible", () => {

  let estado: IEstadoVehiculo;
  let vehiculoMock: Vehiculo;

  beforeEach(() => {
    estado = new EstadoDisponible();

    vehiculoMock = {
      setEstado: jest.fn(),
      getMatricula: jest.fn().mockReturnValue("ABC123"),
    } as unknown as Vehiculo;

    jest.clearAllMocks();
  });

  it("reservar cambia el estado del vehículo a EstadoEnAlquiler", () => {
    estado.reservar(vehiculoMock);

    const mockSetEstado = vehiculoMock.setEstado as unknown as jest.Mock;

    expect(mockSetEstado).toHaveBeenCalledTimes(1);
  });

  it("finalizarAlquiler lanza ErrorEstadoIncorrecto", () => {
    expect(() => estado.finalizarAlquiler(vehiculoMock)).toThrow();
  });

  it("finalizarMantenimiento lanza ErrorEstadoIncorrecto", () => {
    expect(() => estado.finalizarMantenimiento(vehiculoMock)).toThrow();
  });

  it("estaEnAlquiler devuelve false", () => {
    expect(estado.estaEnAlquiler()).toBe(false);
  });
});
