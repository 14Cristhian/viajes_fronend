# ViajesAppFrontend

Este proyecto fue generado con [Angular CLI](https://github.com/angular/angular-cli) versión 17.3.7.

## Servidor de Desarrollo

Ejecuta `ng serve` para iniciar un servidor de desarrollo. Navega a `http://localhost:4200/`. La aplicación se recargará automáticamente si cambias alguno de los archivos fuente.

## Generación de Código

Ejecuta `ng generate component component-name` para generar un nuevo componente. También puedes usar `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Compilación

Ejecuta `ng build` para compilar el proyecto. Los artefactos de construcción se almacenarán en el directorio `dist/`.

## Ejecutar Pruebas Unitarias

Ejecuta `ng test` para ejecutar las pruebas unitarias a través de [Karma](https://karma-runner.github.io).

## Ejecutar Pruebas de Extremo a Extremo

Ejecuta `ng e2e` para ejecutar las pruebas de extremo a extremo a través de una plataforma de tu elección. Para usar este comando, primero debes agregar un paquete que implemente capacidades de prueba de extremo a extremo.

## Más Ayuda

Para obtener más ayuda sobre Angular CLI usa `ng help` o visita la [página de Angular CLI Overview and Command Reference](https://angular.io/cli).

## Explicación del Código

### Servicio de Datos (`data.service.ts`)

```typescript
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DataService {
  selectedCountry: string = "";
  selectedCountryCode: string = "";
  selectedCity: string = "";
  presupuesto: number | null = null;
  presupuestoConvertido: number | null = null;
  tasaCambio: number | null = null;

  constructor(private http: HttpClient) {}

  resetearValores() {
    this.selectedCountry = "";
    this.selectedCountryCode = "";
    this.selectedCity = "";
    this.presupuesto = null;
    this.presupuestoConvertido = null;
    this.tasaCambio = null;
  }

  hasSelectedDataForPantalla2(): boolean {
    return !!this.selectedCountry && !!this.selectedCity && !!this.presupuesto;
  }

  guardarConsulta(consulta: any): Observable<any> {
    return this.http.post("http://127.0.0.1:8000/consultas", consulta);
  }

  obtenerClima(ciudad: string, pais: string): Observable<any> {
    const body = { city: ciudad, country: pais };
    return this.http.post("http://127.0.0.1:8000/get-weather", body);
  }

  convertirMoneda(countryCode: string, amount: number): Observable<any> {
    const body = { to: countryCode, amount: amount };
    return this.http.post("http://127.0.0.1:8000/convert-currency", body);
  }
}
```

Este servicio maneja la lógica para obtener datos del clima, convertir moneda, y guardar consultas en el backend. También gestiona los valores seleccionados por el usuario para el país, ciudad, y presupuesto.

## Servicio de Consultas (consulta-service.service.ts)

```typescript
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ConsultaServiceService {
  constructor(private http: HttpClient) {}

  getData(): Observable<any[]> {
    return this.http.get<any[]>("http://localhost:8000/api");
  }

  eliminarRegistro(id: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:8000/consultas/${id}`);
  }
}
```

Este servicio maneja la obtención y eliminación de registros de consultas desde el backend.
