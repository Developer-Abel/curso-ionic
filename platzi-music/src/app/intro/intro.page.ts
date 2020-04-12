import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';



@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
  slideOpts = {
    initialSlide: 1,
    slidesPerView: 1,
    centeredSlides: true,
    speed: 400
    
  }

  sliders = [
  {
    titulo: "Escucha tu musica",
    subtitulo: "EN CUALQUIER LUGAR",
    descripcion: "Los mejores álbumes, las mejores canciones. Escucha y comparte en cualquier momento, a todas horas.",
    icon:"play"
  },
  {
    titulo: "Dejate llevar por tu imaginación",
    subtitulo: "LIBERA TUS SENTIDOS",
    descripcion: "Crea tu playlist, y compartelas con tus amigos.",
    icon:"play"
  },
  {
    titulo: "En claro musica",
    subtitulo: "TU DESIDES QUE ESCUCHAR",
    descripcion: "Las mejores estaciones y los mejores podcast a tu alcance.",
    icon:"play"
  }
]

  constructor( private router: Router, private _storage: Storage) { }
  finish(){
    this._storage.set('YaVioElIntro', true); //inserta true al storage
    this.router.navigateByUrl('/home');
  }

  ngOnInit() {
  }

}
