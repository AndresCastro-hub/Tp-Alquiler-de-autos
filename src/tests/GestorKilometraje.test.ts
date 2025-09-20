import GestorKilometraje from "../AlquilerDeAutos/services/GestorKilometraje";


describe("GestorKilometraje", () => {
  let gestor: GestorKilometraje;
  let fecha1: Date;
  let fecha2: Date;

  beforeEach(() => {
    gestor = new GestorKilometraje();
    fecha1 = new Date("2025-09-18");
    fecha2 = new Date("2025-09-19");
  });

  it("debería iniciar con la lista vacía", () => {
    expect(gestor.getInformacionDelRecorrido()).toEqual([]);
    expect(gestor.getTotalKmRecorridos()).toBe(0);
  });

  it("debería agregar un nuevo registro si no existe para la fecha", () => {
    gestor.setKmRecorridoXDia(fecha1, 50);
    const registros = gestor.getInformacionDelRecorrido();

    expect(registros).toHaveLength(1);
    expect(registros[0].getDia()).toEqual(fecha1);
    expect(registros[0].getKmRecorrido()).toBe(50);
  });

  it("debería acumular los km si la fecha ya existe", () => {
    gestor.setKmRecorridoXDia(fecha1, 50);
    gestor.setKmRecorridoXDia(fecha1, 30); 

    const registros = gestor.getInformacionDelRecorrido();

    expect(registros).toHaveLength(1);
    expect(registros[0].getKmRecorrido()).toBe(80);
  });

  it("debería manejar múltiples días correctamente", () => {
    gestor.setKmRecorridoXDia(fecha1, 100);
    gestor.setKmRecorridoXDia(fecha2, 200);

    const registros = gestor.getInformacionDelRecorrido();

    expect(registros).toHaveLength(2);
    expect(registros[0].getKmRecorrido()).toBe(100);
    expect(registros[1].getKmRecorrido()).toBe(200);
  });

  it("debería calcular el total de km recorridos correctamente", () => {
    gestor.setKmRecorridoXDia(fecha1, 120);
    gestor.setKmRecorridoXDia(fecha2, 80);

    const total = gestor.getTotalKmRecorridos();

    expect(total).toBe(200);
  });

  it("debería actualizar el total si se agregan km a un día existente", () => {
    gestor.setKmRecorridoXDia(fecha1, 40);
    gestor.setKmRecorridoXDia(fecha1, 60);

    expect(gestor.getTotalKmRecorridos()).toBe(100);
  });
});
