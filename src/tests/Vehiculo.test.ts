import { EstadoVehiculo } from "../AlquilerDeAutos/enums/EstadoVehiculo";
import TemporadaBase from "../AlquilerDeAutos/models/TemporadaBase";
import { Vehiculo } from "../AlquilerDeAutos/models/Vehiculo";

class testVehiculo extends Vehiculo {
    calcularTarifa(): number {
        throw new Error("Method not implemented.");
    }
    constructor(matricula: string, estado: EstadoVehiculo, contadorKm: number) {
        super(matricula, estado, contadorKm);
    }
}

const temporadaMock: TemporadaBase = {
    getPorcentajeDeTemporada: jest.fn().mockImplementation((tarifaBase: number) => {
        return tarifaBase * 1.2;
    })
} as unknown as TemporadaBase;

describe("Test de la clase abstracta Vehiculo", () => {
    let vehiculo: Vehiculo;

    beforeEach(() => {
        vehiculo = new testVehiculo("ABC123", EstadoVehiculo.Disponible, 50);
        vehiculo.setTarifaBase(10000);
        vehiculo.setTarifaExtra(0.5);
        (vehiculo as any).mantenimiento = {
            necesitaMantenimiento: jest.fn().mockReturnValue(true),
            incrementarAlquiler: jest.fn(),
            resetearValores: jest.fn(),
        };

    });

    test("Verifica que el constructor de la clase Vehiculo instancie un objeto de tipo Vehiculo y asigne correctamente los valores de patente, estado, precioPorDia, duracionMinima, y costoSeguro", () => {
        expect(vehiculo).toBeInstanceOf(Vehiculo);
        expect(vehiculo.getMatricula()).toEqual("ABC123");
        expect(vehiculo.getEstado()).toEqual(EstadoVehiculo.Disponible);
        expect(vehiculo.getContadorKm()).toEqual(50);
        expect(vehiculo.getTarifaBase()).toEqual(10000);
        expect(vehiculo.getTarifaExtra()).toEqual(0.5);
    });

    test("Verificacion del getter de la propiedad matricula", () => {
        const matriculaEsperada: string = "ABC123";
        expect(vehiculo.getMatricula()).toEqual(matriculaEsperada);
    });

    test("Verificacion del setter de la propiedad matricula", () => {
        const nuevaMatricula: string = "DEF456";
        vehiculo.setMatricula(nuevaMatricula);
        expect(vehiculo.getMatricula()).toEqual(nuevaMatricula);
    });

    test("Verificacion del getter de la propiedad estado", () => {
        const estadoEsperado: EstadoVehiculo = EstadoVehiculo.Disponible;
        expect(vehiculo.getEstado()).toEqual(estadoEsperado);
    });

    test("Verificacion del setter de la propiedad estado", () => {
        const nuevoEstado: EstadoVehiculo = EstadoVehiculo.EnAlquiler;
        vehiculo.setEstado(nuevoEstado);
        expect(vehiculo.getEstado()).toEqual(nuevoEstado);
    });

    test("Verificacion del getter de la propiedad contadorKm", () => {
        const contadorKmEsperado: number = 50;
        expect(vehiculo.getContadorKm()).toEqual(contadorKmEsperado);
    });

    test("Verificacion del setter de la propiedad contadorKm", () => {
        const nuevoContadorKm: number = 100;
        vehiculo.setContadorKm(nuevoContadorKm);
        expect(vehiculo.getContadorKm()).toEqual(nuevoContadorKm);
    });

    test("Verificacion del getter de la propiedad tarifaBase", () => {
        const tarifaBaseEsperada: number = 10000;
        expect(vehiculo.getTarifaBase()).toEqual(tarifaBaseEsperada);
    });

    test("Verificacion del setter de la propiedad tarifaBase", () => {
        const nuevaTarifaBase: number = 15000;
        vehiculo.setTarifaBase(nuevaTarifaBase);
        expect(vehiculo.getTarifaBase()).toEqual(nuevaTarifaBase);
    });

    test("Verificacion del getter de la propiedad tarifaExtra", () => {
        const tarifaExtraEsperada: number = 0.5;
        expect(vehiculo.getTarifaExtra()).toEqual(tarifaExtraEsperada);
    });

    test("Verificacion del setter de la propiedad tarifaExtra", () => {
        const nuevaTarifaExtra: number = 0.7;
        vehiculo.setTarifaExtra(nuevaTarifaExtra);
        expect(vehiculo.getTarifaExtra()).toEqual(nuevaTarifaExtra);
    });

    test("Verificacion del metodo calcularTarifaBaseSegunTemporada", () => {
        const tarifaEsperada = (vehiculo as any).calcularTarifaBaseSegunTemporada(temporadaMock);
        expect(tarifaEsperada).toEqual(12000);
    });
    /*
    test("Verificacion del metodo actualizarContador", () => {
        const kmRecorridos: number = 30;
        const contadorKmInicial: number = vehiculo.getContadorKm();
        vehiculo.actualizarContador(kmRecorridos);
        expect(vehiculo.getContadorKm()).toEqual(contadorKmInicial + kmRecorridos);
    });*/

    test("Verifica que necesitaMantenimiento llame al método correspondiente del mantenimiento", () => {
        const mockMantenimiento = (vehiculo as any).mantenimiento;
        const resultado = vehiculo.necesitaMantenimiento();
        expect(mockMantenimiento.necesitaMantenimiento).toHaveBeenCalled();
        expect(resultado).toBe(true);
    });

    test("Verifica que incrementarAlquiler llame al método correspondiente del mantenimiento", () => {
        const mockMantenimiento = (vehiculo as any).mantenimiento;
        vehiculo.incrementarAlquiler();
        expect(mockMantenimiento.incrementarAlquiler).toHaveBeenCalled();
    });

    test("Verifica que resetearValoresMantenimiento llame al método correspondiente del mantenimiento", () => {
        const mockMantenimiento = (vehiculo as any).mantenimiento;
        vehiculo.resetearValoresMantenimiento();
        expect(mockMantenimiento.resetearValores).toHaveBeenCalled();
    });

    test("Verifica que actualizarKMRecorridos actualiza correctamente el contador", () => {
        const kmInicial = vehiculo.getContadorKm();
        vehiculo.actualizarKMRecorridos(100);
        expect(vehiculo.getContadorKm()).toBe(kmInicial + 100);
    });

});
