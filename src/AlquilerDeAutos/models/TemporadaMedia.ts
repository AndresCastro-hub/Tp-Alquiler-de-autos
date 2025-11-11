import { MESES_TEMPORADAS } from "../constants/constants";
import TemporadaBase from "./TemporadaBase";
/**
 * Representa la temporada media en el sistema
 * Esta clase hereda de {@link TemporadaBase} y define el comportamiento especifico
 * de la temporada media, manteniendo la tarifa base sin modificaciones.
 * 
 * @extends TemporadaBase
 */
export default  class TemporadaMedia extends TemporadaBase{

    /**
     * Crea una nueva instancia de la clase TemporadaMedia asignando
     * los meses correspondientes
     */
   constructor() {
        super(MESES_TEMPORADAS.TEMPORADA_MEDIA); 
    }

    /**
     * Mantiene la tarifa base sin cambios
     * @param tarifaBase  -Valor base de la tarifa
     * @returns - La tarifa sin cambios para temproada media
     */
    
    public getPorcentajeDeTemporada(tarifaBase: number){
        return tarifaBase;
    }
}