import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, tap, throwError} from 'rxjs';
import { environment } from "../../../enviroments/environment";
import {User} from "../model/user.model";

@Injectable({
  providedIn: 'root'
})
export class ApiUserService {

  private apiUrl = environment.apiUsers;
  constructor(private http: HttpClient) { }

  createUser(userData: any): Observable<any> {
    const url = `${this.apiUrl}/users/signup`;
    return this.http.post<any>(url, userData);
  }

  getUsers(size:number, page:number, email:string): Observable<User[]> {
    const url = `${this.apiUrl}/users`;
    return this.http.get<User[]>(url, {params: {
        size: size,
        page: page,
        searchQuery:email
      }}).pipe(

      tap(users => console.log('Usuarios recibidos:', users)),
      catchError(error => {
        console.error('Error al obtener los usuarios:', error);
        throw error;
      })
    );
  }

  getUserById(userId: number): Observable<any> {
    const url = `${this.apiUrl}/users/${userId}`;
    return this.http.get<any>(url);
  }

  updateUser(userId: string, userData: any): Observable<any> {
    const url = `${this.apiUrl}/users/${userId}`;
    return this.http.put<any>(url, userData);
  }

  deleteUser(userId: number): Observable<any> {
    const url = `${this.apiUrl}/users/${userId}`;
    return this.http.delete<any>(url);
  }

}
