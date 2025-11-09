/**
 * Representa un cliente dentro del sistema.
 *
 * La clase `Cliente` almacena la información básica de un cliente,
 * incluyendo su nombre, apellido y correo electrónico.
 *
 * @example
 * ```ts
 * const cliente = new Cliente("Andrés", "Castro", "andres@mail.com");
 * console.log(cliente.getNombre()); // "Andrés"
 * cliente.setEmail("nuevo@mail.com");
 * ```
 *
 * @class
 */
export default class Cliente {
  /**
   * Nombre del cliente.
   * @private
   */
  private nombre: string;

  /**
   * Apellido del cliente.
   * @private
   */
  private apellido: string;

  /**
   * Correo electrónico del cliente.
   * @private
   */
  private email: string;

  /**
   * Crea una nueva instancia de Cliente.
   *
   * @param nombre - Nombre del cliente. (Opcional)
   * @param apellido - Apellido del cliente. (Opcional)
   * @param email - Correo electrónico del cliente. (Opcional)
   */
  constructor(nombre?: string, apellido?: string, email?: string) {
    this.nombre = nombre || '';
    this.apellido = apellido || '';
    this.email = email || '';
  }

  /**
   * Obtiene el nombre del cliente.
   * @returns El nombre del cliente.
   */
  public getNombre(): string {
    return this.nombre;
  }

  /**
   * Obtiene el apellido del cliente.
   * @returns El apellido del cliente.
   */
  public getApellido(): string {
    return this.apellido;
  }

  /**
   * Obtiene el correo electrónico del cliente.
   * @returns El correo electrónico del cliente.
   */
  public getEmail(): string {
    return this.email;
  }

  /**
   * Establece un nuevo nombre para el cliente.
   * @param nombre - El nuevo nombre.
   */
  public setNombre(nombre: string): void {
    this.nombre = nombre;
  }

  /**
   * Establece un nuevo apellido para el cliente.
   * @param apellido - El nuevo apellido.
   */
  public setApellido(apellido: string): void {
    this.apellido = apellido;
  }

  /**
   * Establece un nuevo correo electrónico para el cliente.
   * @param email - El nuevo correo electrónico.
   */
  public setEmail(email: string): void {
    this.email = email;
  }
}
