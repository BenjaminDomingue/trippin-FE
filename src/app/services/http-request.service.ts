import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class HttpRequestService {
  headers = new HttpHeaders().set("Content-Type", "application/json");

  constructor(private readonly httpClient: HttpClient) {}

  get<TResponse>(url: string) {
    return this.httpClient.get<TResponse>(url).pipe();
  }

  patch<TResponse>(url: string) {
    return this.httpClient
      .patch<TResponse>(url, { headers: this.headers })
      .pipe();
  }

  put<TData, TResponse>(url: string, data: TData) {
    return this.httpClient
      .put<TResponse>(url, data, { headers: this.headers })
      .pipe();
  }

  post<TData, TResponse>(url: string, data: TData) {
    return this.httpClient
      .post<TResponse>(url, data, { headers: this.headers })
      .pipe();
  }
}
