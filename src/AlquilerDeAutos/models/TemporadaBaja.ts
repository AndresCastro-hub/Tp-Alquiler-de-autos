
import { MESES_TEMPORADAS } from "../constants/constants";
import TemporadaBase from "./TemporadaBase";

export default class TemporadaBaja extends TemporadaBase {

    constructor() {
        super(MESES_TEMPORADAS.TEMPORADA_BAJA);
    }

  public getPorcentajeDeTemporada(tarifaBase: number): number {
    return tarifaBase * 0.90;
  }
}