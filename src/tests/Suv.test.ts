import Suv from '../AlquilerDeAutos/models/Suv';

const d = (km: number) => ({ getKmRecorrido: () => km } as any);

describe('Suv', () => {
  test('calcularTarifa con array vacío devuelve 0', () => {
    const suv = new Suv('ABC123' as any, 'Disponible' as any, 0 as any);
    expect(suv.calcularTarifa([])).toBe(0);
  });

  test('1 día con 0 km cobra base + seguro (80 + 15 = 95)', () => {
    const suv = new Suv('ABC123' as any, 'Disponible' as any, 0 as any);
    const total = suv.calcularTarifa([d(0)]);
    expect(total).toBe(95);
  });
});
