import Sedan from '../AlquilerDeAutos/models/Sedan';
import { TARIFAS_AUTOS } from "../AlquilerDeAutos/constants/constants";
import { EstadoVehiculo } from '../AlquilerDeAutos/enums/EstadoVehiculo';
import RegistroDia from '../AlquilerDeAutos/models/RegistroDia';
import TemporadaBase from '../AlquilerDeAutos/models/TemporadaBase';

const registroDiaMock: RegistroDia[] = [
  {getKmRecorrido: jest.fn().mockReturnValue(110)},
  {getKmRecorrido: jest.fn().mockReturnValue(120)},
  {getKmRecorrido: jest.fn().mockReturnValue(130)},
  {getKmRecorrido: jest.fn().mockReturnValue(90)},
  {getKmRecorrido: jest.fn().mockReturnValue(80)}
] as unknown as RegistroDia[];

const temporadaMock: TemporadaBase = {
  getPorcentajeDeTemporada: jest.fn().mockImplementation((tarifaBase: number) => {
      return tarifaBase*1.2;
  })
} as unknown as TemporadaBase;

describe('Test de la clase Sedan', () => {
  let sedan: Sedan;

  beforeEach(()=>{
    sedan = new Sedan("ABC123", EstadoVehiculo.Disponible, 0);
  });

  test ("Verifica que el constructor de la clase Sedan instancie un objeto de tipo Sedan y asigne correctamente los valores de patente, estado, contadorKm, TarifaBase, y TarifaExtra", () => {
    expect(sedan).toBeInstanceOf(Sedan);
    expect(sedan.getMatricula()).toEqual("ABC123");
    expect(sedan.getEstado()).toEqual(EstadoVehiculo.Disponible);
    expect(sedan.getContadorKm()).toEqual(0);
    expect(sedan.getTarifaBase()).toEqual(TARIFAS_AUTOS.SEDAN.BASE);
    expect(sedan.getTarifaExtra()).toEqual(TARIFAS_AUTOS.SEDAN.EXTRA);
  });

  test('Verifica calcularTarifa', () => {
    const registroDiaMock2: RegistroDia[] = [] as unknown as RegistroDia[];
    expect(sedan.calcularTarifa(registroDiaMock2,temporadaMock)).toBe(0);

    const tarifaBaseEsperada = TARIFAS_AUTOS.SEDAN.BASE*1.2;
    const diasTranscurridosEsperados = 5;
    const kmTotalesRecorridosEsperados = 530;
    const tarifaExtraEsperada = TARIFAS_AUTOS.SEDAN.EXTRA;
    const resultadoEsperado: number = tarifaBaseEsperada * diasTranscurridosEsperados + kmTotalesRecorridosEsperados * tarifaExtraEsperada;
    expect(sedan.calcularTarifa(registroDiaMock,temporadaMock)).toEqual(resultadoEsperado);
  });
});
