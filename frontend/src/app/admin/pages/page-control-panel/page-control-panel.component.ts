import { Component, inject, OnInit } from '@angular/core';
import { HeaderPageComponent } from "../../../components/header-page/header-page";
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { BackButton } from "../../../components/back-button/back-button";
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-page-control-panel',
  imports: [HeaderPageComponent, RouterLink, CommonModule, BackButton, TranslateModule],
  templateUrl: './page-control-panel.component.html',
  styleUrl: './page-control-panel.component.css'
})
export class PageControlPanelComponent implements OnInit {
  
  authService = inject(AuthService);
  router = inject(Router);
  constructor(private translate: TranslateService) {}
  isLoggedIn = this.authService.isLoggedIn;

  // Datos de ejemplo para las tarjetas de estadísticas (KPIs).
  stats = [
    { labelKey: 'ADMIN.CONTROL_PANEL.STATS.USERS', value: 142, icon: '👥', change: '+12%' },
    { labelKey: 'ADMIN.CONTROL_PANEL.STATS.SPECIES', value: 85, icon: '🐾', change: '+3' },
    { labelKey: 'ADMIN.CONTROL_PANEL.STATS.ALERTS', value: 2, icon: '⚠️', changeKey: 'ADMIN.CONTROL_PANEL.STATS.ALERTS_CHANGE', isWarning: true },
    { labelKey: 'ADMIN.CONTROL_PANEL.STATS.REQUESTS', value: 5, icon: '📥', change: '-1' }
  ];

  weather = {
    temp: '24°C',
    locationKey: 'ADMIN.CONTROL_PANEL.WEATHER.LOCATION'
  };

  // Mockup para el feed de actividad reciente.
  recentActivity = [
    { user: 'Admin', actionKey: 'ADMIN.CONTROL_PANEL.ACTIVITY.ACTIONS.UPDATED_RULES', targetKey: 'ADMIN.CONTROL_PANEL.ACTIVITY.TARGETS.SIERRA', timeKey: 'ADMIN.CONTROL_PANEL.ACTIVITY.TIME.MINUTES', timeValue: 10 },
    { user: 'Carlos Ruiz', actionKey: 'ADMIN.CONTROL_PANEL.ACTIVITY.ACTIONS.REGISTERED_USER', targetKey: 'ADMIN.CONTROL_PANEL.ACTIVITY.TARGETS.SYSTEM', timeKey: 'ADMIN.CONTROL_PANEL.ACTIVITY.TIME.MINUTES', timeValue: 45 },
    { user: 'Sistema', actionKey: 'ADMIN.CONTROL_PANEL.ACTIVITY.ACTIONS.CLIMATE_ALERT', targetKey: 'ADMIN.CONTROL_PANEL.ACTIVITY.TARGETS.NORTH_ZONE', timeKey: 'ADMIN.CONTROL_PANEL.ACTIVITY.TIME.HOURS', timeValue: 2 }
  ];

  ngOnInit(): void {
    // TODO: Conectar a servicios reales para obtener datos de 'stats' y 'recentActivity'.
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  goToQuickAction() {
    // Lógica para el botón de acción rápida.
    alert(this.translate.instant('ADMIN.CONTROL_PANEL.ACTIVITY.QUICK_ACTION_ALERT'));
  }
}