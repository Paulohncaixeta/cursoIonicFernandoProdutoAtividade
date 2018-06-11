import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { ModalComponent } from './../../components/modal/modal';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';




@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public pinText: any
  public pinPath: any
  public arquivo: any
  public pinCriado: any
  public retorno: string


  public loginForm: FormGroup;
  public resultado: String;
  

  constructor(public navCtrl: NavController, 
              public alertCtrl: AlertController,
              public Frb: FormBuilder,
              public ModalCtrl: ModalController,
              public toastCtrl: ToastController,
              public file: File) 
    {
      this.pinPath = file.dataDirectory;
      this.arquivo = 'salvaPin.txt'
      this.loginForm = Frb.group({
        matricula: [null, [Validators.required]],
        password:  [null, [Validators.required]],
      });
    }

    ionViewDidLoad() {
      this.file.readAsText(this.pinPath, this.arquivo).then((res)=>{
        let modalPin = this.ModalCtrl.create(ModalComponent, {pin: res})
        modalPin.present()
      }).catch((err)=> {
        this.alertaValidacao('Olá, Realize login e registre um novo pin', 3500)
      })
    }

    alertaValidacao(message: string, duration?: number) {
      let menssagem = this.toastCtrl.create({
        message: message,
        duration: duration,
        showCloseButton: true,
        closeButtonText: "Ok"
      });
      menssagem.present();
    }

  showAlert(message) {
    let alert = this.alertCtrl.create
    ({
      title: 'Atenção',
      subTitle: message,
      buttons: 
      ['ok']
    });
    alert.present();
  }

  onSubmit(values) {
    if (values.matricula === 'unipam' && values.password === '123') {
      let chamaModal= this.ModalCtrl.create(ModalComponent) 
      chamaModal.present()    
    } else { 
      let alert = this.alertCtrl.create({
        title: 'Atenção',
        subTitle: 'Deu errado',
        buttons: 
        [
          {
            text: 'Ok'
          }
        ]
      });
      alert.present();
      
    }
    
  }


}


