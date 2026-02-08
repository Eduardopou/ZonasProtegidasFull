import { Component, inject } from '@angular/core';
import { HeaderPageComponent } from "../../../components/header-page/header-page";
import { AddAnimal } from "../../components/add-animal/add-animal";
import { AuthService } from "../../../services/auth.service";
import { Router, RouterLink } from '@angular/router';
import { BackButton } from "../../../components/back-button/back-button";
import { ManageAnimalsComponent } from "../../components/manage-animals/manage-animals";

@Component({
  selector: 'app-add-animals-page',
  standalone: true,
  imports: [HeaderPageComponent, AddAnimal, BackButton, ManageAnimalsComponent],
  templateUrl: './add-animals-page.component.html',
  styleUrl: './add-animals-page.component.css'
})
export class AddAnimalsPageComponent {
  authService = inject(AuthService);
  router = inject(Router);

  isLoggedIn = this.authService.isLoggedIn;

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}


