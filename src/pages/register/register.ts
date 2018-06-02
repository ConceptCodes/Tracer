import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, NavParams } from 'ionic-angular';
import { Login } from '../../models/login';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  login = {} as Login;
  constructor(public toast: ToastController, public authCtrl:AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  }

  presentToast(msg:string){
    this.toast.create({
      message: msg,
      duration: 3000,
      position: 'top'
    }).present();
  }

  register(login: Login){
    this.authCtrl.auth.createUserWithEmailAndPassword(login.email,login.password).then((success) =>{
      this.authCtrl.auth.signInWithEmailAndPassword(login.email,login.password).then((success) => {
        this.navCtrl.setRoot(HomePage);
      }).catch((err)=> {
        this.presentToast(err.message);
      });
    }).catch((err)=>{
      this.presentToast(err.message);
    });
  }
}
