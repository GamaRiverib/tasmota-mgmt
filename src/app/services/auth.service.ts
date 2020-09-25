import { Injectable } from '@angular/core';
import { HTTP, HTTPResponse } from '@ionic-native/http/ngx';
import { WebIntent } from '@ionic-native/web-intent/ngx';
import { CLIENT_ID, REDIRECT_URI, CLIENT_SECRET, OAUTH_URL } from 'src/environments/environment';
import { AuthData, LocalStorageService } from './local-storage.service';

interface AuthCodeParams {
  client_id: string;
  redirect_uri: string;
  state: string;
  response_type: string;
  code_challenge: string;
  code_challenge_method: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private accessToken: string | null = null;

  private refreshTokenTimeout: any;

  constructor(
    private localStorage: LocalStorageService,
    private webIntent: WebIntent,
    private http: HTTP) {
      this.getAccessToken();
      this.checkRefreshToken();
    }

  private getQueryString(params: any): string {
    return Object.keys(params)
      .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
      .join('&');
  }

  private getRandomString(len?: number, charset?: string): string {
    const l = len || 8;
    const c = charset || 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let s = '';
    for (let i = 0, n = c.length; i < l; ++i) {
        s += c.charAt(Math.floor(Math.random() * n));
    }
    return s;
  }

  private getAuthCodeParams(): AuthCodeParams {
    // tslint:disable-next-line: variable-name
    const client_id = CLIENT_ID;
    // tslint:disable-next-line: variable-name
    const redirect_uri = REDIRECT_URI;
    const state = this.getRandomString(10);
    // tslint:disable-next-line: variable-name
    const response_type = 'code';
    // tslint:disable-next-line: variable-name
    const code_challenge = this.getRandomString(32);
    // tslint:disable-next-line: variable-name
    const code_challenge_method = 'plain';
    return {
      client_id,
      redirect_uri,
      state,
      response_type,
      code_challenge,
      code_challenge_method
    };
  }

  private async subscribeToWebIntent(state: string, codeVerifier: string): Promise<void> {
    try {
      const win = window as any;
      if (!win.plugins || !win.plugins.intentShim) {
        console.log('WebIntent plugin not found');
        throw new Error('Something was wrong with authentication process. Code 01');
      }

      const timeOut = setTimeout(() => {
        console.log('Timeout');
        throw new Error('Something was wrong with authentication process. Code 03');
      }, 120000);

      const webIntent = win.plugins.intentShim;
      return new Promise<void>((resolve, reject) => {
        webIntent.onIntent((intent: any) => {
          console.log({intent});
          if (!intent || !intent.data) {
            console.log('Web Intent Fails');
            clearTimeout(timeOut);
            return reject('Something was wrong with authentication process. Code 04');
          }
          const data: string = '?' + intent.data.split('?')[1];
          const params = new URLSearchParams(data);
          if (params) {
            const responseState: string = params.get('state');
            const code: string = params.get('code');
            console.log({ code, state });
            if (state !== responseState) {
              console.log('Response state not match');
              clearTimeout(timeOut);
              return reject('Something was wrong with authentication process. Code 05');
            }
            this.localStorage.removeAuthData();
            const authData: AuthData = {
              code_verifier: codeVerifier,
              authorization_code: code,
              refresh_at: -1
            };
            this.localStorage.setAuthData(authData);
            // tslint:disable-next-line: variable-name
            const client_id = CLIENT_ID;
            // tslint:disable-next-line: variable-name
            const client_secret = CLIENT_SECRET;
            // tslint:disable-next-line: variable-name
            const grant_type = 'authorization_code';
            // tslint:disable-next-line: variable-name
            const code_verifier = codeVerifier;
            const body = {
              client_id,
              client_secret,
              grant_type,
              code,
              code_verifier
            };
            const url = OAUTH_URL;
            const headers = {};
            this.http.setDataSerializer('json');
            // this.http.clearCookies();
            this.http.post(url, body, headers)
              .then((response: HTTPResponse) => {
                if (response.status !== 200) {
                  console.log('Bad response', response.status, response.error);
                  clearTimeout(timeOut);
                  return reject('Something was wrong with authentication process. Code 06');
                }
                if (!response.data || response.data === '') {
                  console.log('Body response empty', response.error, response.data);
                  clearTimeout(timeOut);
                  return reject('Something was wrong with authentication process. Code 07');
                }
                const json = JSON.parse(response.data);
                authData.access_token = json.access_token;
                authData.refresh_token = json.refresh_token;
                authData.expires_in = json.expires_in || 600;
                authData.refresh_at = Date.now() + authData.expires_in * 1000;
                // TODO: refresh token
                this.refreshTokenTimeout = setTimeout(this.refreshToken.bind(this), authData.expires_in * 1000);
                this.localStorage.setAuthData(authData);
                clearTimeout(timeOut);
                console.log({ auth: authData });
                return resolve();
              })
              .catch((reason: any) => {
                console.log('HTTP Request Error', reason);
                return reject('Something was wrong with authentication process. Code 08');
            });
          }
        }, (error: any) => {
          console.log('WebIntent plugin fails', error);
          clearTimeout(timeOut);
          return reject('Something was wrong with authentication process. Code 02');
        });
      });
    } catch (error) {
      console.log('ERROR', error);
      throw new Error('Something was wrong with authentication process. Code 00');
    }
  }

  private async checkRefreshToken(): Promise<void> {
    const authData: AuthData = await this.localStorage.getAuthData();
    if (authData && authData.refresh_at) {
      if (Date.now() > authData.refresh_at) {
        this.refreshToken();
      } else if (!this.refreshTokenTimeout) {
        const wait = authData.refresh_at - Date.now();
        this.refreshTokenTimeout = setTimeout(this.refreshToken.bind(this), wait);
      }
    }
  }

  async getAccessToken(): Promise<string | null> {
    if (this.accessToken === null) {
      try {
        const authData: AuthData = await this.localStorage.getAuthData();
        if (!authData || !authData.access_token) {
          return null;
        }
        this.accessToken = authData.access_token;
      } catch (error) {
        return null;
      }
    }
    return this.accessToken;
  }

  getAccessTokenSync(): string | null {
    return this.accessToken;
  }

  async refreshToken(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const authData: AuthData = await this.localStorage.getAuthData();
        if (!authData || !authData.access_token || !authData.refresh_token) {
          throw Error('User not authenticated');
        }
        clearTimeout(this.refreshTokenTimeout);
        this.refreshTokenTimeout = null;
        // tslint:disable-next-line: variable-name
        const client_id = CLIENT_ID;
        // tslint:disable-next-line: variable-name
        const client_secret = CLIENT_SECRET;
        // tslint:disable-next-line: variable-name
        const grant_type = 'refresh_token';
        const refresh_token = authData.refresh_token;
        const body = {
          client_id,
          client_secret,
          grant_type,
          refresh_token
        };
        const url = OAUTH_URL;
        const headers = {};
        this.http.setDataSerializer('json');
        // this.http.clearCookies();
        this.http.post(url, body, headers)
          .then((response: HTTPResponse) => {
            if (response.status !== 200) {
              console.log('Bad response', response.status, response.error);
              return reject('Something was wrong with refresh token process. Code 01');
            }
            if (!response.data || response.data === '') {
              console.log('Body response empty', response.error, response.data);
              return reject('Something was wrong with refresh token process. Code 02');
            }
            const json = JSON.parse(response.data);
            this.accessToken = json.access_token;
            authData.access_token = json.access_token;
            authData.expires_in = json.expires_in || 600;
            authData.refresh_at = Date.now() + authData.expires_in * 1000;
            this.refreshTokenTimeout = setTimeout(this.refreshToken.bind(this), authData.expires_in * 1000) ;
            this.localStorage.setAuthData(authData);
            console.log({ auth: authData });
            return resolve();
          })
          .catch((reason: any) => {
            console.log('HTTP Request Error', reason);
            return reject('Something was wrong with refresh token process. Code 03');
        });
      } catch (error) {
        return reject('Something was wrong with refresh token process. Code 00');
      }
    });
  }

  async login(): Promise<void> {
    const params: AuthCodeParams = this.getAuthCodeParams();
    const queryString = this.getQueryString(params);
    const url = `${OAUTH_URL}?${queryString}`;
    const action = this.webIntent.ACTION_VIEW;
    const options = { action, url };
    try {
      console.log('Starting Web Intent Activity');
      await this.webIntent.startActivity(options);
      const state = params.state;
      const codeVerifier = params.code_challenge;
      return this.subscribeToWebIntent(state, codeVerifier);
    } catch (error) {
      console.log('Error open url', error);
      throw Error('Error opening the url');
    }
  }

  async logout(): Promise<void> {
    this.localStorage.removeAuthData();
    clearTimeout(this.refreshTokenTimeout);
    this.accessToken = null;
  }
}
