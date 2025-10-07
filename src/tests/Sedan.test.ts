import { EstadoVehiculo } from '../AlquilerDeAutos/enums/EstadoVehiculo';
import Sedan from '../AlquilerDeAutos/models/Sedan';
import RegistroDia from '../AlquilerDeAutos/models/RegistroDia';


describe('Sedan', () => {
  test('calcularTarifa con array vacío devuelve 0', () => {
    const s = new Sedan('ABC123', EstadoVehiculo.Disponible, 0);
    expect(s.calcularTarifa([])).toBe(0);
  });

  test('1 día con 0 km cobra sólo la tarifa base (50)', () => {
    const registroDia = new RegistroDia(new Date(), 0);
    const totalDelRecorrido = [];
    totalDelRecorrido.push(registroDia);
    const s = new Sedan('ABC123', EstadoVehiculo.Disponible, 0);
    const total = s.calcularTarifa(totalDelRecorrido);
    expect(total).toBe(50);
  });
});
