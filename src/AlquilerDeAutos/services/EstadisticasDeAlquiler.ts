/**
 * Devuelven matriculas, no vehiculos
 * subrayado rojo
 * Es correcto tener 2 metodos, mejor 1 para no repetir?
 * Es correcto como recorro el map?
 */

import Reserva from "../models/Reserva";


export default class EstadisticasDeAlquiler{

    public vehiculoMasAlquilado(reservas: Array<Reserva>, fechaInicio: Date, fechaFin: Date): string{

        const contador = this.obtenerAlquilados(reservas, fechaInicio, fechaFin);

        let matriculaMasAlquilada = "";
        let maxAlquileres = 0;

        if(contador.size === 0){
            return matriculaMasAlquilada;
        }

        for (const [matricula, conteo] of contador.entries()){
            if(conteo > maxAlquileres){
                maxAlquileres = conteo;
                matriculaMasAlquilada = matricula;
            }
        }

        return matriculaMasAlquilada;
    } 

    public vehiculoMenosAlquilado(reservas: Array<Reserva>, fechaInicio: Date, fechaFin: Date): string{
        const contador = this.obtenerAlquilados(reservas, fechaInicio, fechaFin);

        let matriculaMenosAlquilada = "";
        let minAlquileres = 0;

        if (contador.size === 0){
            return matriculaMenosAlquilada;
        }

        for (const [matricula, conteo] of contador.entries()){

            if(conteo > minAlquileres){
                minAlquileres = conteo;
                matriculaMenosAlquilada = matricula;
            }
        }
        
        return matriculaMenosAlquilada;
    }

    private obtenerAlquilados(reservas: Array<Reserva>, fechaInicio: Date, fechaFin: Date): Map<string, number>{
        const contadorDeAlquileres = new Map;
        for(let i=0; i < reservas.length; i++){

            if(reservas[i].getFechaInicioReserva() >= fechaInicio && reservas[i].getFechaFinReserva() <= fechaFin){

            const matriculaActual = reservas[i].getVehiculo().getMatricula();

            const conteoActual = contadorDeAlquileres.get(matriculaActual) || 0;
            //Intenta obtener el conteo actual de esa matrícula, si la matricula no existe en el map lo pone en 0;

            contadorDeAlquileres.set(matriculaActual, conteoActual+1);

            }
        }
        return contadorDeAlquileres;
    }
}