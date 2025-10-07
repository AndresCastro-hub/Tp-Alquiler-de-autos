import Compacto from '../AlquilerDeAutos/models/Compacto';
import { EstadoVehiculo } from '../AlquilerDeAutos/enums/EstadoVehiculo';
import RegistroDia from '../AlquilerDeAutos/models/RegistroDia';

const d = (km: number) => ({ getKmRecorrido: () => km } as any);

describe('Compacto', () => {
  test('calcularTarifa con array vacío devuelve la tarifa base', () => {
    const registroDia = new RegistroDia(new Date(), 0);
    const totalDelRecorrido = [];
    totalDelRecorrido.push(registroDia);
    const c = new Compacto('ABC123', EstadoVehiculo.Disponible, 0,);
    expect(c.calcularTarifa(totalDelRecorrido)).toBe(30);
  });

  test('1 día con 90 km (sin extra) cobra sólo la tarifa base (30)', () => {
    const c = new Compacto('ABC123', EstadoVehiculo.Disponible, 0);
    const total = c.calcularTarifa([d(90)]);
    expect(total).toBe(30);
  });
});
