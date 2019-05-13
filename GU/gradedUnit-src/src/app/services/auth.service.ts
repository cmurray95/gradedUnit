import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from 'src/models/user.model';
import { Observable } from 'rxjs';

export interface ServerResponse {
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


  constructor(private http: HttpClient) { }

  public signUp(user: User): Observable<ServerResponse>{
    // Set HTTP header
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');

    // Send request
    return this.http.post<ServerResponse>('http://localhost:4000/users/signup', user, {headers: headers}).pipe(map(res => res));
  }
}
