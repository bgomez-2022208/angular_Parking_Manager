import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from 'rxjs';
import { environment } from "../../environment";

@Injectable({
  providedIn: 'root'
})

export class ApiUserService {

  constructor(private http: HttpClient) { }

  private apiUrl = environment.USER_SERVICE_URL
  private dataUrl = environment.FARE_SERVICE_URL

  forgotPassword(email: string): Observable<any> {
    const url = `${this.apiUrl}/auth/forgot-password/${email}`
    return this.http.post<any>(url, {})
  }

  register(data: any): Observable<any> {
    const url = `${this.apiUrl}/auth/signup`
    return this.http.post<any>(url, data)
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token')
    return !!token
  }

  getUserRoles(): string[] {
    const token = localStorage.getItem('token')
    if (token) {
      const decodedToken: any = this.decodeJWT(token)
      return decodedToken.roles || []
    }
    return []
  }

  private decodeJWT(token: string): any {
    const payload = token.split('.')[1]
    const decodedPayload = atob(payload)
    return JSON.parse(decodedPayload)
  }

  // Verificar roles
  hasRole(requiredRoles: string[]): boolean {
    const userRoles = this.getUserRoles()
    return requiredRoles.some(role => userRoles.includes(role))
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

  logout() {
    localStorage.removeItem('token')
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

  userDeleteStatus(status: boolean, userId: number | undefined, dpi: number, profileId: number): Observable<any> {
    if (userId === undefined) {
      throw new Error('El userId es requerido para actualizar el estado del usuario');
    }
    const body = { status, dpi, profileId };
    const url = `${this.apiUrl}/users/${userId}`;

    return this.http.patch<any>(url, body);
  }

  //Profile
  getProfile(profileId: number): Observable<any> {
    const url = `${this.apiUrl}/profiles/${profileId}`;
    return this.http.get<any>(url)
  }

  getProfilesUser(): Observable<any> {
    const url = `${this.apiUrl}/users/profiles`;
    return this.http.get<any>(url);
  }

  getProfiles(page: number, size: number): Observable<any> {
    const url = `${this.apiUrl}/profiles?page=${page}&size=${size}`;
    return this.http.get<any>(url);
  }

  addProfile(profile: any, roles: string): Observable<any> {
    const url = `${this.apiUrl}/profiles/addProfileRoles?roleIds=${roles}`
    return this.http.post<any>(url, profile)
  }

  deleteProfile(profileId: number): Observable<any> {
    const url = `${this.apiUrl}/profiles/detailProfile/${profileId}`;
    return this.http.delete<any>(url);
  }

  updateProfile(data: any, profileId: number, roles: string): Observable<any> {
    const url = `${this.apiUrl}/profiles/update/${profileId}/roles?roleIds=${roles}`
    return this.http.put<any>(url, data)
  }

  disableProfile(status: boolean, profileId: number): Observable<any> {
    const body = { status }
    const url = `${this.apiUrl}/profiles/patchProfile/${profileId}`
    return this.http.patch<any>(url, body)
  }

  searchProfile(description: string, page: number, size: number): Observable<any> {
    const url = `${this.apiUrl}/profiles?description=${description}&page=${page}&size=${size}`
    return this.http.get<any>(url)
  }

  //Parking
  getParkingsRegister(): Observable<any> {
    const url = `${this.dataUrl}/parkings/active`;
    return this.http.get<any>(url);
  }

  getParkings(page: number, size: number): Observable<any> {
    const url = `${this.dataUrl}/parkings/namesAndStatus?page=${page}&size=${size}`
    return this.http.get<any>(url)
  }

  getParking(id: number): Observable<any> {
    const url = `${this.dataUrl}/parkings/${id}`
    return this.http.get<any>(url)
  }

  newParking(data: any): Observable<any> {
    const url = `${this.dataUrl}/parkings/saveParking`
    return this.http.post<any>(url, data)
  }

  updateParking(data: any, parkingId: number): Observable<any> {
    const url = `${this.dataUrl}/parkings/parkingUpdate/${parkingId}`
    return this.http.put<any>(url, data)
  }

  disableParking(status: boolean, parkingId: number): Observable<any> {
    const body = { status }
    const url = `${this.dataUrl}/parkings/parkingPatch/${parkingId}`
    return this.http.patch<any>(url, body)
  }

  searchParking(name: string, page: number, size: number): Observable<any> {
    const url = `${this.dataUrl}/parkings/search?name=${name}&page=${page}&size=${size}`
    return this.http.get<any>(url)
  }

  //Register
  createParking(parkingData: { plate: string; parkingId: string }): Observable<any> {
    return this.http.post<any>(`${this.dataUrl}/registers/entrada`, parkingData);
  }


  salidaParking(placaData: { plate: string }): Observable<any> {
    const plate = placaData.plate;
    const url = `${this.dataUrl}/registers/salida/${plate}`;
    return this.http.put<any>(url, placaData);
  }



}
