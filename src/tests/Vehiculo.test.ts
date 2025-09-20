import { EstadoVehiculo } from "../AlquilerDeAutos/enums/EstadoVehiculo";
import RegistroDia from "../AlquilerDeAutos/models/RegistroDia";
import { Vehiculo } from "../AlquilerDeAutos/models/Vehiculo";

class testVehiculo extends Vehiculo {
    calcularTarifa(totalDelRecorrido: RegistroDia[]): number {
        throw new Error("Method not implemented.");
    }
    constructor(matricula: string, estado: EstadoVehiculo, contadorKm: number, tarifaBase: number, tarifaExtra: number) {
        super(matricula, estado, contadorKm, tarifaBase, tarifaExtra);
    }
}
describe ("Test de la clase abstracta Vehiculo", () => {
    const vehiculo = new testVehiculo("ABC123", EstadoVehiculo.Disponible, 50, 10000, 0.5);
    test ("Verifica que el constructor de la clase Vehiculo instancie un objeto de tipo Vehiculo y asigne correctamente los valores de patente, estado, precioPorDia, duracionMinima, y costoSeguro", () => {
    expect(vehiculo).toBeInstanceOf(Vehiculo);
    expect(vehiculo.getMatricula()).toEqual("ABC123");
    expect(vehiculo.getEstado()).toEqual(EstadoVehiculo.Disponible);
    expect(vehiculo.getContadorKm()).toEqual(50);
    expect(vehiculo.getTarifaBase()).toEqual(10000);
    expect(vehiculo.getTarifaExtra()).toEqual(0.5);
    });

    test ("Verificacion del getter de la propiedad matricula", () => {
        const matriculaEsperada: string = "ABC123";
        expect(vehiculo.getMatricula()).toEqual(matriculaEsperada);
    });
    
    test ("Verificacion del setter de la propiedad matricula", () => {
        const nuevaMatricula: string = "DEF456";
        vehiculo.setMatricula(nuevaMatricula);
        expect(vehiculo.getMatricula()).toEqual(nuevaMatricula);
    });

    test ("Verificacion del getter de la propiedad estado", () => {
        const estadoEsperado: EstadoVehiculo = EstadoVehiculo.Disponible;
        expect(vehiculo.getEstado()).toEqual(estadoEsperado);
    });
    
    test ("Verificacion del setter de la propiedad estado", () => {
        const nuevoEstado: EstadoVehiculo = EstadoVehiculo.EnAlquiler;
        vehiculo.setEstado(nuevoEstado);
        expect(vehiculo.getEstado()).toEqual(nuevoEstado);
    });

    test ("Verificacion del getter de la propiedad contadorKm", () => {
        const contadorKmEsperado: number = 50;
        expect(vehiculo.getContadorKm()).toEqual(contadorKmEsperado);
    });
    
    test ("Verificacion del setter de la propiedad contadorKm", () => {
        const nuevoContadorKm: number = 100;
        vehiculo.setContadorKm(nuevoContadorKm);
        expect(vehiculo.getContadorKm()).toEqual(nuevoContadorKm);
    });
    
    test ("Verificacion del getter de la propiedad tarifaBase", () => {
        const tarifaBaseEsperada: number = 10000;
        expect(vehiculo.getTarifaBase()).toEqual(tarifaBaseEsperada);
    });
    
    test ("Verificacion del setter de la propiedad tarifaBase", () => {
        const nuevaTarifaBase: number = 15000;
        vehiculo.setTarifaBase(nuevaTarifaBase);
        expect(vehiculo.getTarifaBase()).toEqual(nuevaTarifaBase);
    });
    
    test ("Verificacion del getter de la propiedad tarifaExtra", () => {
        const tarifaExtraEsperada: number = 0.5;
        expect(vehiculo.getTarifaExtra()).toEqual(tarifaExtraEsperada);
    });
    
    test ("Verificacion del setter de la propiedad tarifaExtra", () => {
        const nuevaTarifaExtra: number = 0.7;
        vehiculo.setTarifaExtra(nuevaTarifaExtra);
        expect(vehiculo.getTarifaExtra()).toEqual(nuevaTarifaExtra);
    });
    
    test ("Verificacion del metodo actualizarContador", () => {
        const kmRecorridos: number = 30;
        const contadorKmInicial: number = vehiculo.getContadorKm();
        vehiculo.actualizarContador(kmRecorridos);
        expect(vehiculo.getContadorKm()).toEqual(contadorKmInicial + kmRecorridos);
    });
});

