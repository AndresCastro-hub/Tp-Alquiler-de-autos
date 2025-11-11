import EstadisticaDeRentabilidad from "../AlquilerDeAutos/services/EstadisticaDeRentabilidad"
import EstadisticasDeAlquiler from "../AlquilerDeAutos/services/EstadisticasDeAlquiler";
import EstadisticasDeOcupacion from "../AlquilerDeAutos/services/EstadisticasDeOcupacion";
import { Vehiculo } from "../AlquilerDeAutos/models/Vehiculo";
import Reserva from "../AlquilerDeAutos/models/Reserva";
import MantenimientoDeVehiculo from "../AlquilerDeAutos/services/MantenimientoDeVehiculo";
import GestorDeEstadistica from "../AlquilerDeAutos/services/GestorDeEstadistica"

const mockAlquiler = {
  vehiculoMasAlquilado: jest.fn(),
  vehiculoMinimoAlquilado: jest.fn(),
};

const mockRentabilidad = {
  mayorRentabilidad: jest.fn(),
  menorRentabilidad: jest.fn(),
};

const mockOcupacion = {
  porcentajeDeOcupacion: jest.fn(),
};

describe("GestorEstadisticas", () => {
  let gestor: GestorDeEstadistica;

  beforeEach(() => {
    
    gestor = new GestorDeEstadistica();

    (gestor as any).alquiler = mockAlquiler;
    (gestor as any).rentabilidad = mockRentabilidad;
    (gestor as any).ocupacion = mockOcupacion;


  });

  it("debería delegar en vehiculoMasAlquilado", () => {
    const reservas: Reserva[] = [] as any;
    const fechaInicio = new Date();
    const fechaFin = new Date();

    mockAlquiler.vehiculoMasAlquilado.mockReturnValue("ABC123");

    const result = gestor.vehiculoMasAlquilado(reservas, fechaInicio, fechaFin);

    expect(mockAlquiler.vehiculoMasAlquilado).toHaveBeenCalledWith(reservas, fechaInicio, fechaFin);
    expect(result).toBe("ABC123");
  });

  it("debería delegar en vehiculoMenosAlquilado", () => {
    const reservas: Reserva[] = [] as any;
    const fechaInicio = new Date();
    const fechaFin = new Date();

    mockAlquiler.vehiculoMinimoAlquilado.mockReturnValue("XYZ789");

    const result = gestor.vehiculoMenosAlquilado(reservas, fechaInicio, fechaFin);

    expect(mockAlquiler.vehiculoMinimoAlquilado).toHaveBeenCalledWith(reservas, fechaInicio, fechaFin);
    expect(result).toBe("XYZ789");
  });

  it("debería delegar en mayorRentabilidad", () => {
    const reservas: Reserva[] = [] as any;
    const mantenimientos: MantenimientoDeVehiculo[] = [] as any;
    const vehiculoMock = { getMatricula: () => "AAA111" } as unknown as Vehiculo;

    mockRentabilidad.mayorRentabilidad.mockReturnValue(vehiculoMock);

    const result = gestor.mayorRentabilidad(reservas, mantenimientos);

    expect(mockRentabilidad.mayorRentabilidad).toHaveBeenCalledWith(reservas, mantenimientos);
    expect(result).toBe(vehiculoMock);
  });

  it("debería delegar en menorRentabilidad", () => {
    const reservas: Reserva[] = [] as any;
    const mantenimientos: MantenimientoDeVehiculo[] = [] as any;
    const vehiculoMock = { getMatricula: () => "BBB222" } as unknown as Vehiculo;

    mockRentabilidad.menorRentabilidad.mockReturnValue(vehiculoMock);

    const result = gestor.menorRentabilidad(reservas, mantenimientos);

    expect(mockRentabilidad.menorRentabilidad).toHaveBeenCalledWith(reservas, mantenimientos);
    expect(result).toBe(vehiculoMock);
  });

  it("debería delegar en ocupacionFlota", () => {
    const vehiculos: Vehiculo[] = [] as any;

    mockOcupacion.porcentajeDeOcupacion.mockReturnValue(75);

    const result = gestor.ocupacionFlota(vehiculos);

    expect(mockOcupacion.porcentajeDeOcupacion).toHaveBeenCalledWith(vehiculos);
    expect(result).toBe(75);
  });
});