import { EstadoVehiculo } from "../AlquilerDeAutos/enums/EstadoVehiculo";
import Cliente from "../AlquilerDeAutos/models/Cliente";
import RegistroDia from "../AlquilerDeAutos/models/RegistroDia";
import Reserva from "../AlquilerDeAutos/models/Reserva";
import { Vehiculo } from "../AlquilerDeAutos/models/Vehiculo";
import GestionDeReservas from "../AlquilerDeAutos/services/GestionDeReserva";
import GestorKilometraje from "../AlquilerDeAutos/services/GestorKilometraje";

class VehiculoMock extends Vehiculo {
  constructor(matricula: string, estado: EstadoVehiculo, km: number) {
    super(matricula, estado, km, 100, 20);
  }

  calcularTarifa(totalDelRecorrido: RegistroDia[]): number {
    // ejemplo simple: tarifa base por cada registro + km extra
    const kmTotales = totalDelRecorrido.reduce((sum, r) => sum + r.getKmRecorrido(), 0);
    return this.getTarifaBase() + kmTotales * this.getTarifaExtra();
  }
}

describe("GestionDeReservas", () => {
  let gestion: GestionDeReservas;
  let cliente: Cliente;
  let vehiculo: VehiculoMock;
  let gestorKm: GestorKilometraje;
  let reserva: Reserva;

  beforeEach(() => {
    gestion = new GestionDeReservas();
    cliente = new Cliente("Juan", "Perez", "juan@example.com");
    vehiculo = new VehiculoMock("ABC123", EstadoVehiculo.Disponible, 0);
    gestorKm = new GestorKilometraje();
    reserva = new Reserva(
      cliente,
      vehiculo,
      gestorKm,
      new Date("2025-09-18"),
      new Date("2025-09-20")
    );
  });

  it("debería iniciar sin reservas", () => {
    expect((gestion as any).reservas).toHaveLength(0);
  });

  it("debería agregar una reserva si el vehículo está disponible", () => {
    gestion.agregarReserva(reserva);

    const reservas = (gestion as any).reservas;
    expect(reservas).toHaveLength(1);
    expect(reservas[0]).toBe(reserva);
    expect(vehiculo.getEstado()).toBe(EstadoVehiculo.EnAlquiler);
  });

  it("debería lanzar error si el vehículo no está disponible en esas fechas", () => {
    gestion.agregarReserva(reserva);

    const reservaSuperpuesta = new Reserva(
      cliente,
      vehiculo,
      new GestorKilometraje(),
      new Date("2025-09-19"),
      new Date("2025-09-22")
    );

    expect(() => gestion.agregarReserva(reservaSuperpuesta))
      .toThrowError(`El vehículo ${vehiculo.getMatricula()} no está disponible en esas fechas.`);
  });

  it("debería cerrar una reserva, actualizar km y cambiar estado a 'NecesitaLimpieza'", () => {
    gestorKm.setKmRecorridoXDia(new Date("2025-09-18"), 50);
    gestorKm.setKmRecorridoXDia(new Date("2025-09-19"), 30);

    gestion.agregarReserva(reserva);
    const costoTotal = gestion.cerrarReserva(reserva);

    expect(vehiculo.getContadorKm()).toBe(80); // km inicial 0 + 80 recorridos
    expect(vehiculo.getEstado()).toBe(EstadoVehiculo.NecesitaLimpieza);
    expect(costoTotal).toBeGreaterThan(0);
  });

  it("debería permitir múltiples reservas para distintos vehículos", () => {
    const otroVehiculo = new VehiculoMock("XYZ789", EstadoVehiculo.Disponible, 100);
    const otraReserva = new Reserva(
      cliente,
      otroVehiculo,
      new GestorKilometraje(),
      new Date("2025-09-25"),
      new Date("2025-09-28")
    );

    gestion.agregarReserva(reserva);
    gestion.agregarReserva(otraReserva);

    expect((gestion as any).reservas).toHaveLength(2);
  });
});
