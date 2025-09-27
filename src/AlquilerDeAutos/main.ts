import { EstadoVehiculo } from "./enums/EstadoVehiculo"
import Cliente from "./models/Cliente"
import Compacto from "./models/Compacto"
import RegistroDia from "./models/RegistroDia"
import Reserva from "./models/Reserva"
import Sedan from "./models/Sedan"
import GestionDeAlquilerVehicular from "./services/GestionDeAlquilerVehicular"
import GestorKilometraje from "./services/GestorKilometraje"

function main() {

    try {

        const gestor: GestionDeAlquilerVehicular = new GestionDeAlquilerVehicular()

        const compactoUno: Compacto = new Compacto("ABC123", EstadoVehiculo.Disponible, 300000)
        const sedanUno: Sedan = new Sedan("ABC232", EstadoVehiculo.Disponible, 300000)

        gestor.getGestionDeVehiculos().agregarVehiculo(compactoUno)
        gestor.getGestionDeVehiculos().agregarVehiculo(sedanUno)

        const clienteUno = new Cliente("Maximo", "Anzuinelli", "a@hotmail.com")
        const clienteDos = new Cliente("Andres", "Castro", "a2@hotmail.com")
        const clienteTres = new Cliente("Fernando", "Campo", "a22@hotmail.com")
        const clienteCuatro = new Cliente("Ignacio", "Ciccone", "a2222@hotmail.com")
        const clienteCinco = new Cliente("Juan", "Damelio", "a22222@hotmail.com")

        gestor.getGestionDeClientes().agregarCliente(clienteUno)
        gestor.getGestionDeClientes().agregarCliente(clienteDos)
        gestor.getGestionDeClientes().agregarCliente(clienteTres)
        gestor.getGestionDeClientes().agregarCliente(clienteCuatro)
        gestor.getGestionDeClientes().agregarCliente(clienteCinco)

        const gestorUno = new GestorKilometraje()
        const reservaUno = new Reserva(clienteUno, compactoUno, gestorUno, new Date(), new Date())

        const gestorDos = new GestorKilometraje()
        const reservaDos = new Reserva(clienteDos, compactoUno, gestorDos, new Date(), new Date())

        const diaUno = new RegistroDia(new Date(), 100)

        //Arreglar la clase GestorKilometraje para que espere directamente un RegistroDia 
        reservaUno.getGestionDelKilometraje().setKmRecorridoXDia(new Date(), 100)

        gestor.getGestionDeReservas().agregarReserva(reservaUno)
        gestor.getGestionDeReservas().agregarReserva(reservaDos)
        gestor.getGestionDeReservas().cerrarReserva(reservaDos)
        gestor.getGestionDeReservas().cerrarReserva(reservaUno)
        
        console.log(gestor.getGestionDeReservas().getReservas())

    } catch (e) {
        console.log(e)
    }
}

main()