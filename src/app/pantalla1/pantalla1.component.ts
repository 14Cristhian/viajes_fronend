import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavegacionComponent } from '../navegacion/navegacion.component';
import { DataService } from '../services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-pantalla1',
  standalone: true,
  imports: [FormsModule, CommonModule, NavegacionComponent, TranslateModule],

  templateUrl: './pantalla1.component.html',
  styleUrl: './pantalla1.component.css',
})
export class Pantalla1Component {
  countries = [
    {
      name: 'Inglaterra',
      currency: 'GBP',
      cities: ['Londres', 'Manchester', 'Liverpool', 'Birmingham'],
    },
    {
      name: 'Japón',
      currency: 'JPY',
      cities: ['Tokio', 'Osaka', 'Kioto', 'Hiroshima'],
    },
    {
      name: 'India',
      currency: 'INR',
      cities: ['Delhi', 'Mumbai', 'Bangalore', 'Kolkata'],
    },
    {
      name: 'Dinamarca',
      currency: 'DKK',
      cities: ['Copenhague', 'Aarhus', 'Odense', 'Aalborg'],
    },
  ];

  mostrarError = false;

  constructor(private router: Router, public dataService: DataService) {}

  onCountryChange() {
    this.mostrarError = false;
  }

  onCityChange() {
    this.mostrarError = !this.dataService.selectedCity;
  }

  getCities(): string[] {
    const country = this.countries.find(
      (country) => country.name === this.dataService.selectedCountry
    );
    return country ? country.cities : [];
  }

  irSiguiente() {
    if (!this.dataService.selectedCountry || !this.dataService.selectedCity) {
      this.mostrarError = true;
      return;
    }

    const selectedCountry = this.countries.find(
      (country) => country.name === this.dataService.selectedCountry
    );
    if (selectedCountry) {
      this.dataService.selectedCountryCode = selectedCountry.currency; // Guardar el código de moneda del país seleccionado
    }

    this.router.navigate(['/pantalla2']);
  }
}
