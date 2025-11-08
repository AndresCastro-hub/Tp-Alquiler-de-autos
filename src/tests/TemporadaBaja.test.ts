import TemporadaBaja from "../AlquilerDeAutos/models/TemporadaBaja";
import { MESES_TEMPORADAS } from "../AlquilerDeAutos/constants/constants";

describe ("Test de la clase Temporada Alta", () => {
    let temporadaBaja: TemporadaBaja;
    beforeEach(() => {
        temporadaBaja = new TemporadaBaja();
    });

    test("Verificar que el constructor instancia la clase correctamente.", ()=>{
        expect(temporadaBaja).toBeInstanceOf(TemporadaBaja);
        expect(temporadaBaja["mesesValidos"]).toEqual(MESES_TEMPORADAS.TEMPORADA_BAJA);
    });

    test("Verifica el método 'getPorcentajeDeTemporada()'.", ()=>{
        const tarifaBase: number = 100;
        const porcentaje: number = temporadaBaja.getPorcentajeDeTemporada(tarifaBase); 
        expect(porcentaje).toEqual(90);
    });
});
