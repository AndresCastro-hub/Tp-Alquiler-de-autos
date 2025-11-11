import { MESES_TEMPORADAS } from "../constants/constants";
import TemporadaBase from "./TemporadaBase";
/**
 * Representa la temporada baja en el  sistema
 * 
 * Esta clase hereda de {@link TemporadaBase} y define el comportamiento especifico
 * de la temporada baja, aplicando una baja de 10 % sobre la tarifa base diaria
 * 
 * @extends TemporadaBase
 */
export default class TemporadaBaja extends TemporadaBase {

    /**
     * Crea una nueva instancia de la clase TemporadaBaja asignando
     * los meses correspondientes
     */
    constructor() {
        super(MESES_TEMPORADAS.TEMPORADA_BAJA);
    }

    /**
     * Aplica una baja del 10 % sobre la tarifa base diaria
     * @param tarifaBase - Valor base de la tarifa
     * @returns - La tarifa ajustada para temporada baja
     */
  public getPorcentajeDeTemporada(tarifaBase: number): number {
    return tarifaBase * 0.90;
  }
}