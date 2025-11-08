import { EstadoVehiculo } from "../enums/EstadoVehiculo";
import { Vehiculo } from "../models/Vehiculo";

export default class EstadististicasDeOcupacion{

    private ocupacionFlota (vehiculos: Array <Vehiculo>): number{
        return vehiculos.filter(v => v.getEstado() === EstadoVehiculo.EnAlquiler).length
    }

    public porcentajeDeOcupacion(vehiculos: Array<Vehiculo>): number{
        const cantidadEnAlquiler = this.ocupacionFlota(vehiculos);
        const totalDeVehiculos = vehiculos.length;

        if(totalDeVehiculos === 0){
            throw new Error("La flota esta vacia");
        }

        return (cantidadEnAlquiler/totalDeVehiculos) * 100;
    }
}