import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, tap } from 'rxjs';
import { environment } from "../../environment";

@Injectable({
    providedIn: 'root'
  })
  export class ProfileserviceService {}