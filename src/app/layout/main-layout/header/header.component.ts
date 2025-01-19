import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { AuthService } from '../../../core/auth/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  authService = inject(AuthService);
  section!: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.getSection();
  }

  logout() {
    this.authService.logout();
  }

  private getSection() {
    const currentRoute = this.getActiveRoute(this.activatedRoute);
    this.section = currentRoute.snapshot.data['section'] || 'Nombre sección';
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.getActiveRoute(this.activatedRoute)),
        map((route) => route.snapshot.data['section'] || 'Generic name')
      )
      .subscribe((section) => (this.section = section));
  }

  private getActiveRoute(route: ActivatedRoute): ActivatedRoute {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }
}
