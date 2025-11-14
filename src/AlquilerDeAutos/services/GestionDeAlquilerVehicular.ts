import GestionDeClientes from "./GestionDeCliente";
import GestorDeMantenimiento from "./GestionDeMantenimiento";
import GestionDeReservas from "./GestionDeReserva";
import GestionDeVehiculos from "./GestionDeVehiculo";

export default class GestionDeAlquilerVehicular{

    private gestionDeVehiculos: GestionDeVehiculos 
    private gestionDeClientes: GestionDeClientes 
    private gestionDeReservas : GestionDeReservas
    private gestorDeMantenimiento: GestorDeMantenimiento

    constructor( ){
        this.gestorDeMantenimiento = new GestorDeMantenimiento()
        this.gestionDeVehiculos = new GestionDeVehiculos()
        this.gestionDeClientes = new GestionDeClientes()
        this.gestionDeReservas = new GestionDeReservas(this.gestorDeMantenimiento)
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