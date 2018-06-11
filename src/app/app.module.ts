import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { File } from '@ionic-native/file';

import { CategoriaProvider } from '../providers/categoria/categoria';
import { DatabaseProvider } from '../providers/database/database';
import { ProdutoProvider } from '../providers/produto/produto';
import { SQLite } from '@ionic-native/sqlite';
import { LoginPage } from '../pages/login/login';
import { ModalComponent } from '../components/modal/modal';
import { Camera } from '@ionic-native/camera';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    ModalComponent

  ],
  providers: [
    StatusBar,
    SplashScreen,
    CategoriaProvider,
    DatabaseProvider,
    ProdutoProvider,
    SQLite,
    File,
    SQLite,
    Camera,
    BarcodeScanner,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
