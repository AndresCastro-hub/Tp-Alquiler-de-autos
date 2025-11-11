import { MESES_TEMPORADAS } from "../constants/constants";
import TemporadaBase from "./TemporadaBase";
/**
 * Representa la temporada alta en el  sistema
 * 
 * Esta clase hereda de {@link TemporadaBase} y define el comportamiento especifico
 * de la temporada alta, aplicando un aumento de 20 % sobre la tarifa base diaria
 * 
 * @extends TemporadaBase
 */
export default class TemporadaAlta extends TemporadaBase {

    /**
     * Crea una nueva instancia de la clase Temporada alta asignado los meses
     * correspondientes
     */
     constructor() {
        super(MESES_TEMPORADAS.TEMPORADA_ALTA);
    }

    /**
     * Aplica un aumento de 20 % sobre la tarifa base
     * @param tarifaBase - Valor base de la tarifa
     * @returns - La tarifa ajustada para temporada alta
     */
    public getPorcentajeDeTemporada(tarifaBase: number) {
        return tarifaBase * 1.20;
    }
}

