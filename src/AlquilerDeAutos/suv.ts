import { EstadoVehiculo } from "./enums/EstadoVehiculo";
import RegistroDia from "./models/RegistroDia.js";
import Vehiculo from "./vehiculo.ts"
export default class Suv extends Vehiculo{
    
    private tarifaBase: number;
    private tarifaExtra: number;
    private tarifaFijaSeguro: number

    constructor(matricula: string, estado: EstadoVehiculo, contadorKm: number){
        super(matricula, estado, contadorKm);
        this.tarifaBase = 80;
        this.tarifaExtra = 0.25;
        this.tarifaFijaSeguro = 15;
    }

    calcularTarifa(totalDelRecorrido: RegistroDia[]): number{
        let diasTranscurridos = totalDelRecorrido.length();
        let kmTotalesRecorridos = 0;
        let montoExtra = 0;

        for (let i=1; i <= diasTranscurridos; i++){
            kmTotalesRecorridos += this.totalDelRecorrido;
        }

        if(kmTotalesRecorridos > 500){
           montoExtra = kmTotalesRecorridos * this.tarifaExtra;
        }
        return diasTranscurridos * this.tarifaBase + diasTranscurridos * this.tarifaFijaSeguro + montoExtra;
    }
} 