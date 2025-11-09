import Suv from '../AlquilerDeAutos/models/Suv';
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

describe('Test de la clase Suv', () => {
  let suv: Suv;
  
  beforeEach(()=>{
    suv = new Suv("ABC123", EstadoVehiculo.Disponible, 0);
  });

  test ("Verifica que el constructor de la clase Suv instancie un objeto de tipo Suv y asigne correctamente los valores de patente, estado, contadorKm, TarifaBase, y TarifaExtra", () => {
    expect(suv).toBeInstanceOf(Suv);
    expect(suv.getMatricula()).toEqual("ABC123");
    expect(suv.getEstado()).toEqual(EstadoVehiculo.Disponible);
    expect(suv.getContadorKm()).toEqual(0);
    expect(suv.getTarifaBase()).toEqual(TARIFAS_AUTOS.SUV.BASE);
    expect(suv.getTarifaExtra()).toEqual(TARIFAS_AUTOS.SUV.EXTRA);
  });

  test('Verifica calcularTarifa', () => {
    const registroDiaMock2: RegistroDia[] = [] as unknown as RegistroDia[];
    expect(suv.calcularTarifa(registroDiaMock2,temporadaMock)).toBe(0);

    const tarifaBaseEsperada = TARIFAS_AUTOS.SUV.BASE*1.2;
    const diasTranscurridosEsperados = 5;
    const tarifaFijaSeguroEsperada = TARIFAS_AUTOS.SUV.SEGURO;
    const kmTotalesRecorridosEsperados = 530;
    const tarifaExtraEsperada = TARIFAS_AUTOS.SUV.EXTRA;
    const montoExtraEsperado = kmTotalesRecorridosEsperados * tarifaExtraEsperada;
    const resultadoEsperado: number =  diasTranscurridosEsperados * (tarifaBaseEsperada + tarifaFijaSeguroEsperada)  + montoExtraEsperado;
    expect(suv.calcularTarifa(registroDiaMock,temporadaMock)).toEqual(resultadoEsperado);
  });

});
