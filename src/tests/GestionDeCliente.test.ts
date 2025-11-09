import ErrorClienteNoExiste from "../AlquilerDeAutos/errors/excepcionClienteNoExiste";
import ErrorClienteRepetido from "../AlquilerDeAutos/errors/excepcionClienteRepetido";
import Cliente from "../AlquilerDeAutos/models/Cliente";
import GestionDeClientes from "../AlquilerDeAutos/services/GestionDeCliente";

const clienteMock = {
    getNombre: jest.fn().mockReturnValue("nombre1"),
    
    getApellido: jest.fn().mockReturnValue("apellido1"),
    
    getEmail: jest.fn().mockReturnValue("email@email.com")
} as unknown as Cliente;


describe("Tests de la clase GestionDeClientes", ()=>{
    let gestor: GestionDeClientes;
    beforeEach(()=>{
        gestor = new GestionDeClientes();
    });
    
    test("Verifica que se ejecuto correctamente el constructor de la clase, creando una instancia de GestionDeClientes: ", ()=>{
        expect(gestor).toBeInstanceOf(GestionDeClientes);
        expect(gestor["clientes"]).toEqual([]);
    });

    test("Verifica el metodo agregarCliente: ", ()=>{
        gestor.agregarCliente(clienteMock);
        expect(gestor["clientes"][0]).toEqual(clienteMock);

        try{
            gestor.agregarCliente(clienteMock);
        }catch(error){
            expect(error).toBeInstanceOf(ErrorClienteRepetido);
            expect(error.message).toEqual("El cliente ya esta en el sistema");
        }
    });

    test("Verifica el metodo eliminarCliente: ", ()=>{
        gestor.agregarCliente(clienteMock);
        gestor.eliminarCliente(clienteMock);
        expect(gestor["clientes"]).toEqual([]);
        try{
            gestor.eliminarCliente(clienteMock);
        }catch(error){
            expect(error).toBeInstanceOf(ErrorClienteNoExiste);
            expect(error.message).toEqual("El cliente no esta en el sistema");
        }
    });

    test("Verifica el metodo clienteExiste: ", ()=>{
        expect(gestor["clienteExiste"](clienteMock)).toEqual(false);
        gestor.agregarCliente(clienteMock);
        expect(gestor["clienteExiste"](clienteMock)).toEqual(true);
    });

});