import ErrorVehiculoRepetido from "../errors/excepcionVehiculoRepetido";
import { Vehiculo } from "../models/Vehiculo";

/**
 * Gestiona el registro y administración de vehículos en la flota.
 * 
 * Permite agregar nuevos vehículos al sistema y verifica que no
 * haya duplicados (vehículos con la misma matrícula).
 */

export default class GestionDeVehiculos {
  private vehiculos: Vehiculo[] = [];

  /**
   * Agrega un nuevo vehículo a la flota.
   * 
   * Verifica que no exista otro vehículo con la misma matrícula
   * (sin importar mayúsculas/minúsculas).
   * 
   * @param {Vehiculo} vehiculo - Vehículo a agregar
   * @throws {ErrorVehiculoRepetido} Si ya existe un vehículo con esa matrícula
   * 
   * @example
   * const compacto = new Compacto("ABC-123", EstadoVehiculo.Disponible, 0);
   * gestionDeVehiculos.agregarVehiculo(compacto);
   */
  
  public agregarVehiculo(vehiculo: Vehiculo): void {
    const esDuplicado = this.vehiculos.some(
      v => v.getMatricula().toUpperCase() === vehiculo.getMatricula().toUpperCase()
    );

    if (esDuplicado) {
      throw new ErrorVehiculoRepetido(`El vehiculo con la matricula ${vehiculo.getMatricula()} ya existe en el sistema `);
    }

    this.vehiculos.push(vehiculo);
  }
}
