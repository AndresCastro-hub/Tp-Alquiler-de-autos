import { Vehiculo }  from './vehiculo';

export class GestionDeVehiculos {
  private vehiculos: Vehiculo[] = [];

  public agregarVehiculo(vehiculo: Vehiculo): void {
    const esDuplicado = this.vehiculos.some(
      v => v.getMatricula().toUpperCase() === vehiculo.getMatricula().toUpperCase()
    );

    if (esDuplicado) {
      throw new Error(`El vehículo con la matrícula ${vehiculo.getMatricula()} ya existe en el sistema.`);
    }

    this.vehiculos.push(vehiculo);
  }
}
