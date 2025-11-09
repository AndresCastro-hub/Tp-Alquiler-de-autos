import { CONDICIONES_DESDE_ULTIMO_MANTENIMIENTO } from "../constants/constants";

export class VehiculoMantenimiento {

    private fechaUltimoMantenimiento: Date;
    private kmDelUltimoMantenimiento: number;
    private alquileresDesdeUltimoMantenimiento: number;

    constructor(fechaInicial: Date, kmInicial: number) {
        this.fechaUltimoMantenimiento = fechaInicial;
        this.kmDelUltimoMantenimiento = kmInicial;
        this.alquileresDesdeUltimoMantenimiento = 0;
    }

    public necesitaMantenimiento(contadorActual: number): boolean {
        const kmDesdeMantenimiento = contadorActual - this.kmDelUltimoMantenimiento;
        this.kmDelUltimoMantenimiento += contadorActual;
        const meses = this.mesesDesdeUltimoMantenimiento(this.fechaUltimoMantenimiento);

        return (
            kmDesdeMantenimiento >= CONDICIONES_DESDE_ULTIMO_MANTENIMIENTO.KM_RECORRIDOS
            || meses >= CONDICIONES_DESDE_ULTIMO_MANTENIMIENTO.MESES
            || this.alquileresDesdeUltimoMantenimiento >= CONDICIONES_DESDE_ULTIMO_MANTENIMIENTO.ALQUILERES
        );
    }

    private mesesDesdeUltimoMantenimiento(fecha: Date): number {
        const fechaActual = new Date();
        return (fechaActual.getFullYear() - fecha.getFullYear()) * 12 + (fechaActual.getMonth() - fecha.getMonth());
    }

    public incrementarAlquiler(): void {
        this.alquileresDesdeUltimoMantenimiento++;
    }

    public resetearValores(): void {
        this.fechaUltimoMantenimiento = new Date();
        this.kmDelUltimoMantenimiento = 0;
        this.alquileresDesdeUltimoMantenimiento = 0;
    }

}
