import { Vehiculo } from '../src/AlquilerDeAutos/vehiculo';
import GestionDeVehiculos from '../src/AlquilerDeAutos/gestion-de-vehiculos';

const crearVehiculoSimulado = (matricula: string) =>
  ({ getMatricula: () => matricula } as any);

describe('Tests para la clase GestionDeVehiculos', () => {
  let gestorDeVehiculos: GestionDeVehiculos;

  beforeEach(() => {
    gestorDeVehiculos = new GestionDeVehiculos();
  });

  it('Debe agregar un vehiculo nuevo sin error', () => {
    const vehiculo = crearVehiculoSimulado('ABC123');
    expect(() => gestorDeVehiculos.agregarVehiculo(vehiculo)).not.toThrow();
  });

  it('Debe rechazar un vehículo con matricula duplicada exacta', () => {
    const vehiculo = crearVehiculoSimulado('ABC123');
    gestorDeVehiculos.agregarVehiculo(vehiculo);
    expect(() => gestorDeVehiculos.agregarVehiculo(vehiculo)).toThrow(/ya existe/);
  });

  it('Debe rechazar duplicados sin distinguir mayusculas/minusculas', () => {
    const vehiculo = crearVehiculoSimulado('ABC123');
    const vehiculoConMismaMatricula = crearVehiculoSimulado('abc123');
    gestorDeVehiculos.agregarVehiculo(vehiculo);
    expect(() => gestorDeVehiculos.agregarVehiculo(vehiculoConMismaMatricula)).toThrow(/ya existe/);
  });

  it('Debe permitir agregar multiples matriculas distintas', () => {
    const primerVehiculo = crearVehiculoSimulado('ABC123');
    const segundoVehiculo = crearVehiculoSimulado('XYZ789');
    gestorDeVehiculos.agregarVehiculo(primerVehiculo);
    expect(() => gestorDeVehiculos.agregarVehiculo(segundoVehiculo)).not.toThrow();
  });

  it('Debe tener un metodo llamado agregarVehiculo', () => {
    expect(typeof gestorDeVehiculos.agregarVehiculo).toBe('function');
  });
});