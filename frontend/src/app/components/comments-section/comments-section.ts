import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user/user.service';
import { Comment } from '../../models/comment.model';

@Component({
  selector: 'app-comments-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comments-section.html',
  styleUrls: ['./comments-section.css'],
})
export class CommentsSectionComponent implements OnChanges {
  // Contexto de la sección para filtrar comentarios
  @Input() sectionContext: string = 'general';

  // Servicios inyectados
  authService = inject(AuthService);
  private router = inject(Router);
  private userService = inject(UserService);

  comments: Comment[] = [];
  newCommentText: string = '';

  // Configuración visual dinámica de la sección
  sectionConfig = {
    title: 'Bitácora',
    placeholder: 'Escribe aquí...',
    tags: ['General']
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['sectionContext']) {
      this.updateConfig();
      this.loadComments();
    }
  }

  // Indica si el usuario está logueado
  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  // Redirige al login si el usuario no tiene sesión
  goToLogin() {
    this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url }});
  }

  updateConfig() {
    switch(this.sectionContext) {
      case 'animales':
        this.sectionConfig = { 
          title: '📍 Avistamientos y Reportes', 
          placeholder: '¿Qué especie avistaste hoy? Comparte detalles...',
          tags: ['Avistamiento', 'Huellas', 'Sonidos']
        };
        break;
      case 'investigacion':
        this.sectionConfig = { 
          title: '🧪 Diálogo Científico', 
          placeholder: 'Aporta datos o preguntas al proyecto...',
          tags: ['Metodología', 'Voluntariado', 'Datos']
        };
        break;
      case 'reglamento':
        this.sectionConfig = { 
          title: '⚖️ Consultas de Normativa', 
          placeholder: 'Dudas sobre permisos o áreas restringidas...',
          tags: ['Permiso', 'Incidente', 'Urgente']
        };
        break;
      default:
        this.sectionConfig = { 
          title: '💬 Bitácora de Visitantes', 
          placeholder: 'Comparte tu experiencia en la reserva...',
          tags: ['Opinión', 'Sugerencia']
        };
    }
  }

  addComment() {
    if (!this.newCommentText.trim()) return;
    
    // Simulación: Aquí llamarías a tu backend real (POST /comments)
    const newC: Comment = {
      id: Date.now(),
      userId: 0, // Tomar del token real
      userName: 'Explorador Actual', // Tomar del perfil
      userAvatar: 'assets/user.png',
      userRole: 'USER',
      content: this.newCommentText,
      date: 'Ahora mismo',
      likes: 0,
      context: this.sectionContext,
      tag: this.sectionConfig.tags[0]
    };
    
    this.comments.unshift(newC);
    this.newCommentText = '';
  }

  loadComments() {
    // MOCK DATA: Esto vendría de tu backend filtrado por 'sectionContext'
    this.comments = [
      {
        id: 1,
        userId: 10,
        userName: 'Guardaparque Juan',
        userAvatar: 'assets/user.png',
        userRole: 'ADMIN',
        content: 'Recordamos a los visitantes que el sendero norte cierra a las 18:00 hrs.',
        date: 'Hace 2 horas',
        likes: 15,
        context: 'general',
        tag: 'Aviso'
      },
      {
        id: 2,
        userId: 22,
        userName: 'Ana Sofía',
        userAvatar: 'assets/user.png',
        userRole: 'USER',
        content: '¡Increíble lugar! Vi un zorro gris cerca de la entrada.',
        date: 'Hace 5 horas',
        likes: 4,
        context: 'animales',
        tag: 'Avistamiento',
        adminReply: '¡Qué suerte Ana! Son difíciles de ver de día.'
      }
    ];
  }
}