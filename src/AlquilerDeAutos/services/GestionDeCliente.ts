import Cliente from "../models/Cliente";
import ErrorClienteNoExiste from "../errors/excepcionClienteNoExiste";
import ErrorClienteRepetido from "../errors/excepcionClienteRepetido";

/**
 * Gestiona el registro y eliminación de clientes en el sistema.
 * 
 * Permite agregar nuevos clientes, eliminar clientes existentes
 * y verificar su existencia en la base de datos.
 */

export default class GestionDeClientes {
   private clientes: Cliente[];

   /**
    * Inicializa el gestor de clientes con una lista vacía.
    */
   
   constructor() {
       this.clientes = [];
   }

   /**
    * Agrega un nuevo cliente al sistema.
    * 
    * @param {Cliente} cliente - Cliente a agregar
    * @throws {ErrorClienteRepetido} Si el cliente ya existe en el sistema
    * 
    * @example
    * const cliente = new Cliente("Juan", "juan@email.com");
    * gestionDeClientes.agregarCliente(cliente);
    */
   
   public agregarCliente(cliente: Cliente): void {
        if(this.clienteExiste(cliente)){
           throw new ErrorClienteRepetido("El cliente ya esta en el sistema");
        }
        this.clientes.push(cliente);
   }

    /**
    * Elimina un cliente del sistema.
    * 
    * @param {Cliente} cliente - Cliente a eliminar
    * @throws {ErrorClienteNoExiste} Si el cliente no existe en el sistema
    * 
    * @example
    * gestionDeClientes.eliminarCliente(cliente);
    */
   
   public eliminarCliente(cliente: Cliente): void {
        if(!this.clienteExiste(cliente)){
            throw new ErrorClienteNoExiste("El cliente no esta en el sistema");
        }
        this.clientes = this.clientes.filter(c => ( c.getEmail() !== cliente.getEmail() ));
   }

   /**
    * Verifica si un cliente existe en el sistema.
    * 
    * La búsqueda se realiza por email del cliente.
    * 
    * @private
    * @param {Cliente} cliente - Cliente a buscar
    * @returns {boolean} true si el cliente existe, false en caso contrario
    */
   
   private clienteExiste(cliente: Cliente): boolean {
        return this.clientes.some(c =>
            ( c.getEmail() === cliente.getEmail() )
        );
   }
}