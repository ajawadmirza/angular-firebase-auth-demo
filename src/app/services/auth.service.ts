import { Injectable } from '@angular/core';
import { GoogleAuthProvider, OAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  constructor(
    public afAuth: AngularFireAuth,
    private http: HttpClient
  ) { }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new GoogleAuthProvider());
  }

  // Sign in with Microsoft
  MicrosoftAuth() {
    return this.AuthLogin(new OAuthProvider('microsoft.com'));
  }

  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result:any) => {
        result.user.getIdToken().then((tkn:any) => {
          this.http.post('http://localhost:9000/auth', {idToken: tkn}, {}).subscribe((res) => {
            console.log(res);
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
}