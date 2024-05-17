import { Injectable } from '@angular/core';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { DataService } from '../services/data.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  constructor(private router: Router, private dataService: DataService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (
      state.url === '/pantalla2' &&
      (!this.dataService.selectedCountry || !this.dataService.selectedCity)
    ) {
      this.router.navigate(['/pantalla1']);
      return false;
    }
    if (
      state.url === '/pantalla3' &&
      (!this.dataService.hasSelectedDataForPantalla2() ||
        !this.dataService.presupuesto)
    ) {
      this.router.navigate(['/pantalla2']);
      return false;
    }
    return true;
  }
}
