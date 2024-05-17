import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NavegacionComponent } from '../navegacion/navegacion.component';
import { DataService } from '../services/data.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-pantalla3',
  standalone: true,
  imports: [NavegacionComponent, CommonModule, RouterLink, TranslateModule],
  templateUrl: './pantalla3.component.html',
  styleUrl: './pantalla3.component.css',
})
export class Pantalla3Component implements OnInit {
  pais: string;
  ciudad: string;
  presupuesto: number | null = null;
  clima: number = 0;
  presupuestoConvertido: number | null = null;
  tasaCambio: number | null = null;
  selectedCountryCode: string = '';
  loading: boolean = false;
  descripcionClima: string = '';
  velocidadViento: number = 0;
  humedad: number = 0;
  duracionSol: number = 0; // Ejemplo, ajustar según la API

  constructor(private router: Router, public dataService: DataService) {
    this.pais = this.dataService.selectedCountry;
    this.ciudad = this.dataService.selectedCity;
    this.presupuesto = this.dataService.presupuesto;
    this.presupuestoConvertido = this.dataService.presupuestoConvertido;
    this.tasaCambio = this.dataService.tasaCambio;
    this.selectedCountryCode = this.dataService.selectedCountryCode;
  }

  ngOnInit(): void {
    this.obtenerClima(this.ciudad, this.pais);
  }

  volverAPantalla1() {
    this.dataService.resetearValores();
    this.router.navigate(['/pantalla1']);
  }

  obtenerClima(ciudad: string, pais: string): void {
    this.loading = true; // Mostrar indicador de carga

    this.dataService.obtenerClima(ciudad, pais).subscribe(
      (data) => {
        this.clima = data.main.temp;
        this.descripcionClima = data.weather[0].description; // Extraer la descripción del clima
        this.velocidadViento = data.wind.speed; // Extraer la velocidad del viento
        this.humedad = data.main.humidity; // Extraer la humedad
        this.duracionSol = data.clouds.all; // Ajustar según la API
        this.loading = false; // Ocultar indicador de carga

        const consulta = {
          country: this.pais,
          city: this.ciudad,
          budget: this.presupuesto,
          convertedBudget: this.presupuestoConvertido,
          weather: this.clima,
          weatherDescription: this.descripcionClima, // Agregar la descripción del clima a la consulta
          tasa: this.tasaCambio,
        };

        this.dataService.guardarConsulta(consulta).subscribe(
          (response) => {
            console.log('Consulta guardada con éxito:', response);
          },
          (error) => {
            console.error('Error al guardar la consulta:', error);
          }
        );
      },
      (error) => {
        console.error('Error al obtener el clima:', error);
        this.loading = false; // Ocultar indicador de carga en caso de error
      }
    );
  }
}
