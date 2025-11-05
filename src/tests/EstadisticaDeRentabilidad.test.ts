import EstadisticaDeRentabilidad from "../AlquilerDeAutos/services/EstadisticaDeRentabilidad";
import Reserva from "../AlquilerDeAutos/models/Reserva";
import MantenimientoDeVehiculo from "../AlquilerDeAutos/services/MantenimientoDeVehiculo";
import { Vehiculo } from "../AlquilerDeAutos/models/Vehiculo";
import { COSTO_MANTENIMIENTO } from "../AlquilerDeAutos/constants/constants";

describe("Tests para la clase EstadisticaDeRentabilidad", () => {
  let estadistica: EstadisticaDeRentabilidad;
  let vehiculoA: Vehiculo;
  let vehiculoB: Vehiculo;

  beforeEach(() => {
    estadistica = new EstadisticaDeRentabilidad();
    vehiculoA = { getMatricula: () => "AAA111" } as unknown as Vehiculo;
    vehiculoB = { getMatricula: () => "BBB222" } as unknown as Vehiculo;
  });

  it("Deberia calcular los ingresos por vehículo correctamente", () => {
    const reservas = [
      { getVehiculo: () => vehiculoA, calcularCostoTotal: () => 1000 },
      { getVehiculo: () => vehiculoA, calcularCostoTotal: () => 500 },
      { getVehiculo: () => vehiculoB, calcularCostoTotal: () => 200 },
    ] as unknown as Reserva[];

    const resultado = (estadistica as any).obtenerIngresosPorVehiculo(reservas);

    expect(resultado.get("AAA111")).toBe(1500);
    expect(resultado.get("BBB222")).toBe(200);
  });

  it("Deberia calcular el costo de mantenimiento correctamente (constante 200)", () => {
    const mantenimientos = [
      Object.assign(new MantenimientoDeVehiculo(), { matricula: "AAA111" }),
      Object.assign(new MantenimientoDeVehiculo(), { matricula: "AAA111" }),
      Object.assign(new MantenimientoDeVehiculo(), { matricula: "BBB222" }),
    ];

    const resultado = (estadistica as any).obtenerCostoMantenimiento(mantenimientos);

    expect(resultado.get("AAA111")).toBe(2 * COSTO_MANTENIMIENTO);
    expect(resultado.get("BBB222")).toBe(1 * COSTO_MANTENIMIENTO);
  });

  it("Deberia devolver el vehículo con mayor rentabilidad", () => {
    const reservas = [
      { getVehiculo: () => vehiculoA, calcularCostoTotal: () => 1000 },
      { getVehiculo: () => vehiculoB, calcularCostoTotal: () => 200 },
    ] as unknown as Reserva[];

    const mantenimientos = [
      Object.assign(new MantenimientoDeVehiculo(), { matricula: "AAA111" }),
      Object.assign(new MantenimientoDeVehiculo(), { matricula: "BBB222" }),
    ];

    const resultado = estadistica.mayorRentabilidad(reservas, mantenimientos);

    expect(resultado?.getMatricula()).toBe("AAA111");
  });

  it("Deberia devolver el vehículo con menor rentabilidad", () => {
    const reservas = [
      { getVehiculo: () => vehiculoA, calcularCostoTotal: () => 1000 },
      { getVehiculo: () => vehiculoB, calcularCostoTotal: () => 200 },
    ] as unknown as Reserva[];

    const mantenimientos = [
      Object.assign(new MantenimientoDeVehiculo(), { matricula: "AAA111" }),
      Object.assign(new MantenimientoDeVehiculo(), { matricula: "BBB222" }),
    ];

    const resultado = estadistica.menorRentabilidad(reservas, mantenimientos);

    expect(resultado?.getMatricula()).toBe("BBB222");
  });

  it("Deberia tener un método llamado mayorRentabilidad", () => {
    expect(typeof estadistica.mayorRentabilidad).toBe("function");
  });

  it("Deberia tener un método llamado menorRentabilidad", () => {
    expect(typeof estadistica.menorRentabilidad).toBe("function");
  });

  it("Deberia tener un método privado llamado obtenerIngresosPorVehiculo", () => {
    expect(typeof (estadistica as any).obtenerIngresosPorVehiculo).toBe("function");
  });

  it("Deberia tener un método privado llamado obtenerCostoMantenimiento", () => {
    expect(typeof (estadistica as any).obtenerCostoMantenimiento).toBe("function");
  });
  
});
