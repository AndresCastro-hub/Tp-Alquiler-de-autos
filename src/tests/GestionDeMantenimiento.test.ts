import GestorDeMantenimiento from "../AlquilerDeAutos/services/GestionDeMantenimiento";
import MantenimientoDeVehiculo from "../AlquilerDeAutos/services/MantenimientoDeVehiculo";


describe("GestorDeMantenimiento", () => {
  let gestor: GestorDeMantenimiento;

  beforeEach(() => {
    gestor = new GestorDeMantenimiento();
  });

  const mockMantenimiento = {
    getFechaMantenimiento: jest.fn().mockReturnValue(new Date("2025-10-14")),
    getCosto: jest.fn().mockReturnValue(500),
    getMatricula: jest.fn().mockReturnValue("ABC123"),
    setFechaMantenimiento: jest.fn(),
    setMatricula: jest.fn(),
  } as unknown as MantenimientoDeVehiculo;

  const mockMantenimiento2 = {
    getFechaMantenimiento: jest.fn().mockReturnValue(new Date("2025-10-20")),
    getCosto: jest.fn().mockReturnValue(800),
    getMatricula: jest.fn().mockReturnValue("XYZ789"),
    setFechaMantenimiento: jest.fn(),
    setMatricula: jest.fn(),
  } as unknown as MantenimientoDeVehiculo;

  it("debería registrar un mantenimiento correctamente", () => {
    gestor.registrarMantenimiento(mockMantenimiento);

    expect(gestor["vehiculosEnMantenimiento"].length).toBe(1);
    expect(gestor["vehiculosEnMantenimiento"][0]).toBe(mockMantenimiento);
  });

  it("debería registrar múltiples mantenimientos", () => {
    gestor.registrarMantenimiento(mockMantenimiento);
    gestor.registrarMantenimiento(mockMantenimiento2);

    const registros = gestor["vehiculosEnMantenimiento"];

    expect(registros.length).toBe(2);
    expect(registros[0].getMatricula()).toBe("ABC123");
    expect(registros[1].getMatricula()).toBe("XYZ789");
  });

  it("debería llamar correctamente a los métodos del mantenimiento mockeado", () => {
    gestor.registrarMantenimiento(mockMantenimiento);

    mockMantenimiento.getMatricula();
    mockMantenimiento.getFechaMantenimiento();
    mockMantenimiento.getCosto();

    expect(mockMantenimiento.getMatricula).toHaveBeenCalled();
    expect(mockMantenimiento.getFechaMantenimiento).toHaveBeenCalled();
    expect(mockMantenimiento.getCosto).toHaveBeenCalled();
  });
});
