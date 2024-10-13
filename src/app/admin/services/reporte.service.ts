import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, Observable, tap } from 'rxjs';
import { environment } from "../../environment";

export interface ReporteData{
  registerId:number;
  name: string;
  car: string;
  plate: string;
  status: boolean;
  startDate: Date;
  endDate: Date;
  parkingId: number;
  fareId: number;
  total: number
}

@Injectable({
  providedIn: 'root'
})

export class ReportService {
  constructor(private http: HttpClient) { }
  private apiUrl = environment.FARE_SERVICE_URL;

  getReporters(size: number, page: number): Observable<any> {
    const url = `${this.apiUrl}/registers`;
    return this.http.get<any>(url, {
      params: {
        size: size.toString(),
        page: page.toString(),
      }
    }).pipe(
      tap(audits => console.log('Registros recibidas:',audits)),
      catchError(error => {
        console.error('Error al obtener los registros:', error);
        throw error;
      })
    );
  }

  getRegisterById(id: string): Observable<ReporteData> {
    const url = `${this.apiUrl}/registers/${id}`;
    return this.http.get<ReporteData>(url);
  }
}
