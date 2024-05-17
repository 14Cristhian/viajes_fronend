import { Component } from '@angular/core';
import { ConsultaServiceService } from '../services/consulta-service.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-consulta',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.css',
})
export class ConsultaComponent {
  data: any[] = [];
  loading: boolean = true;

  constructor(private dataService: ConsultaServiceService) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.loading = true;
    this.dataService.getData().subscribe((data) => {
      this.data = data;
      this.loading = false;
    });
  }

  eliminarRegistro(id: number) {
    this.dataService.eliminarRegistro(id).subscribe(() => {
      this.getData(); // Recargar los datos después de la eliminación
    });
  }
}
