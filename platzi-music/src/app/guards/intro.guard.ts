import { Injectable } from '@angular/core';
// se importa CanActivate
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';



@Injectable({
  providedIn: 'root'
})
export class IntroGuard implements CanActivate {
  constructor( private _storage: Storage, private _router: Router){}
  async canActivate() {
    const YaVioElIntro = await this._storage.get('YaVioElIntro');

    if(YaVioElIntro) {
      return true;
    } else {
      this._router.navigateByUrl('/intro');
    }
  }
  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }

}
