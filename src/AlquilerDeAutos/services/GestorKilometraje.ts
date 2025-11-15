import RegistroDia from "../models/RegistroDia";

/**
 * Gestiona el registro de kilómetros recorridos durante un alquiler.
 * 
 * Mantiene un historial diario de los km recorridos y permite
 * calcular el total de km acumulados en una reserva.
 */

export default class GestorKilometraje {
    private informacionDelRecorrido: RegistroDia[] 

    /**
     * Inicializa el gestor de kilometraje con un registro vacío.
     */
    
    constructor(){
        this.informacionDelRecorrido = []
    }

    /**
     * Registra los km recorridos en un día específico.
     * 
     * Si ya existe un registro para ese día, suma los km al registro existente.
     * Si no existe, crea un nuevo registro para ese día.
     * 
     * @param {RegistroDia} registro - Registro con la fecha y km recorridos
     * 
     * @example
     * const registro = new RegistroDia(new Date(2025, 0, 15), 120);
     * gestorKilometraje.setKmRecorridoXDia(registro);
     */
    
    public setKmRecorridoXDia(registro : RegistroDia): void {
        const registroExistente = this.informacionDelRecorrido.find(
            r => r.getDia().toDateString() === registro.getDia().toDateString()
        );

        if (registroExistente) {
            registroExistente.setKmRecorrido(registroExistente.getKmRecorrido() + registro.getKmRecorrido());
        } else {
            this.informacionDelRecorrido.push(new RegistroDia(registro.getDia(), registro.getKmRecorrido()));
        }
    }

    /**
     * Obtiene el registro completo de km recorridos por día.
     * 
     * @returns {RegistroDia[]} Array con todos los registros diarios de recorrido
     * 
     * @example
     * const registros = gestorKilometraje.getInformacionDelRecorrido();
     * registros.forEach(r => console.log(`${r.getDia()}: ${r.getKmRecorrido()} km`));
     */
    
    public getInformacionDelRecorrido(): RegistroDia[] {
        return this.informacionDelRecorrido;
    }

    /**
     * Calcula el total de km recorridos en toda la reserva.
     * 
     * Suma todos los km de cada día registrado.
     * 
     * @returns {number} Total de km acumulados
     * 
     * @example
     * const totalKm = gestorKilometraje.getTotalKmRecorridos();
     * console.log(`Total recorrido: ${totalKm} km`);
     */
    
    public getTotalKmRecorridos(): number {
        return this.informacionDelRecorrido.reduce(
            (total, recorrido) => total + recorrido.getKmRecorrido(),
            0
        );
    }
}
