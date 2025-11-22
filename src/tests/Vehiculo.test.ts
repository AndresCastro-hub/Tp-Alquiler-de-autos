import EstadoDisponible from "../AlquilerDeAutos/models/EstadosVehiculo/EstadoDisponible";
import EstadoEnAlquiler from "../AlquilerDeAutos/models/EstadosVehiculo/EstadoEnAlquiler";
import TemporadaBase from "../AlquilerDeAutos/models/TemporadaBase";
import { Vehiculo } from "../AlquilerDeAutos/models/Vehiculo";

class VehiculoMock extends Vehiculo {
    constructor() {
        super("ABC123", 0);
    }

    calcularTarifa(): number {
        return 0;
    }
}


class testVehiculo extends Vehiculo {
    calcularTarifa(): number {
        throw new Error("Method not implemented.");
    }
    constructor(matricula: string, contadorKm: number) {
        super(matricula, contadorKm);
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
        vehiculo = new testVehiculo("ABC123", 50);
        vehiculo.setTarifaBase(10000);
        vehiculo.setTarifaExtra(0.5);
        (vehiculo as any).mantenimiento = {
            necesitaMantenimiento: jest.fn().mockReturnValue(true),
            incrementarAlquiler: jest.fn(),
            resetearValores: jest.fn(),
        };

    });


    test("Constructor asigna correctamente sus valores", () => {
        expect(vehiculo).toBeInstanceOf(Vehiculo);
        expect(vehiculo.getMatricula()).toEqual("ABC123");
        expect(vehiculo.getContadorKm()).toEqual(50);
        expect(vehiculo.getEstado()).toBeInstanceOf(EstadoDisponible);
        expect(vehiculo.getTarifaBase()).toBe(10000);
        expect(vehiculo.getTarifaExtra()).toBe(0.5);
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

    test("Verificacion del getter de la propiedad estado inicial", () => {
        expect(vehiculo.getEstado()).toBeInstanceOf(EstadoDisponible);
    });

    test("Verificación del setter de la propiedad estado", () => {
        const vehiculo = new VehiculoMock();
        const nuevoEstado = new EstadoEnAlquiler();

        vehiculo.setEstado(nuevoEstado);

        expect(vehiculo.getEstado()).toBe(nuevoEstado);
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
        const tarifaEsperada = vehiculo.calcularTarifaBaseSegunTemporada(temporadaMock);
        expect(tarifaEsperada).toEqual(12000);
    });

    test("Verificacion del metodo actualizarContador", () => {
        const kmRecorridos: number = 30;
        const contadorKmInicial: number = vehiculo.getContadorKm();
        vehiculo.actualizarContador(kmRecorridos);
        expect(vehiculo.getContadorKm()).toEqual(contadorKmInicial + kmRecorridos);
    });

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
