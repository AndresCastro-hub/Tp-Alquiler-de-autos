# Alquiler de autos 🚗

Proyecto desarrollado en **TypeScript**.

---

# 📥 Clonar el repositorio
Primero, clona el repositorio y entra en la carpeta del proyecto:

```bash
git clone https://github.com/AndresCastro-hub/Tp-Alquiler-de-autos.git
cd Tp-Alquiler-de-autos
```

# 📦 Instalar dependencias
Instalá las dependencias necesarias para correr el proyecto:
```bash
npm install
```

## Trabajar con ramas

Asegurate de estar en la rama principal (main):
```bash
git checkout main 
git pull origin main
```
Traete los ultimos cambios de la rama main 
```bash
git pull origin main
```
Creá una nueva rama a partir de main:
```bash
git checkout -b nombre-de-tu-rama
```
Subí tu rama al remoto:
```bash
git push origin nombre-de-tu-rama
```
# 🚀 Levantar el proyecto
Para ejecutar el proyecto en modo desarrollo:
```bash 
npm run dev
```
Con este comando no hace falta reiniciar el servidor cada vez que hagas un cambio.
El proyecto usa ts-node-dev (similar a nodemon), que detecta los cambios en los archivos y reinicia automáticamente la aplicación.

# 🧪 Correr los tests
Este proyecto usa Jest para las pruebas. Para correr todos los tests:
```bash
npm test
```

# 🔄 Flujo de trabajo recomendado
- Clonar el repositorio
- Crear una nueva rama desde main
- Hacer los cambios necesarios
- Correr los tests (npm test)
- Subir la rama al remoto (git push origin nombre-de-tu-rama)
- Crear un Pull Request hacia main 
