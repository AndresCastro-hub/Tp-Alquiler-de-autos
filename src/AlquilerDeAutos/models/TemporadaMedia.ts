import { MESES_TEMPORADAS } from "../constants/constants";
import TemporadaBase from "./TemporadaBase";

export default  class TemporadaMedia extends TemporadaBase{

   constructor() {
        super(MESES_TEMPORADAS.TEMPORADA_MEDIA); 
    }
    
    public getPorcentajeDeTemporada(tarifaBase: number){
        return tarifaBase;
    }
}