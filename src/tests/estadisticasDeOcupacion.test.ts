import IEstadoVehiculo from "../AlquilerDeAutos/models/EstadosVehiculo/IEstadoVehiculo";
import { Vehiculo } from "../AlquilerDeAutos/models/Vehiculo";
import EstadisticasDeOcupacion from "../AlquilerDeAutos/services/EstadisticasDeOcupacion";

const mockEstado = (estaEnAlquiler: boolean): IEstadoVehiculo => ({
    reservar: jest.fn(),
    finalizarAlquiler: jest.fn(),
    finalizarMantenimiento: jest.fn(),
    estaEnAlquiler: () => estaEnAlquiler
});

const crearVehiculoMock = (estado: IEstadoVehiculo) =>
({
    estaEnAlquiler: () => estado.estaEnAlquiler(),
} as unknown as Vehiculo);


describe('EstadisticasDeOcupacion', () => {

    let estadisticas: EstadisticasDeOcupacion;

    beforeEach(() => {
        estadisticas = new EstadisticasDeOcupacion();
    });

    test('Calcula correctamente el 50% de ocupación', () => {
        const vehiculos: Array<Vehiculo> = [
            crearVehiculoMock(mockEstado(true)),   // En alquiler
            crearVehiculoMock(mockEstado(false)),  // Disponible
            crearVehiculoMock(mockEstado(true)),   // En alquiler
            crearVehiculoMock(mockEstado(false)),  // Mantenimiento
        ];

        const porcentaje = estadisticas.porcentajeDeOcupacion(vehiculos);

        expect(porcentaje).toBe(50);
    });

    test('Calcula el 100% de ocupación', () => {
        const vehiculos: Array<Vehiculo> = [
            crearVehiculoMock(mockEstado(true)),
            crearVehiculoMock(mockEstado(true)),
            crearVehiculoMock(mockEstado(true)),
        ];

        const porcentaje = estadisticas.porcentajeDeOcupacion(vehiculos);

        expect(porcentaje).toBe(100);
    });

    test('Calcula 0% de ocupación', () => {
        const vehiculos: Array<Vehiculo> = [
            crearVehiculoMock(mockEstado(false)),
            crearVehiculoMock(mockEstado(false)),
        ];

        const porcentaje = estadisticas.porcentajeDeOcupacion(vehiculos);

        expect(porcentaje).toBe(0);
    });

    test('Lanza un error si la flota está vacía', () => {
        const vehiculos: Array<Vehiculo> = [];

        expect(() => {
            estadisticas.porcentajeDeOcupacion(vehiculos);
        }).toThrow("La flota esta vacia");
    });

});
