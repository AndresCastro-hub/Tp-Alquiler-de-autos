import { VehiculoMantenimiento } from "../AlquilerDeAutos/models/VehiculoMantenimiento";
import { CONDICIONES_DESDE_ULTIMO_MANTENIMIENTO } from "../AlquilerDeAutos/constants/constants";

describe('VehiculoMantenimiento', () => {
    let mantenimiento: VehiculoMantenimiento;
    const fechaInicial = new Date('2025-01-01');
    const kmInicial = 1000;

    beforeEach(() => {
        mantenimiento = new VehiculoMantenimiento(fechaInicial, kmInicial);
        jest.useFakeTimers();
        jest.setSystemTime(new Date('2025-01-01'));
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('debería crear una instancia correctamente', () => {
        expect(mantenimiento).toBeInstanceOf(VehiculoMantenimiento);
    });

    it('debería necesitar mantenimiento cuando supera KM_RECORRIDOS', () => {
        const kmActual = kmInicial + CONDICIONES_DESDE_ULTIMO_MANTENIMIENTO.KM_RECORRIDOS + 1;
        expect(mantenimiento.necesitaMantenimiento(kmActual)).toBe(true);
    });

    it('no debería necesitar mantenimiento cuando no supera KM_RECORRIDOS', () => {
        const kmActual = kmInicial + CONDICIONES_DESDE_ULTIMO_MANTENIMIENTO.KM_RECORRIDOS - 1;
        expect(mantenimiento.necesitaMantenimiento(kmActual)).toBe(false);
    });

    it('debería necesitar mantenimiento cuando supera MESES', () => {
        jest.setSystemTime(new Date('2026-08-01'));
        expect(mantenimiento.necesitaMantenimiento(kmInicial)).toBe(true);
    });

    it('no debería necesitar mantenimiento cuando no supera MESES', () => {
        jest.setSystemTime(new Date('2025-06-01'));
        expect(mantenimiento.necesitaMantenimiento(kmInicial)).toBe(false);
    });

    it('debería necesitar mantenimiento cuando supera ALQUILERES', () => {
        for (let i = 0; i < CONDICIONES_DESDE_ULTIMO_MANTENIMIENTO.ALQUILERES; i++) {
            mantenimiento.incrementarAlquiler();
        }
        expect(mantenimiento.necesitaMantenimiento(kmInicial)).toBe(true);
    });

    it('no debería necesitar mantenimiento cuando no supera ALQUILERES', () => {
        for (let i = 0; i < CONDICIONES_DESDE_ULTIMO_MANTENIMIENTO.ALQUILERES - 1; i++) {
            mantenimiento.incrementarAlquiler();
        }
        expect(mantenimiento.necesitaMantenimiento(kmInicial)).toBe(false);
    });

    it('debería incrementar contador de alquileres correctamente', () => {
        mantenimiento.incrementarAlquiler();
        expect(mantenimiento.necesitaMantenimiento(kmInicial)).toBe(false);
        
        for (let i = 1; i < CONDICIONES_DESDE_ULTIMO_MANTENIMIENTO.ALQUILERES; i++) {
            mantenimiento.incrementarAlquiler();
        }
        expect(mantenimiento.necesitaMantenimiento(kmInicial)).toBe(true);
    });

    it('debería resetear valores correctamente', () => {
        for (let i = 0; i < CONDICIONES_DESDE_ULTIMO_MANTENIMIENTO.ALQUILERES; i++) {
            mantenimiento.incrementarAlquiler();
        }
        jest.setSystemTime(new Date('2025-08-01'));
        
        mantenimiento.resetearValores();
        
        expect(mantenimiento.necesitaMantenimiento(kmInicial)).toBe(false);
    });
});