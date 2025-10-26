import { MESES_TEMPORADAS } from "../constants/constants";
import TemporadaBase from "./TemporadaBase";

export default class TemporadaAlta extends TemporadaBase {

     constructor() {
        super(MESES_TEMPORADAS.TEMPORADA_ALTA);
    }

    public getPorcentajeDeTemporada(tarifaBase: number) {
        return tarifaBase * 1.20;
    }
}

