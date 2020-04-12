# curso-ionic
Curso ionic de platzi, utilizando capacitor
## verion ionic
> ionic -v **6.1.0**

## version npm
> npm -v **6.14.2**

## version capacitor
> npx cap --version**2.0.1**

## como inciar con ionic

Podemos instalar un proyecto dependiendo del template que queramos **tabs, blank, sidemenu, maps**
```
ionic start platzi-music tabs
```
Normalmente en esta version de ionic cuando instalas un proyecto ya te da la opcion de instalar **capacitor** pero si no se instala de la siguiente manera.
```
npm install --save @capacitor/core @capacitor/cli --save=exact
```
Esto se guarda en el **package.json** pero tambien nos aseguramos de guardar **exact** para no tener problemas a la hora de replicar el proyecto

- @capacitor/core
Envuelve el código para llevarlo a los dispositivos y emuladores
- @capacitor/cli
Permite ejecutar comandos dentro del proyecto para generar la aplicacion

Tambien en esta version de ionic ya inicia capacitor por nosotros, pero por si no 
```
npx cap init
```
Pide el **name App** que es el nombre de como va aparecer tu app cuando lo busquen en la tienda y pide el **client** en este caso es **npm**

## Capacitor

Capacitor necesita compilar el codigo para **ios** y **android**, para eso necesita una carpeta **www** ionic con el siguiente comando crea esa carpeta con todo lo necesario (todo nuestro proyecto)
```
ionic build
```

Ahora si capacitor puede compilar nuestro codigo para android
```
npx cap add android
```

Si se tiene android studio podemos abrir el codigo compilado
```
npx cap open android
```

Podemos compilar el codigo para ios
```
npx cap add ios
```

Y para abrirlo en xCode
```
npx open ios
```
*Cuando se compilan cada quien crea su carpeta, tanto android e ios*

> Si queremos que al actualizar nuestro codigo en ionic se vea reflejado en los emuladores **ios y android** los comandos son:
```
ionic buid && npx cap sync
```
> si solo se modifica el html y css se ocupa otro comando para actualizar y es mas rapido
```
ionic buid && npx cap copy
```

# Comencemos

```
```
```
```
```
```
```
```
```