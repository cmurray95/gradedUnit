import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from 'src/models/user.model';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tokenGetter } from '../app.module';

// Server response object, stores token and backend API responses
export interface ServerResponse {
  [x: string]: any;
  success: boolean;
  msg: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  // For Setting session token and user
  authToken: any;
  user: any;


  constructor(
    private http: HttpClient
    ) { }

  // Register new user
  public signUp(user: User): Observable<ServerResponse> {
    // Set HTTP header
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');

    // Send request
    return this.http.post<ServerResponse>('http://localhost:4000/users/signup', user, {headers}).pipe(map(res => res));
  }

  // Sign in user
  public signIn(user: User): Observable<ServerResponse> {
    // Set HTTP header
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');

    // Send request
    return this.http.post<ServerResponse>('http://localhost:4000/users/auth', user, {headers}).pipe(map(res => res));
  }

  // Start local session
  public startUserSession(token, user) {
    // Set session ID
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  // Delete user session and signout user
  public logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  // Get session token
  public getToken() {
    // Retrieve from local storage
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  // Retrieve profile
  public getProfile(): Observable<ServerResponse> {
    // Ensure session ID is set
    this.getToken();
     // Append headers, Authorization and content type
    const headers = new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization': this.authToken
     });

    console.log(headers);
     // Send request
    return this.http.get<ServerResponse>('http://localhost:4000/users/profile', {headers}).pipe(map(res => res));
  }

  // Check if user is logged in
  public loggedIn(){
    const helper = new JwtHelperService();
    const refreshToken = tokenGetter();
    // Check if user session token is in date
    return !helper.isTokenExpired(refreshToken);
  }
}
