import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, tap } from 'rxjs';
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

  private apiUrl = environment.USER_SERVICE_URL

  getAuditory(): Observable<any[]> {
    const url = `${this.apiUrl}/audith`;
    return this.http.get<any[]>(url);
  }

  getAuditoryById(id: string): Observable<AuditData> {
    const url = `${this.apiUrl}/audith/${id}`;
    return this.http.get<AuditData>(url);
  }
}