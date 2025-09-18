import Cliente from "../Cliente";

describe("Tests de la clase Cliente", () =>{
    const cliente = new Cliente("nombre1", "apellido1", "email@email");

    test("Verifica que el constructor de la clase Cliente instancie un objeto de tipo Cliente y asigne correctamente los valores de nombre, apellido y email", ()=>{
        expect(cliente).toBeInstanceOf(Cliente);
        expect(cliente["nombre"]).toEqual("nombre1");
        expect(cliente["apellido"]).toEqual("apellido1");
        expect(cliente["email"]).toEqual("email@email");
    });

    test("Verificacion del metodo getNombre: ", ()=>{
        const nombreEsperado:string = "nombre1";
        expect(cliente.getNombre()).toEqual(nombreEsperado);
    });

    test("Verificacion del metodo getApellido: ", ()=>{
        const apellidoEsperado:string = "apellido1";
        expect(cliente.getApellido()).toEqual(apellidoEsperado);
    });

    test("Verificacion del metodo getEmail: ", ()=>{
        const emailEsperado:string = "email@email";
        expect(cliente.getEmail()).toEqual(emailEsperado);
    });

    test("Verificacion del metodo setNombre: ", ()=>{
        const nombreNuevo: string = "nombre2"
        cliente.setNombre(nombreNuevo);
        const nombreEsperado:string = "nombre2";
        expect(cliente["nombre"]).toEqual(nombreEsperado);
    });

    test("Verificacion del metodo setApellido: ", ()=>{
        const apellidoNuevo: string = "apellido2"
        cliente.setApellido(apellidoNuevo);
        const apellidoEsperado:string = "apellido2";
        expect(cliente["apellido"]).toEqual(apellidoEsperado);
    });

    test("Verificacion del metodo setEmail: ", ()=>{
        const emailNuevo: string = "email2@email"
        cliente.setEmail(emailNuevo);
        const emailEsperado:string = "email2@email";
        expect(cliente["email"]).toEqual(emailEsperado);
    });
});