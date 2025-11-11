/**
 * Representa a un cliente dentro del sistema.
 * 
 * Contiene sus datos personales: nombre, apellido y su email.
 * 
 */

export default class Cliente {
    private nombre: string;
    private apellido: string;
    private email: string;

    /**
     * Crea una nueva instancia de cliente.
     * 
     * @param nombre - Nombre del cliente.
     * @param apellido - Apellido del cliente.
     * @param email - Email del cliente.
     */

    constructor();
    constructor(nombre: string, apellido: string, email: string);
    constructor(nombre?: string, apellido?: string, email?: string){
        this.nombre = nombre || '';
        this.apellido = apellido || '';
        this.email = email || '';
    }

    public getNombre(): string{
        return this.nombre;
    }
    
    public getApellido(): string{
        return this.apellido;
    }
    
    public getEmail(): string{
        return this.email;
    }

    public setNombre(nombre:string):void {
        this.nombre = nombre;
    }

    public setApellido(apellido:string):void {
        this.apellido = apellido;
    }

    public setEmail(email:string):void {
        this.email = email;
    }
}