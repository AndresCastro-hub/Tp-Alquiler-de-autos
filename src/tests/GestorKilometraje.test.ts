import RegistroDia from "../AlquilerDeAutos/models/RegistroDia";
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
    const diaUno = new RegistroDia(fecha1, 50)
    gestor.setKmRecorridoXDia(diaUno);
    const registros = gestor.getInformacionDelRecorrido();

    expect(registros).toHaveLength(1);
    expect(registros[0].getDia()).toEqual(fecha1);
    expect(registros[0].getKmRecorrido()).toBe(50);
  });

  it("debería acumular los km si la fecha ya existe", () => {
    const diaUno = new RegistroDia(fecha1, 50)
    const diaDos = new RegistroDia(fecha1, 30)
    gestor.setKmRecorridoXDia(diaUno);
    gestor.setKmRecorridoXDia(diaDos); 

    const registros = gestor.getInformacionDelRecorrido();

    expect(registros).toHaveLength(1);
    expect(registros[0].getKmRecorrido()).toBe(80);
  });

  it("debería manejar múltiples días correctamente", () => {
    const diaUno = new RegistroDia(fecha1, 100)
    const diaDos = new RegistroDia(fecha2, 200)

    gestor.setKmRecorridoXDia(diaUno);
    gestor.setKmRecorridoXDia(diaDos);

    const registros = gestor.getInformacionDelRecorrido();

    expect(registros).toHaveLength(2);
    expect(registros[0].getKmRecorrido()).toBe(100);
    expect(registros[1].getKmRecorrido()).toBe(200);
  });

  it("debería calcular el total de km recorridos correctamente", () => {
    const diaUno = new RegistroDia(fecha1, 120)
    const diaDos  = new RegistroDia(fecha2, 80)
    gestor.setKmRecorridoXDia(diaUno);
    gestor.setKmRecorridoXDia(diaDos);

    const total = gestor.getTotalKmRecorridos();

    expect(total).toBe(200);
  });

  it("debería actualizar el total si se agregan km a un día existente", () => {
    const diaTres = new RegistroDia(fecha1,40)
    const diaCuatro = new RegistroDia(fecha1, 60)
    gestor.setKmRecorridoXDia(diaTres);
    gestor.setKmRecorridoXDia(diaCuatro);

    expect(gestor.getTotalKmRecorridos()).toBe(100);
  });
});
