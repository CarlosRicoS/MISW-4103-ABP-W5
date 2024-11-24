# MISW-4103-ABP-W5

Ejercicio de pruebas autoamtizadas E2E

## Integrantes

- Carlos Arturo Rico Salazar / [c.ricos@uniandes.edu.co](c.ricos@uniandes.edu.co)
- Angel Yecid Henao Bedoya / [ay.henao@uniandes.edu.co](ay.henao@uniandes.edu.co)
- Julian Ricardo Villate Torres / [j.villatet@uniandes.edu.co](j.villatet@uniandes.edu.co)
- Santiago Gómez Perdomo / [s.gomezp2345@uniandes.edu.co](s.gomezp2345@uniandes.edu.co)

## Requerimientos

- **ghost-base:** v4.5
- **ghost-rc:** v5.96.0
- **NodeJS:** v20.18.0
- **@playwright/test:** v1.48.2
- **@types/node:** v22.9.0
- **kraken-node:** v1.0.24
- **chai:** v4.3.6
- **@faker-js/faker:** v9.2.0
- **pixelmatch:** v5.3.0
- **cross-env:** v7.0.3

## Ghost

Se debe iniciar dos instancías de ghost para la ejecución de las pruebas, tanto para la version base como para la
version rc. Por favor realizar los siguientes pasos antes de ejecutar las pruebas:

- Iniciar una instancia de ghost con la version base

```shell
     docker run -p 2369:2368 -d --rm --name ghost-base -e NODE_ENV=development ghost:4.5
```

- Registrarse con las siguientes credenciales en la version base:
    - **Username:** "jamie@example.com"
    - **Password:** "}WTdx6}h}ZLJTz4"

- Iniciar una instancia de ghost con la version rc

```shell
     docker run -p 2368:2368 -d --rm --name ghost-rc -e NODE_ENV=development ghost:5.96.0
```

- Registrarse con las siguientes credenciales en la version rc:
    - **Username:** "jamie@example.com"
    - **Password:** "}WTdx6}h}ZLJTz4"

Para finalizar la ejecución de la instancia del contenedor se debe ejecutar el siguiente comando

```shell
    docker container stop ghost-base
    docker container stop ghost-rc
```

## Kraken

### Instalación

Para instalar el framework Kraken desde 0, se debe ejecutar el comando:

```shell
    npm install kraken-node --save
```

Posteriormente se debe ejecutar el siguiente comando para la generación de la estructura de archivos.

```shell
    npx kraken-node gen
```

Para la instalación del framework desde este repositorio, únicamente se debe ejecutar el comando:

```shell
    npm install
```

Adicionalmente se requiere la instalación de Appium para la ejecución de las pruebas de Kraken.

```shell
    npm install -g appium
```

Finalmente se requiere tener instalado Android adb para la ejecución de las pruebas de Kraken.

```shell
    https://stackoverflow.com/questions/31374085/installing-adb-on-macos
```

### Pruebas

Las pruebas relacionadas con Kraken se deben agregar dentro del directorio **features**.

Para correr las pruebas de Kraken se debe ejecutar en la terminal el siguiente el comando.

```shell
    npm run kraken-run
```

Una vez finalizada la ejecución de las pruebas, el reporte completo de las pruebas se debe encontrar en la carpeta *
*reports**.

```shell
    reports/*/index.html
```

Para visualizar las pruebas se debe abrir el archivo **index.html** en un navegador.

## Playwright

### Instalación

Para instalar el framework Playwright desde 0, se debe ejecutar el siguiente comando y seleccionar las opciones
solicitadas en el proceso de instalación:

```shell
    npm init playwright@latest
```

Para la instalación del framework desde este repositorio, únicamente se debe ejecutar el comando:

```shell
    npm install
```

### Pruebas

Las pruebas relacionadas con Playwright se deben agregar dentro del directorio **playwright-tests**.

Para correr las pruebas de Playwright se debe ejecutar en la terminal el siguiente el comando.

```shell
    npm run playwright-run
```

Una vez finalizada la ejecución de las pruebas, la interfaz del navegador con el reporte completo de las pruebas se debe
abrir en una ventana automaticamente, sin embargo, si este no es el caso, se puede acceder al reporte a través de la
dirección.

```shell
    http://localhost:9323
```

## Pruebas de regresión visual

### Playwright

En el caso de playwright se desarrollo un script que corre las pruebas sobre la version base, compara las imagenes con
las pruebas previamente corridas sobre la version rc y genera el reporte VRT.
Use el siguiente comando para correr las pruebas:

``` shell

    npm run playwright-vrt
```

El reporte de las pruebas de regresión visual se encontrará en la carpeta **./vrt-playwright/vrt_playwright_report.html
**.
Este podrá ser visualizado en cualquier navegador.


## Pruebas con datos

Para la ejecución de las pruebas aleatorias, se debe realizar instalación de los paquetes agregados nuevamente por medio del comando

``` shell

    npm install --force
```

Posteriormente se realiza la ejecucón de las pruebas de acuerdo al tipo de datos que se requiera.

### Datos a-priori

Para la ejecución de pruebas con datos *a-priori*, se debe ejecutar el siguiente comando.

``` shell

    npm run playwright-priori
```

### Datos (pseudo) aleatorios dinámicos

Para la ejecución de pruebas con datos *(pseudo) aleatorios dinámicos*, se debe ejecutar el siguiente comando.

``` shell

    npm run playwright-ps-rand
```

### Datos aleatorios

Para la ejecución de pruebas con datos *aleatorios*, se debe ejecutar el siguiente comando.

``` shell

    npm run playwright-rand
```

### Ejecución completa de pruebas

Para la ejecución de todas las pruebas con los 3 tipos de datos, se debe ejecutar el siguiente comando.

``` shell

    npm run playwright-all
```

### Backstop

En el caso de Backsttop se desarrollo un script que toma las capturas de las pruebas de la nueva version y las compara con 
las capturas de la versión base , compara las imagenes según el porcentaje de aceptación genera el reporte VRT.
Use el siguiente comando dentro de la raíz del repositorio para correr las pruebas:

```
    backstop test
```

El reporte de las pruebas de regresión visual se encontrará en la carpeta **.\backstop_data\html_report
**.

