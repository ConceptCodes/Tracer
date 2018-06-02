import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, NavParams } from 'ionic-angular';
import { Login } from '../../models/login';
import { HomePage } from '../home/home';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  login = {} as Login;
  constructor(public toast: ToastController, public authCtrl:AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  }

  signin(login: Login){
    this.authCtrl.auth.signInWithEmailAndPassword(login.email,login.password).then((success) => {
      this.navCtrl.setRoot(HomePage);
    }).catch((err) => {
      this.presentToast(err.message);
    });
  }

 presentToast(msg: string) {
   this.toast.create({
     message: msg,
     duration: 3000,
     position: 'top'
   }).present();
 }
}
