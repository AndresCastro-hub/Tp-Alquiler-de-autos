# Alquiler de autos 🚗

# 🚗 DriveHub – Sistema de Gestión de Alquiler de Autos

## 📌 Resumen del Proyecto
DriveHub es una aplicación que gestiona una flota de vehículos y las reservas de sus clientes.  
Permite crear vehículos, administrar alquileres, registrar kilometraje, calcular tarifas con recargos, aplicar variaciones por temporada, controlar mantenimiento automático y generar estadísticas de uso y rentabilidad.

## 📂 Estructura del Proyecto
  ```txt
diagramas/
  clases/       -> Diagrama de clases general de la aplicación
  secuencia/    -> Diagrama de secuencia de 2 acciones internas

tests/          -> Pruebas unitarias

documentacion/  -> Documentación generada con TypeDoc

src/
  models/       -> Clases principales (Vehículos, Reserva, Cliente, etc.)
  services/     -> Lógica de negocio (tarifas, mantenimiento, estadísticas)
  constants/    -> Valores hardcodeados centralizados
  errors/       -> Clases de excepciones
  enums/        -> Enumeraciones de la aplicación
```
# 📦 Instalar dependencias
Instalá las dependencias necesarias para correr el proyecto:
```bash
npm install
```
# 🚀 Levantar el proyecto
Para ejecutar el proyecto en modo desarrollo:
```bash 
npm run dev
```

# 🧪 Correr los tests
Este proyecto usa Jest para las pruebas. Para correr todos los tests:
```bash
npm test
```

