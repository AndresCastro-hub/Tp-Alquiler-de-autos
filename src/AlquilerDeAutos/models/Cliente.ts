export default class Cliente {
    private nombre: string;
    private apellido: string;
    private email: string;

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