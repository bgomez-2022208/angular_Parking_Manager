import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, tap } from 'rxjs';
import { environment } from "../../environment";

export interface FareData {
    auditId:string;
    name: string;
    startDate: Date;
    endDate: Date;
    price: number;
    status: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class FareService {

    constructor(private http: HttpClient) { }
    private apiUrl = environment.USER_SERVICE_URL;

    getAllFare(): Observable<any[]> {
        const url = `${this.apiUrl}/fare`;
        return this.http.get<any[]>(url);
    }
}