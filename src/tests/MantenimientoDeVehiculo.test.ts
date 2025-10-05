import MantenimientoDeVehiculo from '../AlquilerDeAutos/mantenimientoDeVehiculo';

describe('MantenimientoDeVehiculo', () => {
  test('set/get de matrícula', () => {
    const m = new MantenimientoDeVehiculo();
    m.setMatricula('ABC123');
    expect(m.getMatricula()).toBe('ABC123');
  });

  test('set/get de fecha de mantenimiento', () => {
    const m = new MantenimientoDeVehiculo();
    const fecha = new Date('2025-01-01');
    m.setFechaMantenimiento(fecha);
    expect(m.getFechaMantenimiento()).toEqual(fecha);
  });
});
