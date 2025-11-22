import GestionDeClientes from "./GestionDeCliente";
import GestorDeMantenimiento from "./GestionDeMantenimiento";
import GestionDeReservas from "./GestionDeReserva";
import GestionDeVehiculos from "./GestionDeVehiculo";

/**
 * Gestiona todas las operaciones del sistema de alquiler de vehículos.
 * 
 * Actúa como coordinador central entre la gestión de vehículos, clientes,
 * reservas y mantenimiento, proporcionando acceso a todos los módulos
 * del sistema de alquiler.
 */

export default class GestionDeAlquilerVehicular{

    private gestionDeVehiculos: GestionDeVehiculos 
    private gestionDeClientes: GestionDeClientes 
    private gestionDeReservas : GestionDeReservas
    private gestorDeMantenimiento: GestorDeMantenimiento

    /**
     * Inicializa el sistema de gestión de alquiler.
     * 
     * Crea instancias de todos los gestores:
     * - Mantenimiento
     * - Vehículos
     * - Clientes
     * - Reservas (que recibe el gestor de mantenimiento)
     */
    
    constructor( ){
        this.gestorDeMantenimiento = new GestorDeMantenimiento()
        this.gestionDeVehiculos = new GestionDeVehiculos()
        this.gestionDeClientes = new GestionDeClientes()
        this.gestionDeReservas = new GestionDeReservas()
    }

    /**
     * Obtiene el gestor de vehículos.
     * 
     * @returns {GestionDeVehiculos} Gestor para administrar vehículos (agregar, eliminar, etc.)
     */
    
    public getGestionDeVehiculos() : GestionDeVehiculos{
        return this.gestionDeVehiculos
    }

    /**
     * Obtiene el gestor de clientes.
     * 
     * @returns {GestionDeClientes} Gestor para administrar clientes (registrar, actualizar, etc.)
     */
    
    public getGestionDeClientes() : GestionDeClientes{
        return this.gestionDeClientes
    }

    /**
     * Obtiene el gestor de reservas.
     * 
     * @returns {GestionDeReservas} Gestor para administrar reservas (crear, cancelar, etc.)
     */
    
    public getGestionDeReservas() : GestionDeReservas{
        return this.gestionDeReservas
    }

}