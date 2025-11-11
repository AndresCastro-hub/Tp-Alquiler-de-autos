import EstadisticaDeRentabilidad from "../AlquilerDeAutos/services/EstadisticaDeRentabilidad";
import Reserva from "../AlquilerDeAutos/models/Reserva";
import MantenimientoDeVehiculo from "../AlquilerDeAutos/services/MantenimientoDeVehiculo";
import { Vehiculo } from "../AlquilerDeAutos/models/Vehiculo";
import { COSTO_MANTENIMIENTO } from "../AlquilerDeAutos/constants/constants";

describe("EstadisticaDeRentabilidad", () => {
  let estadistica: EstadisticaDeRentabilidad;
  let vehiculoMockA: jest.Mocked<Vehiculo>;
  let vehiculoMockB: jest.Mocked<Vehiculo>;

  beforeEach(() => {
    estadistica = new EstadisticaDeRentabilidad();
    
    vehiculoMockA = {
      getMatricula: jest.fn().mockReturnValue("AAA111"),
    } as unknown as jest.Mocked<Vehiculo>;

    vehiculoMockB = {
      getMatricula: jest.fn().mockReturnValue("BBB222"),
    } as unknown as jest.Mocked<Vehiculo>;
  });

  it("Calcular los ingresos por vehículo correctamente", () => {
    const reservasMock = [
      {
        getVehiculo: jest.fn().mockReturnValue(vehiculoMockA),
        calcularCostoTotal: jest.fn().mockReturnValue(1000)
      },
      {
        getVehiculo: jest.fn().mockReturnValue(vehiculoMockA),
        calcularCostoTotal: jest.fn().mockReturnValue(500)
      },
      {
        getVehiculo: jest.fn().mockReturnValue(vehiculoMockB),
        calcularCostoTotal: jest.fn().mockReturnValue(200)
      }
    ] as unknown as Reserva[];

    const resultado = (estadistica as any).obtenerIngresosPorVehiculo(reservasMock);

    expect(resultado.get("AAA111")).toBe(1500);
    expect(resultado.get("BBB222")).toBe(200);
  });

  it("Calcular el costo de mantenimiento correctamente", () => {
    const mantenimientosMock = [
      {
        getVehiculo: jest.fn().mockReturnValue(vehiculoMockA),
        getCosto: jest.fn().mockReturnValue(COSTO_MANTENIMIENTO)
      },
      {
        getVehiculo: jest.fn().mockReturnValue(vehiculoMockA),
        getCosto: jest.fn().mockReturnValue(COSTO_MANTENIMIENTO)
      },
      {
        getVehiculo: jest.fn().mockReturnValue(vehiculoMockB),
        getCosto: jest.fn().mockReturnValue(COSTO_MANTENIMIENTO)
      }
    ] as unknown as MantenimientoDeVehiculo[];

    const resultado = (estadistica as any).obtenerCostoMantenimiento(mantenimientosMock);

    expect(resultado.get("AAA111")).toBe(COSTO_MANTENIMIENTO * 2);
    expect(resultado.get("BBB222")).toBe(COSTO_MANTENIMIENTO);
  });

  it("Identificar el vehículo con mayor rentabilidad", () => {
    const reservasMock = [
      {
        getVehiculo: jest.fn().mockReturnValue(vehiculoMockA),
        calcularCostoTotal: jest.fn().mockReturnValue(1000)
      },
      {
        getVehiculo: jest.fn().mockReturnValue(vehiculoMockB),
        calcularCostoTotal: jest.fn().mockReturnValue(200)
      }
    ] as unknown as Reserva[];

    const mantenimientosMock = [
      {
        getVehiculo: jest.fn().mockReturnValue(vehiculoMockA),
        getCosto: jest.fn().mockReturnValue(COSTO_MANTENIMIENTO)
      },
      {
        getVehiculo: jest.fn().mockReturnValue(vehiculoMockB),
        getCosto: jest.fn().mockReturnValue(COSTO_MANTENIMIENTO)
      }
    ] as unknown as MantenimientoDeVehiculo[];

    const resultado = estadistica.mayorRentabilidad(reservasMock, mantenimientosMock);

    expect(resultado).toBe(vehiculoMockA);
  });

  it("Identificar el vehículo con menor rentabilidad", () => {
    const reservasMock = [
      {
        getVehiculo: jest.fn().mockReturnValue(vehiculoMockA),
        calcularCostoTotal: jest.fn().mockReturnValue(1000)
      },
      {
        getVehiculo: jest.fn().mockReturnValue(vehiculoMockB),
        calcularCostoTotal: jest.fn().mockReturnValue(200)
      }
    ] as unknown as Reserva[];

    const mantenimientosMock = [
      {
        getVehiculo: jest.fn().mockReturnValue(vehiculoMockA),
        getCosto: jest.fn().mockReturnValue(COSTO_MANTENIMIENTO)
      },
      {
        getVehiculo: jest.fn().mockReturnValue(vehiculoMockB),
        getCosto: jest.fn().mockReturnValue(COSTO_MANTENIMIENTO)
      }
    ] as unknown as MantenimientoDeVehiculo[];

    const resultado = estadistica.menorRentabilidad(reservasMock, mantenimientosMock);

    expect(resultado).toBe(vehiculoMockB);
  });

  it("Retornar null cuando no hay reservas para calcular mayor rentabilidad", () => {
    const resultado = estadistica.mayorRentabilidad([], []);
    expect(resultado).toBeNull();
  });

  it("Retornar null cuando no hay reservas para calcular menor rentabilidad", () => {
    const resultado = estadistica.menorRentabilidad([], []);
    expect(resultado).toBeNull();
  });
});