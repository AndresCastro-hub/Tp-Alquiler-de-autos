import { Vehiculo }  from './vehiculo';
import { GestionDeVehiculos } from '../src/AlquilerDeAutos/gestion-de-vehiculos';


jest.mock('./vehiculo');

describe('GestionDeVehiculos', () => {
  let instance;

  beforeEach(() => {
    instance = new GestionDeVehiculos();
  });

  it('instance should be an instanceof GestionDeVehiculos', () => {
    expect(instance instanceof GestionDeVehiculos).toBeTruthy();
  });

  it('should have a method agregarVehiculo()', () => {
    // instance.agregarVehiculo(vehiculo);
    expect(false).toBeTruthy();
  });
});