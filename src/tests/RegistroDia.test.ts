import RegistroDia from "../AlquilerDeAutos/models/RegistroDia";

describe("RegistroDia", () => {
  let fecha: Date;
  let registro: RegistroDia;

  beforeEach(() => {
    fecha = new Date("2025-09-19");
    registro = new RegistroDia(fecha, 100);
  });

  it("debería crear una instancia con los valores iniciales", () => {
    expect(registro.getDia()).toEqual(fecha);
    expect(registro.getKmRecorrido()).toBe(100);
  });

  it("debería devolver el día correctamente con getDia", () => {
    expect(registro.getDia().toDateString()).toBe(fecha.toDateString());
  });

  it("debería devolver los km recorridos correctamente con getKmRecorrido", () => {
    expect(registro.getKmRecorrido()).toBe(100);
  });

  it("debería permitir cambiar el día con setDia", () => {
    const nuevaFecha = new Date("2025-09-20");
    registro.setDia(nuevaFecha);
    expect(registro.getDia()).toEqual(nuevaFecha);
  });

  it("debería permitir cambiar los km recorridos con setKmRecorrido", () => {
    registro.setKmRecorrido(200);
    expect(registro.getKmRecorrido()).toBe(200);
  });

  it("debería reflejar correctamente múltiples cambios", () => {
    const nuevaFecha = new Date("2025-09-25");
    registro.setDia(nuevaFecha);
    registro.setKmRecorrido(350);

    expect(registro.getDia()).toEqual(nuevaFecha);
    expect(registro.getKmRecorrido()).toBe(350);
  });
});
