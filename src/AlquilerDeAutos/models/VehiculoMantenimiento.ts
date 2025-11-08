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
        const meses = this.mesesDesdeUltimoMantenimiento(this.fechaUltimoMantenimiento);
        return kmDesdeMantenimiento >= 10000 || meses >= 12 || this.alquileresDesdeUltimoMantenimiento >= 5;
    }

    private mesesDesdeUltimoMantenimiento(fecha: Date): number {
        const fechaActual = new Date();
        return (fechaActual.getFullYear() - fecha.getFullYear()) * 12 + (fechaActual.getMonth() - fecha.getMonth());
    }

    public incrementarAlquiler(): void {
        this.alquileresDesdeUltimoMantenimiento++;
    }

    public resetearValores(kmActual: number): void {
        this.fechaUltimoMantenimiento = new Date();
        this.kmDelUltimoMantenimiento = kmActual;
        this.alquileresDesdeUltimoMantenimiento = 0;
    }

}
