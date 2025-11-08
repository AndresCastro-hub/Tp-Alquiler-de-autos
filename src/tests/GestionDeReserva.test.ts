import { EstadoVehiculo } from "../AlquilerDeAutos/enums/EstadoVehiculo";
import ErrorVehiculoNoDisponible from "../AlquilerDeAutos/errors/excepcionVehiculoNoDisponible";
import Reserva from "../AlquilerDeAutos/models/Reserva";
import { Vehiculo } from "../AlquilerDeAutos/models/Vehiculo";
import GestionDeReservas from "../AlquilerDeAutos/services/GestionDeReserva";

let estadoVehiculo1 = EstadoVehiculo.Disponible;
let contadorKmVehiculo1 = 0;
const vehiculoMock1: Vehiculo = {
  getMatricula: jest.fn().mockReturnValue("ABC123"),
  getEstado: jest.fn().mockImplementation(()=> {return estadoVehiculo1} ),
  setEstado:jest.fn().mockImplementation((estado: EstadoVehiculo)=>{
    estadoVehiculo1 = estado;
  }),
  getContadorKm: jest.fn().mockImplementation(()=> {return contadorKmVehiculo1} ),
  setContadorKm:jest.fn().mockImplementation((km: number)=>{
    contadorKmVehiculo1 = km;
  })
} as unknown as Vehiculo;

const reservaMock1: Reserva = {
  getVehiculo: jest.fn().mockReturnValue(vehiculoMock1),
  getFechaInicioReserva: jest.fn().mockReturnValue(new Date("2025-05-20")),
  getFechaFinReserva: jest.fn().mockReturnValue(new Date("2025-08-20")),
  getGestionDelKilometraje: jest.fn().mockReturnValue({
    getTotalKmRecorridos: jest.fn().mockReturnValue(150)
  }),
  calcularCostoTotal: jest.fn().mockReturnValue(200)
}as unknown as Reserva;

const reservaMock2: Reserva = {
  getVehiculo: jest.fn().mockReturnValue({
    getMatricula: jest.fn().mockReturnValue("DEF456"),
    getEstado: jest.fn().mockReturnValue(EstadoVehiculo.Disponible),
    setEstado:jest.fn().mockImplementation((estado: EstadoVehiculo)=>{
    }),
  }),
  getFechaInicioReserva: jest.fn().mockReturnValue(new Date("2025-01-20")),
  getFechaFinReserva: jest.fn().mockReturnValue(new Date("2025-03-20")),
}as unknown as Reserva;

const reservaMock3: Reserva = {
  getVehiculo: jest.fn().mockReturnValue({
    getMatricula: jest.fn().mockReturnValue("GHI789"),
    getEstado: jest.fn().mockReturnValue(EstadoVehiculo.EnAlquiler),
    setEstado:jest.fn().mockImplementation((estado: EstadoVehiculo)=>{
    }),
  }),
  getFechaInicioReserva: jest.fn().mockReturnValue(new Date("2025-09-20")),
  getFechaFinReserva: jest.fn().mockReturnValue(new Date("2025-10-20")),
}as unknown as Reserva;

describe("GestionDeReservas", () => {
  let gestion: GestionDeReservas;

  beforeEach(() => {
    gestion = new GestionDeReservas();
    vehiculoMock1.setEstado(EstadoVehiculo.Disponible);
    vehiculoMock1.setContadorKm(0);

    jest.spyOn(gestion as any, 'actualizarKilometrajeRecorrido');
    jest.spyOn(gestion as any, 'marcarVehiculoNecesitaLimpieza');
    jest.spyOn(gestion as any, 'eliminarReserva');
  });

  it("debería iniciar sin reservas", () => {
    expect((gestion as any).reservas).toHaveLength(0);
  });

  it("Test de método chequearDisponibilidad().", ()=>{
    const vehiculoMock: Vehiculo = {
      getMatricula: jest.fn().mockReturnValue("ABC123"),
      getEstado: jest.fn().mockReturnValue(EstadoVehiculo.Disponible)
    }as unknown as Vehiculo;

    expect((gestion as any).chequearDisponibilidad(reservaMock1.getVehiculo(), new Date("2023-05-20"), new Date("2024-05-20"))).toEqual(true);
    expect((gestion as any).chequearDisponibilidad(reservaMock3.getVehiculo(), new Date("2023-05-20"), new Date("2024-05-20"))).toEqual(false);

    (gestion as any).reservas.push(reservaMock1);
    expect((gestion as any).chequearDisponibilidad(vehiculoMock, new Date("2025-04-20"), new Date("2025-05-30"))).toEqual(false);
    expect((gestion as any).chequearDisponibilidad(vehiculoMock, new Date("2025-06-20"), new Date("2025-09-30"))).toEqual(false);
  })

  it("Test del método agregarReserva().", ()=>{
    gestion.agregarReserva(reservaMock1);
    expect(gestion["reservas"]).toHaveLength(1);
    expect(gestion["reservas"][0]).toEqual(reservaMock1);
    gestion.agregarReserva(reservaMock2);
    expect(gestion["reservas"]).toHaveLength(2);
    expect(gestion["reservas"][0]).toEqual(reservaMock1);
    expect(gestion["reservas"][1]).toEqual(reservaMock2);
    try{
      gestion.agregarReserva(reservaMock3);
    }catch(error){
      expect(error).toBeInstanceOf(ErrorVehiculoNoDisponible);
      expect(error.message).toEqual(`El vehículo ${reservaMock3.getVehiculo().getMatricula()} no está disponible en esas fechas.`);
    }
  })

  it("Test del método eliminarReserva().", ()=>{
    (gestion as any).reservas.push(reservaMock1);
    expect(gestion["reservas"]).toHaveLength(1);
    expect(gestion["reservas"][0]).toEqual(reservaMock1);
    (gestion as any).eliminarReserva(reservaMock1);
    expect(gestion["reservas"]).toHaveLength(0);
  });

  it("Test del método marcarVehiculoEnAlquiler().", ()=>{
    expect(vehiculoMock1.getEstado()).toEqual(EstadoVehiculo.Disponible);
    (gestion as any).marcarVehiculoEnAlquiler(vehiculoMock1);
    expect(vehiculoMock1.getEstado()).toEqual(EstadoVehiculo.EnAlquiler);
  });

  it("Test del método marcarVehiculoNecesitaLimpieza().", ()=>{
    expect(vehiculoMock1.getEstado()).toEqual(EstadoVehiculo.Disponible);
    (gestion as any).marcarVehiculoNecesitaLimpieza(vehiculoMock1);
    expect(vehiculoMock1.getEstado()).toEqual(EstadoVehiculo.NecesitaLimpieza);
  });

  it("Test del método actualizarKilometrajeRecorrido().", ()=>{
    expect(vehiculoMock1.getContadorKm()).toEqual(0);
    (gestion as any).actualizarKilometrajeRecorrido(vehiculoMock1, 100);
    expect(vehiculoMock1.getContadorKm()).toEqual(100);
    (gestion as any).actualizarKilometrajeRecorrido(vehiculoMock1, 50);
    expect(vehiculoMock1.getContadorKm()).toEqual(150);
  });
  
  it("Test del método cerrarReserva().", ()=>{
    (gestion as any).reservas.push(reservaMock1);
    const costoTotal = gestion.cerrarReserva(reservaMock1);
    expect(costoTotal).toEqual(200);

    expect((gestion as any).actualizarKilometrajeRecorrido).toHaveBeenCalledWith(
        vehiculoMock1, 
        150
    );

    expect((gestion as any).marcarVehiculoNecesitaLimpieza).toHaveBeenCalledWith(vehiculoMock1);
    
    expect((gestion as any).eliminarReserva).toHaveBeenCalledWith(reservaMock1);

    expect(reservaMock1.calcularCostoTotal).toHaveBeenLastCalledWith();

    expect(reservaMock1.calcularCostoTotal).toHaveBeenCalledTimes(1);
  });
  
});
