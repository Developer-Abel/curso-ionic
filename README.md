# Curso-ionic
Curso ionic de platzi, utilizando capacitor
## version ionic
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

## creando sliders

Ionic ya tiene un componente integrado que es **ion-slides** y crea un slider basico, podemos intergar **childrens** a este slider con la etiqueta **ion-slide**
```html
<ion-slides pager="true" id="slider" [options]="slideOpts">
    <ion-slide>
        <ion-icon name="close" class="x"></ion-icon>
        <img src="assets/img/logo.png" alt="logo musica">
        <h1>Escucha tu musica</h1>
        <h2>EN CUALQUIER LUGAR</h2>
        <P>Los mejores álbumes, las mejores canciones. Escucha y comparte en cualquier momento, a todas horas.</P>
        <ion-icon name="caret-forward-outline"></ion-icon>
    </ion-slide>
</ion-slides>
```

- ion-slides: padre
- ion-slide: hijos
- pager="true": para que se vean los puntitos
- [options]="slideOpts": recibe opciones de configuracion desde el componente
```typescript
export class HomePage {
    slideOpts = {
    initialSlide: 1,//inicia en la posicion #1, (el segundo slider)
    slidesPerView: 1,//un slider por vista
    centeredSlides: true,//slider centrados
    speed: 400// 400 miliseguntos al pasar los slider
}
```

Ahora vamos a modificar el código para que el slider sea dinamico, para eso en el componente creamos las variables y con un **NgFor** listamos todo
```html
<ion-slides pager="true" id="slider" [options]="slideOpts">
    <ion-slide *ngFor="let slide of sliders">
        <ion-icon name="close" class="x"></ion-icon>
        <img src="assets/img/logo.png" alt="logo musica">
        <h1>{{slide.titulo}}</h1>
        <h2>{{slide.subtitulo}}</h2>
        <P>{{slide.descripcion}}</P>
        <ion-icon name="{{slide.icon}}"></ion-icon>
    </ion-slide>
</ion-slides>
```

```typescript
sliders = [
  {
    titulo: "Escucha tu musica",
    subtitulo: "EN CUALQUIER LUGAR",
    descripcion: "Los mejores álbumes, las mejores canciones. Escucha y comparte en cualquier momento, a todas horas.",
    icon:"play"
  }
]
```

## Generar una página

Vamos a cambiar de lugar los sliders a una pagina que se llame intro, para esos vamos a generar una **page**
```
ionic generate page intro
```
Se crea una carpeta llamada intro con todo lo necesario, y solo movemos los codigos.

## import Router

En el slider tiene un icono "X" que es para cerrar el slider y vamos a programarlo para que nos mande al home (donde estaba nuestro slider anteriormente), para eso creamos en el componente una funcion para que al darle click a la "X" accione esa funcion.

Esta funcion se va a llamar **finish** y lo que va hacer es redirigir a la ruta home, y para eso utilisa un metodo llamado **navigateByUrl** y para poder usarlo debemos importar la libreria **Router**
```typescript
import { Router } from '@angular/router';
```

Lo declaramos en el constructor
```typescript
constructor( private router: Router) { }
```

y por ultimo creamos la funcion
```typescript
finish(){
    this.router.navigateByUrl("/home");
}
```

Ahora solo falta llamarlo desde el html.
```typescript
<ion-icon name="close" class="x" (click)="finish()"></ion-icon>
```

hasta este momento al darle click a la "X" en nuestro slider nos debe redirigir al home.

## storage

Mostar el slider cada ves que entren a la app es muy molesto, vamos a configurar para que solo lo pueda ver la primera vez, para eso debemos de guardar una variable en el **storage local** para eso vamos a instalarlo
```
npm install @ionic/storage --save-exact
```

despues lo importamos en nuestro componente
```typescript
import { Storage } from '@ionic/storage';
```

lo declaramos en el contructor
```typescript
constructor( private router: Router, private _storage: Storage) {}
```

Importamos e inicializamos en el **app.module.ts** importandolo IonicSto...
```typescript
import { IonicStorageModule } from '@ionic/storage';
```

```typescript
imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, IonicStorageModule.forRoot()],
```

Por ultimo indicamos que al pulsar la "X" o la cerrar el slider en la variable **YaVioElIntro** pasamos el valor de **true** por que ya lo vio.
```typescript
finish(){
    this._storage.set('YaVioElIntro', true);
    this.router.navigateByUrl('/home');
}
```

Hasta aqui al cerrar el slider, en el **storage local** nos guarda la variable que definimos en **true**, para verlo en modo consola nos vamos a *application/indexedDB/_ionicstorage/_ionickv*.

```
```
```
```
```
```
```
```