import { Component, OnInit } from '@angular/core';

import { AlertController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { LocalStorageService } from './services/local-storage.service';
import { SERVER_TRUST_MODE } from 'src/environments/environment';
import { HTTP } from '@ionic-native/http/ngx';

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
    private http: HTTP,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private alertController: AlertController,
    private authService: AuthService,
    private localStorage: LocalStorageService,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    const mode = SERVER_TRUST_MODE as 'nocheck' | 'default' | 'legacy' | 'pinned';
    this.http.setServerTrustMode(mode).then(() => {
      console.log(`Set server trust mode ${mode} successful`);
    }).catch((reason: any) => {
      console.log(`Set server trust mode ${mode} fails`, reason);
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
          handler: (blah) => {
            console.log('Logout canceled');
          }
        }, {
          text: 'Logout',
          handler: async () => {
            await this.authService.logout();
            await this.localStorage.clear(); // TODO: sync with server
            this.router.navigate([ LOGIN_PAGE_PATH ]);
          }
        }
      ]
    });

    await alert.present();
  }
}
