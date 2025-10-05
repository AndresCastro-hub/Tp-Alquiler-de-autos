import GestionDeClientes from "./GestionDeCliente";
import GestionDeReservas from "./GestionDeReserva";
import GestionDeVehiculos from "./GestionDeVehiculo";

export default class GestionDeAlquilerVehicular{

    private gestionDeVehiculos: GestionDeVehiculos 
    private gestionDeClientes: GestionDeClientes 
    private gestionDeReservas : GestionDeReservas 

    constructor( ){
        this.gestionDeVehiculos = new GestionDeVehiculos()
        this.gestionDeClientes = new GestionDeClientes()
        this.gestionDeReservas = new GestionDeReservas()
    }

    public getGestionDeVehiculos() : GestionDeVehiculos{
        return this.gestionDeVehiculos
    }

    public getGestionDeClientes() : GestionDeClientes{
        return this.gestionDeClientes
    }

    public getGestionDeReservas() : GestionDeReservas{
        return this.gestionDeReservas
    }

}