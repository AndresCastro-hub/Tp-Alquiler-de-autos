import TemporadaAlta from "../AlquilerDeAutos/models/TemporadaAlta";
import { MESES_TEMPORADAS } from "../AlquilerDeAutos/constants/constants";

describe ("Test de la clase Temporada Alta", () => {
    let temporadaAlta: TemporadaAlta;
    beforeEach(() => {
        temporadaAlta = new TemporadaAlta();
    });

    test("Verificar que el constructor instancia la clase correctamente.", ()=>{
        expect(temporadaAlta).toBeInstanceOf(TemporadaAlta);
        expect(temporadaAlta["mesesValidos"]).toEqual(MESES_TEMPORADAS.TEMPORADA_ALTA);
    });

    test("Verifica el método 'getPorcentajeDeTemporada()'.", ()=>{
        const tarifaBase: number = 100;
        const porcentaje: number = temporadaAlta.getPorcentajeDeTemporada(tarifaBase); 
        expect(porcentaje).toEqual(120);
    });
});
