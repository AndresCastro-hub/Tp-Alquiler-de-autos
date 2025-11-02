import TemporadaBase from "../AlquilerDeAutos/models/TemporadaBase";
import GestorDeTemporada from "../AlquilerDeAutos/services/GestorDeTemporada";

const temporadaMock: TemporadaBase = {
    esValida: jest.fn().mockImplementation((fecha: Date) => {
        if(fecha === new Date("2022-05-01")) {
            return true;
        }
        return false;
    })
} as unknown as TemporadaBase;

describe("Test de la clase abstracta Temporada Base", () => {
    let gestor: GestorDeTemporada;
    beforeEach(()=>{
        gestor = new GestorDeTemporada();
    });

    test("Verifica que se instancia correctamente una clase GestorDeTemporada.", ()=>{
        expect(gestor).toBeInstanceOf(GestorDeTemporada);
    });

    test("Verifica el método 'agregarTemporada()'.", ()=>{
        gestor.agregarTemporada(temporadaMock);
        expect(gestor["temporadas"].length).toBe(1);
        expect(gestor["temporadas"][0]).toBe(temporadaMock);
    });

    test("Verifica el método 'getTemporada()'.", ()=>{
        gestor.agregarTemporada(temporadaMock);
        try{
            const fechaDeInicio = new Date("2022-05-01");
            const temporadaObtenida = gestor.getTemporada(fechaDeInicio);
            expect(temporadaObtenida).toEqual(temporadaMock);
    
    
            const fechaDeInicio2 = new Date("2022-07-01");
            gestor.getTemporada(fechaDeInicio2);
        } catch(error){
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toEqual("No se encontró una temporada válida para la fecha especificada.");
        }
    });

});