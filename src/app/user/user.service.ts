import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { enviroment } from "../enviroment";

@Injectable({
    providedIn: 'root'
})

export class ApiUserService {

    constructor(private http: HttpClient) { }

    private apiUrl = enviroment.USER_SERVICE_URL

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
        return this.http.post<any>(url, data)
    }

    resetPassword(data: any): Observable<any> {
        const url = `${this.apiUrl}/auth/reset-password`
        return this.http.post<any>(url, data)
    }
}