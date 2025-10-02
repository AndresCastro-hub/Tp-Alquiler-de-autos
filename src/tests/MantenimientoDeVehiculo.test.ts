import MantenimientoDeVehiculo from "../AlquilerDeAutos/mantenimientoDeVehiculo";

describe("MantenimientoDeVehiculo", () => {
  test("Instancia válida", () => {
    const m = new MantenimientoDeVehiculo("AA000AA", new Date(2025, 8, 1), 1000);
    expect(m.getMatricula()).toBe("AA000AA");
    expect(m.getCosto()).toBe(1000);
  });

  test("Setter de matrícula asigna correctamente", () => {
    const m = new MantenimientoDeVehiculo("AA000AA", new Date(2025, 8, 1), 1000);
    m.setMatricula("AB123CD");
    expect(m.getMatricula()).toBe("AB123CD");
  });

  test("Costo negativo => error", () => {
    expect(() => new MantenimientoDeVehiculo("AA000AA", new Date(2025, 8, 1), -1)).toThrow();
  });

  test("Matrícula vacía => error", () => {
    expect(() => new MantenimientoDeVehiculo("", new Date(2025, 8, 1), 100)).toThrow();
  });
});
