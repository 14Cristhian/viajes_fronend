import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  selectedCountry: string = '';
  selectedCountryCode: string = '';
  selectedCity: string = '';
  presupuesto: number | null = null;
  presupuestoConvertido: number | null = null;
  tasaCambio: number | null = null;

  resetearValores() {
    this.selectedCountry = '';
    this.selectedCountryCode = '';
    this.selectedCity = '';
    this.presupuesto = null;
    this.presupuestoConvertido = null;
    this.tasaCambio = null;
  }

  hasSelectedDataForPantalla2(): boolean {
    return !!this.selectedCountry && !!this.selectedCity && !!this.presupuesto;
  }

  constructor(private http: HttpClient) {}

  guardarConsulta(consulta: any): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/consultas', consulta);
  }

  obtenerClima(ciudad: string, pais: string): Observable<any> {
    const body = { city: ciudad, country: pais };
    return this.http.post('http://127.0.0.1:8000/get-weather', body);
  }

  convertirMoneda(countryCode: string, amount: number): Observable<any> {
    const body = { to: countryCode, amount: amount };
    return this.http.post('http://127.0.0.1:8000/convert-currency', body);
  }
}
