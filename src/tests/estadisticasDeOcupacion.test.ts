import { EstadoVehiculo } from "../AlquilerDeAutos/enums/EstadoVehiculo";
import { Vehiculo } from "../AlquilerDeAutos/models/Vehiculo";
import EstadisticasDeOcupacion from "../AlquilerDeAutos/services/EstadisticasDeOcupacion";

/**
 * EL vehiculo MOCK debo crearlo en mis test o ya esta creado?
 */

describe('EstadisticasDeOcupacion', () => {

    let estadisticas: EstadisticasDeOcupacion;

    beforeEach(() => {
        estadisticas = new EstadisticasDeOcupacion();
    });

    test('Calcula correctamente el 50% de ocupación', () => {
        const vehiculos: Array<Vehiculo> = [
            crearVehiculoMock(EstadoVehiculo.EnAlquiler),  // Ocupado
            crearVehiculoMock(EstadoVehiculo.Disponible),  // Libre
            crearVehiculoMock(EstadoVehiculo.EnAlquiler),  // Ocupado
            crearVehiculoMock(EstadoVehiculo.EnMantenimiento), // Mantenimiento (no cuenta)
        ];
        
        const porcentaje = estadisticas.porcentajeDeOcupacion(vehiculos);
        
        expect(porcentaje).toBe(50);
    });
    
    test('Calcula el 100% de ocupación cuando todos están EnAlquiler', () => {
        const vehiculos: Array<Vehiculo> = [
            crearVehiculoMock(EstadoVehiculo.EnAlquiler),
            crearVehiculoMock(EstadoVehiculo.EnAlquiler),
            crearVehiculoMock(EstadoVehiculo.EnAlquiler),
        ];
        
        const porcentaje = estadisticas.porcentajeDeOcupacion(vehiculos);
        
        expect(porcentaje).toBe(100);
    });

    test('Calcula 0% de ocupación cuando no hay vehículos EnAlquiler', () => {
        const vehiculos: Array<Vehiculo> = [
            crearVehiculoMock(EstadoVehiculo.Disponible),
            crearVehiculoMock(EstadoVehiculo.EnMantenimiento),
        ];
        
        const porcentaje = estadisticas.porcentajeDeOcupacion(vehiculos);
        
        expect(porcentaje).toBe(0);
    });

    test('Lanza un error si la flota esta vacia', () => {
        const vehiculos: Array<Vehiculo> = [];

        expect(() => {
            estadisticas.porcentajeDeOcupacion(vehiculos);
        }).toThrow("La flota esta vacia");
    });

});