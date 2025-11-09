import TemporadaMedia from "../AlquilerDeAutos/models/TemporadaMedia";
import { MESES_TEMPORADAS } from "../AlquilerDeAutos/constants/constants";

describe ("Test de la clase Temporada Media", () => {
    let temporadaMedia: TemporadaMedia;
    beforeEach(() => {
        temporadaMedia = new TemporadaMedia();
    });

    test("Verificar que el constructor instancia la clase correctamente.", ()=>{
        expect(temporadaMedia).toBeInstanceOf(TemporadaMedia);
        expect(temporadaMedia["mesesValidos"]).toEqual(MESES_TEMPORADAS.TEMPORADA_MEDIA);
    });

    test("Verifica el método 'getPorcentajeDeTemporada()'.", ()=>{
        const tarifaBase: number = 100;
        const porcentaje: number = temporadaMedia.getPorcentajeDeTemporada(tarifaBase); 
        expect(porcentaje).toEqual(100);
    });
});
