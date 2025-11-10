import MantenimientoDeVehiculo from "../AlquilerDeAutos/services/MantenimientoDeVehiculo";

describe('MantenimientoDeVehiculo', () => {
  test('set/get de matrícula mediante mock de Vehiculo', () => {
    const mockVehiculo = {
      getMatricula: jest.fn().mockReturnValue('ABC123'),
    };

    const m = new MantenimientoDeVehiculo();
    m.setVehiculo(mockVehiculo as any);

    expect(m.getVehiculo().getMatricula()).toBe('ABC123');
  });

  test('set/get de fecha de mantenimiento', () => {
    const m = new MantenimientoDeVehiculo();
    const fecha = new Date('2025-01-01');
    m.setFechaMantenimiento(fecha);
    expect(m.getFechaMantenimiento()).toEqual(fecha);
  });
});
