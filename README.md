# MISW-4103-ABP-W5

Ejercicio de pruebas autoamtizadas E2E

## Integrantes

- Carlos Arturo Rico Salazar / [c.ricos@uniandes.edu.co](c.ricos@uniandes.edu.co)
- Angel Yecid Henao Bedoya / [ay.henao@uniandes.edu.co](ay.henao@uniandes.edu.co)
- Julian Ricardo Villate Torres / [j.villatet@uniandes.edu.co](j.villatet@uniandes.edu.co)
- Santiago Gómez Perdomo / [s.gomezp2345@uniandes.edu.co](s.gomezp2345@uniandes.edu.co)

## Requerimientos

- **NodeJS:** v20.18.0
- **@playwright/test:** v1.48.2
- **@types/node:** v22.9.0
- **kraken-node:** v1.0.24

## Ghost

Es necesario crear una nueva instancia de ghost con las credenciales definidas en el archivo properties

Username: "jamie@example.com"
Password: "}WTdx6}h}ZLJTz4"



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

### Pruebas

Las pruebas relacionadas con Kraken se deben agregar dentro del directorio **features**.

Para correr las pruebas de Kraken se debe ejecutar en la terminal el siguiente el comando.

```shell
    npm run kraken-run
```

## Playwright

### Instalación

Para instalar el framework Playwright desde 0, se debe ejecutar el siguiente comando y seleccionar las opciones solicitadas en el proceso de instalación:

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

Una vez finalizada la ejecución de las pruebas, la interfaz del navegador con el reporte completo de las pruebas se debe abrir en una ventana automaticamente, sin embargo, si este no es el caso, se puede acceder al reporte a través de la dirección.

```shell
    http://localhost:9323
```
