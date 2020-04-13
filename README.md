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
![img storage](https://github.com/Developer-Abel/curso-ionic/blob/master/platzi-music/src/assets/img/storage.PNG)

## Guards 

Se debe de controlar la navegación; al entrar a la app que aparesca el slider y si lo cierran que se rediriga al home (eso ya esta), pero ahora debemos de checar que solo una ves vea el usuario el slider (por que si no va hacer muy molesto) y esto se logra con el **guard** de angular.
```
ionic generate guard guard/intro
```

Se el guard se guarda en una carpeta **guard** y los archivos se llaman **intro**

## configuración del Guards

La idea es que en el archivo
> app-routing.module.ts

donde se encuentran las rutas **(** Routes **)**, debemos activar el **Guards**. Para eso primero tenemos que importarlo.
```typescript
import { IntroGuard } from './guards/intro.guard';
```

El **intro.guard** es el archivo que se genero al crear el Guards.

Ahora especificamos: *puedes acceder al **home** solo si el **Guard** es verdadero*
```typescript
{ path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
  canActivate: [IntroGuard]
},
```

Como podemos ver **canActivate: [IntroGuard]** esta es la linea que agregamos, entonces en el archivo **intro.guard.ts** debemos de tener una clase que se llame **IntroGuard** y que retorne verdadero para poder acceder al home.

**importante: si no regresa verdadero, hasta este punto solo no se mostraria nada en la app (se muestra una hoja en blanco), esa logica la programamos en el archivo *IntroGuard*.**

En este otro archivo
> intro.guard.ts

Creamos una funcion en donde obtenemos el valor de la variable que guardamos en el **local storage** y verificamos, pero para eso tenemos que importar en **CanActivate**.
```typescript
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
```

Lo declaramos en el constructor
```typescript
constructor( private _storage: Storage, private _router: Router){}
```

Por ultimo validamos **(** se debe de importar Route, esto ya lo habiamos visto antes **)**.
```typescript
async canActivate() {
    const YaVioElIntro = await this._storage.get('YaVioElIntro');

    if(YaVioElIntro) {
        return true;
    } else {
        this._router.navigateByUrl('/intro');
    }
}
```

Si la variable que esta en el **local storage** es verdadero, retorna true (entonces pasa al home, porque de esta clase se esperaba un **true** para poder continuar) y si no redirigimos al intro.

## Login

Ionic crea una vista de un login por nosotros con el siguiente comando
```
ionic generate page login
```

y nos va a crear una carpeta **login** con los archivos necesarios. 

**para utilizar las propiedades de ionic se tiene que especificar en el clase *class="ion-text-center"*.**

## Creacion de formulario reactivo LOGIN

Un formulario rectivo, especifica que tipo de input va a contener el formulario, y que tipo de datos va a contener ese input, y antes que todo se debe de importar **ReactiveFormsModule** para poder utilizar todas sus directivas y providers (**FormBuilder, EmailValidator,FormGroupName, etc**), esto en el archivo **login.modules.ts**
```typescript
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
```

tambien lo declaramos en los **imports.**
```typescript
@NgModule({
  imports: [
    ReactiveFormsModule, //importar
  ]
```

tambien vamos a importar todo lo necesario para que esto se logre en nuestro **componente page**
```typescript
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
```

Primero como se va a llamar nuestro formulario y de que tipo va hacer.
```typescript
export class LoginPage implements OnInit {
  loginForm: FormGroup;
}
```
El **FormGroup** va a encapsular todos los inputs y de esta forma podemos manipularlo creando validaciones etc.

Para construir lo campos dinamicamente vamos a utilizar **FormBuilder** (ya esta importado) solo vamos a declararlo en el constructor.
```typescript
 constructor(private _formBuilder: FormBuilder ) { }
```

Mediante nuestra variable vamos a instanciar para utilizar el **FormBuider**, y comenzamos a validar.
```typescript
constructor(private _formBuilder: FormBuilder ) { 
    this.loginForm = this._formBuilder.group({
      Email: new FormControl("", Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]))
    });
}
```

Ahora en nuestro **html** creamos el formulario, especificando el nombre **loginForm** y de una vez vamos a crear una funcion para que cuando pulse el boton continuar obtenga los valores del input. (**despues vamos a crear esta funcion**)
```html
<form [formGroup]="loginForm" (ngSubmit)="loginUser(loginForm.value)">
        <ion-item>
            <ion-label>Email: </ion-label>
            <ion-input formControlName="Email"></ion-input>
        </ion-item>
    </form>
```
**importante el *formControlName* es el nombre que sele puso en el componente**

lo mismo con el password
```typescript
password: new FormControl("", 
    Validators.compose([
        Validators.required,
        Validators.minLength(5)
    ])
)
```

```html
<ion-item>
    <ion-label>Password: </ion-label>
    <ion-input type="password" formControlName="password"></ion-input>
</ion-item>
```

Ahora si por ejemplo escriben algo que no va de acuerdo con las validaciones debe de aparecer un mensaje de error, esto se logra de la siguiente manera.

Se crea un array con los posibles errore y con sus respectuvos mensajes
```typescript
validation_messages = {
    email:[
      {type: "required", message: "El email es requerido"},
      {type: "pattern", message: "ojo este no es un email valido"}
    ],
    password:[
      {type: "required", message: "El password es requerido"},
      {type: "minlength", message: "se requiere de minimo 5 letras"}
    ]
};
```

realizamos un **for** para recorrer el array antes mencionado, y un **if** si se cumple
```html
<div class="validation-error">
    <ng-container *ngFor="let validation of validation_messages.email">
        <div *ngIf="loginForm.get('email').hasError(validation.type) && (loginForm.get('email').dirty || loginForm.get('email').touched")>
            {{validation.message}}
        </div>
    </ng-container>
</div>
```

Esto es del email, lo mismo se hace con el password.

## Boton registrar y login

Creamos el boton registrar esto como **fotter** para que aparesca hasta el ultimo
```html
<ion-footer class="ion-text-center">
    <ion-button expand="full" fill="outline" shape="round" color="danger">Click para registrar</ion-button>
</ion-footer>
```

y el boton del login lo creamos justo antes que termine el **form** tiene que ser de tipo **submit** y creamos una condicion para que cuando los campos **email** y **password** se hayan rellenado correctamente se active el btn login.
```html
<ion-button expand="full" shape="round" color="danger" [disabled]="!loginForm.valid" type="submit">Login!
        </ion-button>
```

Hasta ahorra si rellenamos los campos correctamente se activa el btn login, pero a la hora de enviar datos sale un error, esto por que aun no tenemos la funcion que esta buscando **loginUser**.
```typescript
loginUser(credentials){
    console.log(credentials);
  }
```

Si vemos en la consola, ya manda las credenciales.

## Servicios

**Servicios** la parte mas divertida de la programacion, vamos a generar un servicio simulando que ya tenemos tanto el **email y password**.

Generamos el servicio dentro de la carpeta **service** y el servicio de va a llamar **authenticate**
```
ionic generate service services/authenticate
```

En el archivo **authenticate.service.ts** vamos a crear una funcion en donde vamos a retornar una **promesa** en cual nos va a indicar si los datos son correctos o incorrectos, esta funcion es justo despues del constructor
```typescript
loginUser(credential){
    return new Promise((accept, reject)=> {
    if(credential.email == 'abel@gmail.com' && credential.password == '001garcia'){
    accept('login correcto');
    } else {
    reject('login incorrecto');
    }
});
```

**importante: si hacemos una conexion con el backed es asi:**
```typescript
return fetch("url_del_servidor");
```

Despues de crear el **servicio** vamos a importarlo en nuestro componente de login
```typescript
import { AuthenticateService } from '../services/authenticate.service';
```

Lo declaramos en el constructor
```typescript
constructor( private _authService: AuthenticateService) {}
```

ahora vamos a declarar 2 variables **errorMessage** esta para cachar los errores a la hora de recibir el servicio, y **_navController** que es el que se va a encargar de redirigir al **home**, este ultimo se tiene que importar y declararlo en el **contructor**.
```typescript
import { NavController } from '@ionic/angular';
constructor(private  _navController: NavController) {}
```

Por ultimo en la funcion mandamos las credenciales al metodo **loginUser** que esta en el servicio y como respuesta, si es verdadera se redirige al  **home*
```typescript
loginUser(credentials){
    this._authService.loginUser(credentials).then(res => {
        this.errorMessage = '';
        this._navController.navigateForward('/home');
    });
}
```

*Hasta el momento al logearse de forma erronea nos muestra una advertencia en consola que el login es incorrecto, y si el login es correcto, nos redirige al home*

```
```
```
```
```