import { Routes } from '@angular/router';
import { AddAnimal } from './admin/components/add-animal/add-animal';
import { LoginFormComponent } from './user/pages/login-form/login-form';
import { Home } from './pages/home/home';
import { RegisterForm } from './user/pages/register-form/register-form';
import { ProfileComponent } from './pages/profile/profile.component';

import { roleGuard } from './guards/role.guard'; 
import { AddAnimalsPageComponent } from './admin/pages/add-animals-page/add-animals-page.component';
import { PageControlPanelComponent } from './admin/pages/page-control-panel/page-control-panel.component';
import { HeaderPageComponent } from './components/header-page/header-page';
import { UserManagementPage } from './admin/pages/user-management-page/user-management-page';
import { Reserve } from './pages/sub/reserve/reserve';
import { EducationalSection } from './pages/sub/educational-section/educational-section';
import { EditAnimalComponent } from './admin/components/edit-animal-component/edit-animal/edit-animal';
import { ManageAnimalsComponent } from './admin/components/manage-animals/manage-animals';
import { ResearchManagementComponent } from './admin/pages/research-management/research-management.component';
import { AnimalDetail } from './pages/animal-detail/animal-detail';


export const routes: Routes = [

    // --- Ruta solo para ADMIN ---
    {
        //Ruta de formulario para agregar animales
        path: 'admin/add-animals-page-component/add-animal', 
        component: AddAnimal,
        canActivate: [roleGuard], 
        data: { roles: ['ROLE_ADMIN'] } 

    },
 

    {
        //Ruta de página para agregar animales
        path: 'admin/add-animals-page-component',
        component: AddAnimalsPageComponent,
        canActivate: [roleGuard],
        data: { roles: ['ROLE_ADMIN'] }
    },

    {
        //Ruta de panel de control de la página administrativa
        path: 'admin/page-control-panel-component',
        component: PageControlPanelComponent,
        canActivate: [roleGuard],
        data: { roles: ['ROLE_ADMIN'] }
    },

    {
        //Ruta de panel de control de la página administrativa
        path: 'admin/user-management-page',
        component: UserManagementPage,
        canActivate: [roleGuard],
        data: { roles: ['ROLE_ADMIN'] }
    },
    {
        path: 'admin/manage-animals-component/manage-animals',
        component: ManageAnimalsComponent,
        canActivate: [roleGuard],
        data: { roles: ['ROLE_ADMIN'] }
    },
    {
        path: 'admin/edit-animal/:id',
        component: EditAnimalComponent,
         canActivate: [roleGuard],
        data: { roles: ['ROLE_ADMIN'] }
      },
    {
        path: 'admin/research-management',
        component: ResearchManagementComponent,
        canActivate: [roleGuard],
        data: { roles: ['ROLE_ADMIN'] }
    },










    

    // --- Ruta solo para Usuarios (USER o ADMIN) ---
    {
        path: 'profile', 
        component: ProfileComponent,
        canActivate: [roleGuard], // <-- Aplicar el guard
        data: { roles: ['ROLE_USER', 'ROLE_ADMIN'] } // <-- Ambos roles pueden acceder
    },

    {path: 'login', component: LoginFormComponent},
    {path: '', component: Home},
    {path: 'register', component:RegisterForm},
    {path: 'zona/:id', component: Reserve },
    {path: 'educational-section', component: EducationalSection},
    {path: 'animal/:id', component: AnimalDetail},
];