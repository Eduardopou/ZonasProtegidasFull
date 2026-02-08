import { Component, effect, inject, signal, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderPageComponent } from "./components/header-page/header-page";
import { LoginFormComponent } from './user/pages/login-form/login-form';
import { TranslateService } from '@ngx-translate/core';




@Component({
  selector: 'app-root',
  standalone: true,
  imports:
  [RouterOutlet,
  

  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})



export class App {
  constructor(private translate: TranslateService) {
    const saved = localStorage.getItem('lang') || 'es';
    this.translate.addLangs(['es', 'en']);
    this.translate.setDefaultLang('es');
    this.translate.use(saved);
  }
}