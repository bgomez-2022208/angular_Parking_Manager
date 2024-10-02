import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from "../../../enviroments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiUserService {
  private apiUrl = environment.apiUsers;

  constructor(private http: HttpClient) { }

  createUser(userData: any): Observable<any> {
    const url = `${this.apiUrl}/auth/signup`;
    return this.http.post<any>(url, userData);
  }

  getUsers(): Observable<any[]> {
    const url = `${this.apiUrl}/users`;
    return this.http.get<any[]>(url);
  }

  getUserById(userId: string): Observable<any> {
    const url = `${this.apiUrl}/users/${userId}`;
    return this.http.get<any>(url);
  }

  updateUser(userId: string, userData: any): Observable<any> {
    const url = `${this.apiUrl}/users/${userId}`;
    return this.http.put<any>(url, userData);
  }

  deleteUser(userId: string): Observable<any> {
    const url = `${this.apiUrl}/users/${userId}`;
    return this.http.delete<any>(url);
  }
}
