import GestionDeClientes from "../src/AlquilerDeAutos/gestionDeClientes"
import Cliente from "../src/AlquilerDeAutos/cliente"

describe("Tests de la clase GestionDeClientes", ()=>{
    const gestor = new GestionDeClientes();
    const cliente1 = new Cliente("nombre1", "apellido1", "email1@email.com");
    
    test("Verifica que se ejecuto correctamente el constructor de la clase, creando una instancia de GestionDeClientes: ", ()=>{
        expect(gestor).toBeInstanceOf(GestionDeClientes);
        expect(gestor["clientes"]).toEqual([]);
    });

    test("Verifica el metodo agregarCliente: ", ()=>{
        gestor.agregarCliente(cliente1);
        expect(gestor["clientes"][0]).toEqual(cliente1);

        try{
            gestor.agregarCliente(cliente1);
        }catch(error){
            expect((error as Error).message).toEqual("El cliente ya esta en el sistema");
        }
    });

    test("Verifica el metodo eliminarCliente: ", ()=>{
        gestor.eliminarCliente(cliente1);
        expect(gestor["clientes"]).toEqual([]);
        try{
            gestor.eliminarCliente(cliente1);
        }catch(error){
            expect((error as Error).message).toEqual("El cliente no esta en el sistema");
        }
    });

    test("Verifica el metodo clienteExiste: ", ()=>{
        expect(gestor["clienteExiste"](cliente1)).toEqual(false);
        gestor.agregarCliente(cliente1);
        expect(gestor["clienteExiste"](cliente1)).toEqual(true);
    });

});