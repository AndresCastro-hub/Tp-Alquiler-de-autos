import GestorDeMantenimiento from "../AlquilerDeAutos/services/GestionDeMantenimiento";
import { Vehiculo } from "../AlquilerDeAutos/models/Vehiculo";
import { EstadoVehiculo } from "../AlquilerDeAutos/enums/EstadoVehiculo";

describe("GestorDeMantenimiento", () => {
  let gestor: GestorDeMantenimiento;
  let mockVehiculo1: jest.Mocked<Vehiculo>;
  let mockVehiculo2: jest.Mocked<Vehiculo>;

  beforeEach(() => {
    gestor = new GestorDeMantenimiento();

    mockVehiculo1 = {
      getMatricula: jest.fn().mockReturnValue("ABC123"),
      setEstado: jest.fn(),
      necesitaMantenimiento: jest.fn(),
      incrementarAlquiler: jest.fn(),
      resetearValoresMantenimiento: jest.fn()
    } as unknown as jest.Mocked<Vehiculo>;

    mockVehiculo2 = {
      getMatricula: jest.fn().mockReturnValue("XYZ789"),
      setEstado: jest.fn(),
      necesitaMantenimiento: jest.fn(),
      incrementarAlquiler: jest.fn(),
      resetearValoresMantenimiento: jest.fn()
    } as unknown as jest.Mocked<Vehiculo>;
  });

  it("debería registrar un mantenimiento correctamente", () => {
    gestor.registrarMantenimiento(mockVehiculo1);

    expect(gestor["vehiculosEnMantenimiento"].length).toBe(1);
    expect(gestor["vehiculosEnMantenimiento"][0].getVehiculo()).toBe(mockVehiculo1);
  });

  it("debería registrar múltiples mantenimientos", () => {
    gestor.registrarMantenimiento(mockVehiculo1);
    gestor.registrarMantenimiento(mockVehiculo2);

    const registros = gestor["vehiculosEnMantenimiento"];

    expect(registros.length).toBe(2);
    expect(registros[0].getVehiculo().getMatricula()).toBe("ABC123");
    expect(registros[1].getVehiculo().getMatricula()).toBe("XYZ789");
  });

  it("debería procesar mantenimiento cuando el vehículo lo necesita", () => {
    mockVehiculo1.necesitaMantenimiento.mockReturnValue(true);

    gestor.procesarMantenimiento(mockVehiculo1);

    expect(mockVehiculo1.incrementarAlquiler).toHaveBeenCalled();
    expect(mockVehiculo1.setEstado).toHaveBeenCalledWith(EstadoVehiculo.EnMantenimiento);
    expect(mockVehiculo1.resetearValoresMantenimiento).toHaveBeenCalled();
    expect(gestor["vehiculosEnMantenimiento"].length).toBe(1);
  });

  it("no debería registrar mantenimiento cuando el vehículo no lo necesita", () => {
    mockVehiculo1.necesitaMantenimiento.mockReturnValue(false);

    gestor.procesarMantenimiento(mockVehiculo1);

    expect(mockVehiculo1.incrementarAlquiler).toHaveBeenCalled();
    expect(mockVehiculo1.setEstado).not.toHaveBeenCalled();
    expect(mockVehiculo1.resetearValoresMantenimiento).not.toHaveBeenCalled();
    expect(gestor["vehiculosEnMantenimiento"].length).toBe(0);
  });
});