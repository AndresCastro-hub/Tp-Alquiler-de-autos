import { EstadoVehiculo } from "../enums/EstadoVehiculo";
import RegistroDia from "./RegistroDia.js";
import { Vehiculo } from "./Vehiculo";
export default class Suv extends Vehiculo{

    private tarifaFijaSeguro: number

    constructor(matricula: string, estado: EstadoVehiculo, contadorKm: number){
        super(matricula, estado, contadorKm,);
        this.setTarifaBase(80);
        this.setTarifaExtra(0.25)
        this.tarifaFijaSeguro = 15;
    }

    calcularTarifa(totalDelRecorrido: RegistroDia[]): number{
        let diasTranscurridos = totalDelRecorrido.length;
        let kmTotalesRecorridos = 0;
        let montoExtra = 0;

        for (let i=1; i < diasTranscurridos; i++){
            kmTotalesRecorridos += totalDelRecorrido[i].getKmRecorrido();
        }

        if(kmTotalesRecorridos > 500){
           montoExtra = kmTotalesRecorridos * this.getTarifaExtra();
        }
        return diasTranscurridos * this.getTarifaBase() + diasTranscurridos * this.tarifaFijaSeguro + montoExtra;
    }
} 