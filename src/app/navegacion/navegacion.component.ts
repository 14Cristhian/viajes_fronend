import { Component, Output, EventEmitter } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-navegacion',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './navegacion.component.html',
})
export class NavegacionComponent {
  @Output() irAtras = new EventEmitter<void>();
  @Output() irSiguiente = new EventEmitter<void>();
}
