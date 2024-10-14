import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, Observable, tap } from 'rxjs';
import { environment } from "../../environment";

export interface AuditData {
  auditId:string;
  entity: string;
  startDate: Date;
  description: string;
  operation: string;
  result: string;
  request: any;
  response: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuditoryService {

  constructor(private http: HttpClient) { }

  private apiUrl = environment.FARE_SERVICE_URL;

  getAuditory(size: number, page: number): Observable<any> {
    const url = `${this.apiUrl}/audith`;
    return this.http.get<any>(url, {
      params: {
        size: size.toString(),
        page: page.toString(),
      }
    }).pipe(
      tap(audits => console.log('Auditorías recibidas:',audits)),
      catchError(error => {
        console.error('Error al obtener las auditorías:', error);
        throw error;
      })
    );
  }

  getAuditoryById(id: string): Observable<AuditData> {
    const url = `${this.apiUrl}/audith/${id}`;
    return this.http.get<AuditData>(url);
  }

  getAuditoryByEntity(entity: string, size: number, page: number): Observable<any> {
    const url = `${this.apiUrl}/audith/entity/${entity}`;
    return this.http.get<any>(url, {
      params: {
        size: size.toString(),
        page: page.toString(),
      }
    }).pipe(
      tap(audits => console.log('Auditorías recibidas filtradas por entidad:', audits)),
      catchError(error => {
        console.error('Error al obtener auditorías filtradas por entidad:', error);
        throw error;
      })
    );
  }

  getAuditoryByDateRange(startDate: string, endDate: string, size: number, page: number): Observable<any> {
    const url = `${this.apiUrl}/audith/date-range`;
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
      tap(audits => console.log('Auditorías recibidas:', audits)),
      catchError(error => {
        console.error('Error al obtener las auditorías por rango de fechas:', error);
        throw error;
      })
    );
  }


}
