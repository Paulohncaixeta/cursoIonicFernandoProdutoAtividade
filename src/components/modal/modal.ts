import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { File } from '@ionic-native/file';
import { App } from 'ionic-angular';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';



/**
 * Generated class for the ModalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'modal',
  templateUrl: 'modal.html'
})
export class ModalComponent {

  public pinText: any
  public pinPath: any
  public arquivo: any
  public pinCriado: any
  public retorno: string

  constructor(public viewCtrl: ViewController,
              public navParams: NavParams,
              public toastCtrl: ToastController,
              public file: File,
              public app: App){

                this.pinPath = file.dataDirectory;
                this.arquivo = 'salvaPin.txt'
                this.pinCriado = navParams.get('pinText')
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

SalvarPin(){

    if(this.pinCriado){
      if(this.pinCriado === this.pinText){
        console.log('entrou1');
        this.alertaValidacao('Entrou!', 3500)
        this.viewCtrl.dismiss()
        let nav = this.app.getRootNav();
        nav.setRoot('ProdutoPage');
        } else {
        console.log('entrou2');
        this.alertaValidacao('O pin não é igual, realize o Login novamente', 3500)
        this.viewCtrl.dismiss()
      }
    } else {
        this.file.writeFile(this.pinPath, this.arquivo, this.pinText,{replace: true}).then((res) => {
        this.alertaValidacao('Pin criado com sucesso, utilize apenas o Pin no proximo login!', 3500)
        this.viewCtrl.dismiss()
        let nav = this.app.getRootNav();
        nav.setRoot('ProdutoPage');
    }).catch((err) => {
        this.alertaValidacao('Erro ao criar o PIN!', 3500);
    })
  }
}

fecharModal(){
    this.viewCtrl.dismiss()
  }
}
