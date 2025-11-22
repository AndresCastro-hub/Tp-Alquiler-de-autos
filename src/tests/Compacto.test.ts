import Compacto from '../AlquilerDeAutos/models/Compacto';
import { TARIFAS_AUTOS } from "../AlquilerDeAutos/constants/constants";
import RegistroDia from '../AlquilerDeAutos/models/RegistroDia';
import TemporadaBase from '../AlquilerDeAutos/models/TemporadaBase';
import EstadoDisponible from '../AlquilerDeAutos/models/EstadosVehiculo/EstadoDisponible';

const registroDiaMock: RegistroDia[] = [
  { getKmRecorrido: jest.fn().mockReturnValue(110) },
  { getKmRecorrido: jest.fn().mockReturnValue(120) },
  { getKmRecorrido: jest.fn().mockReturnValue(130) },
  { getKmRecorrido: jest.fn().mockReturnValue(90) },
  { getKmRecorrido: jest.fn().mockReturnValue(80) }
] as unknown as RegistroDia[];

const temporadaMock: TemporadaBase = {
  getPorcentajeDeTemporada: jest.fn().mockImplementation((tarifaBase: number) => {
    return tarifaBase * 1.2;
  })
} as unknown as TemporadaBase;

describe('Test de la clase Compacto', () => {
  let compacto: Compacto;

  beforeEach(() => {
    compacto = new Compacto("ABC123", 0);
  });

  test("Verifica que el constructor de la clase Compacto instancie un objeto de tipo Compacto y asigne correctamente los valores de patente, estado, contadorKm, TarifaBase, y TarifaExtra", () => {
    expect(compacto).toBeInstanceOf(Compacto);
    expect(compacto.getMatricula()).toEqual("ABC123");
    expect(compacto.getEstado()).toBeInstanceOf(EstadoDisponible);
    expect(compacto.getContadorKm()).toEqual(0);
    expect(compacto.getTarifaBase()).toEqual(TARIFAS_AUTOS.COMPACTO.BASE);
    expect(compacto.getTarifaExtra()).toEqual(TARIFAS_AUTOS.COMPACTO.EXTRA);
  });

  test('Verifica calcularTarifa', () => {
    const registroDiaMock2: RegistroDia[] = [] as unknown as RegistroDia[];
    expect(compacto.calcularTarifa(registroDiaMock2, temporadaMock)).toBe(0);


    const tarifaBaseEsperada = TARIFAS_AUTOS.COMPACTO.BASE * 1.2;
    const diasTranscurridosEsperados = 5;
    const kmExtraEsperados = 60;
    const tarifaExtraEsperada = TARIFAS_AUTOS.COMPACTO.EXTRA;
    const resultadoEsperado: number = tarifaBaseEsperada * diasTranscurridosEsperados + kmExtraEsperados * tarifaExtraEsperada;
    expect(compacto.calcularTarifa(registroDiaMock, temporadaMock)).toEqual(resultadoEsperado);
  });

});
