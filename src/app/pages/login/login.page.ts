import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

const HOME_PAGE_PATH = 'home';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private authService: AuthService,
    private toastController: ToastController,
    private router: Router) { }

  ngOnInit() {
    this.authService.getAccessToken().then((accessToken: string) => {
      if (accessToken) {
        this.router.navigate([ HOME_PAGE_PATH ]);
      } else {
        console.log('Not authenticated');
      }
    }).catch((reason: any) => {
      console.log('Not authenticated', reason);
    });
  }

  async loginWithMikrobot() {
    console.log(' :: Sign In with Mikrobot Account :: ');
    try {
      const accessToken: string | null = await this.authService.getAccessToken();
      if (accessToken === null) {
        await this.authService.login();
      }
      this.router.navigate([ HOME_PAGE_PATH ]);
    } catch (error) {
      console.log('loginWithMikrobot Error', error);
      const toast = await this.toastController.create({
        message: 'Something was wrong',
        duration: 2000
      });
      toast.present();
    }
  }

}
