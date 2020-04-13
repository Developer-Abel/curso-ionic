import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
//se importa el servicio de autenticacion
import { AuthenticateService } from '../services/authenticate.service';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  validation_messages = {
    email: [
      {type: 'required', message: 'El email es requerido'},
      {type: 'pattern', message: 'ojo este no es un email valido'}
    ],
    password: [
      {type: 'required', message: 'El password es requerido'},
      {type: 'minlength', message: 'se requiere de minimo 5 letras'}
    ]
  };

  errorMessage = '';

  constructor(private _formBuilder: FormBuilder, private _authService: AuthenticateService,private  _navController: NavController ) { 
    this.loginForm = this._formBuilder.group({
      email: new FormControl('', 
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])
      ),
      password: new FormControl('',
        Validators.compose([
          Validators.required,
          Validators.minLength(5)
        ])
      )
    });
  }


  ngOnInit() {
  }

  loginUser(credentials){
    this._authService.loginUser(credentials).then(res => {
      this.errorMessage = '';
      this._navController.navigateForward('/home');
    });
    // console.log(credentials);
  }
}
