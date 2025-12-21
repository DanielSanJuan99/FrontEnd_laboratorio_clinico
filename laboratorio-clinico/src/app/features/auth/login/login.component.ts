import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from '../../../services/auth.service'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup
  isLoading = false
  errorMessage: string | null = null

  constructor(private readonly fb: FormBuilder, private readonly router: Router, private readonly authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true
      this.errorMessage = null
      const credentials = this.loginForm.value;
      this.authService.login(credentials).subscribe({
        next: (response) => {
          console.log('Login exitoso', response);
          this.isLoading = false;
          this.router.navigate(['/usuarios']); 
        },
        error: (err) => {
          console.error('Error de login', err);
          this.isLoading = false;
          this.errorMessage = 'Credenciales incorrectas. Intenta nuevamente.';
        }
      });
    } else {
      this.loginForm.markAllAsTouched()
    }
  }
}
