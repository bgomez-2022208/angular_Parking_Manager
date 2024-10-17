import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, Observable, tap } from 'rxjs';
import { environment } from "../../environment";
import { Time } from '@angular/common';

export interface FareData {
    fareId:number;
    name: string;
    startTime: Time;
    endTime: Time;
    price: number;
    status: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class FareService {

    constructor(private http: HttpClient) { }
    private apiUrl = environment.FARE_SERVICE_URL;

  getAllFare(size: number, page: number): Observable<any[]> {
        const url = `${this.apiUrl}/fare`;
    return this.http.get<any>(url, {
      params: {
        size: size.toString(),
        page: page.toString(),
      }
    }).pipe(
      tap(fares => console.log('Tarifas recibidas:',fares)),
      catchError(error => {
        console.error('Error al obtener las tarifas:', error);
        throw error;
      })
    );
    }

  createFare ( fareData: any) : Observable<any> {
    const url = `${this.apiUrl}/fare/saveFare`;
    return this.http.post<any>(url, fareData);
  }

  getFareById(fareId: number): Observable<any> {
    const url = `${this.apiUrl}/fare/${fareId}`;
    return this.http.get<{ message: FareData }>(url).pipe(
      map(response => response.message) // Extraemos el 'message' que contiene FareData
    );
  }
  updateFare(fareId: number, fareData: any): Observable<any> {
    console.log('fareData for updeta',fareData)
    const url = `${this.apiUrl}/fare/updateFare/${fareId}`;
    return this.http.put<any>(url, fareData);
  }
/*
  disabledFare(status: boolean, fareId: number) {
    const body = { status }
    const url = `${this.apiUrl}/fare/updateFare/${fareId}`
    return this.http.patch<any>(url,body)
  }
*/
}
