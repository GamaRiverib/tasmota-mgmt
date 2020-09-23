import { Component, OnInit } from '@angular/core';

import { AlertController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

const LOGIN_PAGE_PATH = 'login';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Home',
      url: 'home',
      icon: 'grid'
    },
    {
      title: 'Houses',
      url: 'houses',
      icon: 'home'
    },
    {
      title: 'Devices',
      url: 'devices',
      icon: 'hardware-chip'
    },
    {
      title: 'About',
      url: 'about',
      icon: 'information-circle'
    },
    {
      title: 'Account',
      url: 'account',
      icon: 'person'
    }
  ];
  public labels = [];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {

  }

  async logout(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Logout',
      message: 'Are you sure?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Logout canceled');
          }
        }, {
          text: 'Logout',
          handler: async () => {
            await this.authService.logout();
            this.router.navigate([ LOGIN_PAGE_PATH ]);
          }
        }
      ]
    });

    await alert.present();
  }
}
