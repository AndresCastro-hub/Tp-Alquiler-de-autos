import Cliente from "./cliente";

export default class GestionDeClientes {
   private clientes: Cliente[];

   constructor() {
       this.clientes = [];
   }

   public agregarCliente(cliente: Cliente): void {
        if(this.clienteExiste(cliente)){
           throw new Error("El cliente ya esta en el sistema");
        }
        this.clientes.push(cliente);
   }

   public eliminarCliente(cliente: Cliente): void {
        if(!this.clienteExiste(cliente)){
            throw new Error("El cliente no esta en el sistema");
        }
        this.clientes = this.clientes.filter(c => ( c.getEmail() !== cliente.getEmail() ));
   }

   private clienteExiste(cliente: Cliente): boolean {
        return !!this.clientes.find(c =>
            ( c.getEmail() === cliente.getEmail() )
        );
   }
}