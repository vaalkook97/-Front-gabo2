import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from './app.tokens';

export interface Empleado {
  clave: string;
  nombre: string;
  direccion: string;
  telefono: string;
  correo: string;
  version: number;
}

export interface EmpleadoCreateRequest {
  nombre: string;
  direccion: string;
  telefono: string;
  correo: string;
}

interface EmpleadoPageResponse {
  content: Empleado[];
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

@Injectable({ providedIn: 'root' })
export class EmpleadosService {
  private readonly empleadosUrl: string;

  constructor(
    private readonly http: HttpClient,
    @Inject(API_BASE_URL) apiBaseUrl: string
  ) {
    this.empleadosUrl = `${apiBaseUrl}/empleados`;
  }

  listar(): Observable<EmpleadoPageResponse> {
    return this.http.get<EmpleadoPageResponse>(this.empleadosUrl);
  }

  crear(payload: EmpleadoCreateRequest): Observable<Empleado> {
    return this.http.post<Empleado>(this.empleadosUrl, payload);
  }
}
