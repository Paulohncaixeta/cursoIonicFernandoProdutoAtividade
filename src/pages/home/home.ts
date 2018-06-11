import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  vinput: any;
  vkeyup: any;
  vkeypress: any;
  vkeydown: any;
  vkeyupEnter: any;
  vblur: any;
  vfocus: any;

  constructor(public navCtrl: NavController) {

  }

  public input(event: any) {
    console.log(event.target.value);
    this.vinput += event.target.value + ' | ';
  }

  public keydown(event: any) {
    console.log(event.target.value);
    this.vkeydown += event.target.value + ' | ';
  }

  public keypress(event: any) {
    console.log(event.target.value);
    this.vkeypress += event.target.value + ' | ';
  }

  public keyup(event: any) {
    console.log(event.target.value);
    this.vkeyup += event.target.value + ' | ';
  }

  public keyupEnter(event: any) {
    console.log(event.target.value);
    this.vkeyupEnter += event.target.value + ' | ';
  }

  public blur(event: any) {
    console.log(event.target.value);
    this.vblur += event.target.value + ' | ';
  }

  public focus(event: any) {
    console.log(event.target.value);
    this.vfocus += event.target.value + ' | ';
  }

  clear() {
    this.vinput = '';
    this.vkeyup = '';
    this.vkeypress = '';
    this.vkeydown = '';
    this.vkeyupEnter = '';
    this.vblur = '';
    this.vfocus = '';
  }

}
