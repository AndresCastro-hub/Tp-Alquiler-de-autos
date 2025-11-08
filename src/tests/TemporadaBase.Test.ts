import TemporadaBase from "../AlquilerDeAutos/models/TemporadaBase";

class testTemporadaBase extends TemporadaBase {
    getPorcentajeDeTemporada(tarifaBase: number): number {
        throw new Error("Method not implemented.");
    }
}

describe ("Test de la clase abstracta Temporada Base", () => {
    let temporada: testTemporadaBase;
    beforeEach(() => {
        temporada = new testTemporadaBase([1,2,3]);
    });

    test("Verificar que el constructor instancia la clase correctamente.", ()=>{
        expect(temporada).toBeInstanceOf(TemporadaBase);
        expect(temporada["mesesValidos"]).toEqual([1,2,3]);
    });

    test("Verifica el método 'esValida()'.", ()=>{
        const fecha1 = new Date("2022-05-01");
        const fecha2 = new Date("2022-02-01");

        expect(temporada.esValida(fecha1)).toEqual(false);
        expect(temporada.esValida(fecha2)).toEqual(true);
    });
});