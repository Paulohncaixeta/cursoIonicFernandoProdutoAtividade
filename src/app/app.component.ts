import { DatabaseProvider } from './../providers/database/database';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage:any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, dbProvider: DatabaseProvider) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      dbProvider.createDatabase()
        .then(() => {

        })
        .catch(()=> {
          
        })
    });

    this.pages = [
      {title: 'Home', component: HomePage},
      {title: 'Categoria', component: 'CategoriaPage'},
      {title: 'Produto', component: 'ProdutoPage'},
      {title: 'Fechar', component: 'Fechar'}
    ]
  }

  openPage(page) {
    if (page.title == 'Fechar') {
      this.platform.exitApp();
    } else {
      this.nav.setRoot(page.component);
    }
  }

}

