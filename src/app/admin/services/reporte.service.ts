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
  private apiURL2 = environment.USER_SERVICE_URL

  getReporters(size: number, page: number): Observable<any> {
    const url = `${this.apiUrl}/registers`;
    return this.http.get<any>(url, {
      params: {
        size: size.toString(),
        page: page.toString(),
      }
    }).pipe(
      tap(content => console.log('Registros recibidas:',content)),
      catchError(error => {
        console.error('Error al obtener los registros:', error);
        throw error;
      })
    );
  }

  getParkings(): Observable<any> {
    const url = `${this.apiUrl}/parkings/namesAndStatus`;
    return this.http.get<any>(url);
  }

  getRegisterById(id: string): Observable<ReporteData> {
    const url = `${this.apiUrl}/registers/${id}`;
    return this.http.get<ReporteData>(url);
  }

  getReportsByParkingAndDateRange(parkingId: number, startDate: string, endDate: string): Observable<any> {
    const url = `${this.apiUrl}/registers/report/${parkingId}/${startDate}/${endDate}`;
    console.log(this.http.get<any>(url));
    return this.http.get<any>(url);
  }
/*
  getReportsByDateRange(startDate: string, endDate: string, size: number, page: number): Observable<any> {
    const url = `${this.apiUrl}/report/date-range`;
    const body = {
      startDate: startDate,
      endDate: endDate
    };

    return this.http.post<any>(url, body, {
      params: {
        size: size.toString(),
        page: page.toString()
      }
    }).pipe(
      tap(reports => console.log('Auditorías recibidas:', reports)),
      catchError(error => {
        console.error('Error al obtener los reportes por rango de fechas:', error);
        throw error;
      })
    );
  }*/
/*
  postGeneratePDF(id:string,startDate:any,endDate:any){
    const url = `${this.apiUrl}/registers/generatePDF/${id}/${startDate}/${}`
  }*/
}
