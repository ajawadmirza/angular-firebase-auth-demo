import { Injectable } from '@angular/core';
import { GoogleAuthProvider, OAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  constructor(
    public afAuth: AngularFireAuth
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
      .then((result) => {
        console.log('You have been successfully logged in!');
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}