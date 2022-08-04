import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private serverUrl: string = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  getUsers() {
    const dataUrl: string = `${this.serverUrl}/users`
    return this.http.get<any>(dataUrl)
    .pipe(map((res: any) => {
      return res;
    }))
  }

  getUser(id: string) {
    const dataUrl: string = `${this.serverUrl}/users/${id}`
    return this.http.get<any>(dataUrl)
    .pipe(map((res: any) => {
      return res;
    }))
  }

  postUser(data: any) {
    const dataUrl: string = `${this.serverUrl}/users`
    return this.http.post<any>(dataUrl, data)
    .pipe(map((res: any) => {
      return res;
    }))
  }

  updateUser(data: any, id: number) {
    const dataUrl: string = `${this.serverUrl}/users/${id}`
    return this.http.put<any>(dataUrl, data)
    .pipe(map((res: any) => {
      return res;
    }))
  }

  deleteUser(id: number) {
    const dataUrl: string = `${this.serverUrl}/users/${id}`
    return this.http.delete<any>(dataUrl)
    .pipe(map((res: any) => {
      return res;
    }))
  }
}
