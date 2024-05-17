import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavegacionComponent } from '../navegacion/navegacion.component';
import { DataService } from '../services/data.service';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-pantalla2',
  standalone: true,
  imports: [FormsModule, CommonModule, NavegacionComponent, TranslateModule],
  templateUrl: './pantalla2.component.html',
  styleUrl: './pantalla2.component.css',
})
export class Pantalla2Component {
  presupuesto: number | null = null;
  tasaCambio: number | null = null;
  constructor(private router: Router, public dataService: DataService) {
    this.presupuesto = this.dataService.presupuesto;
    this.tasaCambio = this.dataService.tasaCambio;
  }

  mostrarError = false;

  onBudgetChange(event: any) {
    this.dataService.presupuesto = event.target.value;
    if (!this.dataService.presupuesto) {
      this.mostrarError = true; // Mostrar el mensaje de error si no se ha seleccionado una ciudad
    } else {
      this.mostrarError = false; // Ocultar el mensaje de error si se ha seleccionado una ciudad
    }
  }

  irAtras() {
    this.router.navigate(['/pantalla1']);
  }

  irSiguiente() {
    if (!this.dataService.presupuesto) {
      this.mostrarError = true;
      return;
    }

    const countryCode = this.dataService.selectedCountryCode;
    const amount = this.dataService.presupuesto;
    this.dataService.convertirMoneda(countryCode, amount).subscribe(
      (data) => {
        this.dataService.presupuestoConvertido = data.result;
        this.dataService.tasaCambio = data.info.rate;
        this.router.navigate(['/pantalla3']);
      },
      (error) => {
        console.error(error);
        this.router.navigate(['/pantalla3']);
        this.mostrarError = true;
      }
    );
  }
}
