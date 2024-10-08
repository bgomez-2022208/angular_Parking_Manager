import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, tap } from 'rxjs';
import { environment } from "../../environment";

@Injectable({
    providedIn: 'root'
})

export class ApiUserService {

    constructor(private http: HttpClient) { }

    private apiUrl = environment.USER_SERVICE_URL

    forgotPassword(email: string): Observable<any> {
        const url = `${this.apiUrl}/auth/forgot-password/${email}`
        return this.http.post<any>(url, {})
    }

    register(data: any): Observable<any> {
        const url = `${this.apiUrl}/auth/signup`
        return this.http.post<any>(url, data)
    }

    login(data: any): Observable<any> {
        const url = `${this.apiUrl}/auth/login`
        return this.http.post<any>(url, data).pipe(
            tap(response => {
                if (response && response.token) {
                    localStorage.setItem('token', response.token)
                }
            })
        )
    }

    resetPassword(data: any): Observable<any> {
        const url = `${this.apiUrl}/auth/reset-password`
        return this.http.post<any>(url, data)
    }

    //ADMIN API - URL

    createUser(userData: any): Observable<any> {
        const url = `${this.apiUrl}/users/signup`;
        return this.http.post<any>(url, userData);
    }

    getUsers(): Observable<any[]> {
        const url = `${this.apiUrl}/users`;
        return this.http.get<any[]>(url);
    }

    getUserById(userId: number): Observable<any> {
        const url = `${this.apiUrl}/users/${userId}`;
        return this.http.get<any>(url);
    }

    updateUser(userId: number, userData: any): Observable<any> {
        const url = `${this.apiUrl}/users/${userId}`;
        return this.http.put<any>(url, userData);
    }

    deleteUser(userId: string): Observable<any> {
        const url = `${this.apiUrl}/users/${userId}`;
        return this.http.delete<any>(url);
    }

  getProfiles(): Observable<any> {
    const url = `${this.apiUrl}/profiles`;
    return this.http.get<any>(url);
  }
}
