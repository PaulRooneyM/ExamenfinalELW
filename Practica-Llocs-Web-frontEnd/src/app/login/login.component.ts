import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';


interface LoginUser {
  _id: string;
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private loginService = inject(LoginService);

  // Definición del formulario de inicio de sesión
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)])
  });

  userId = signal<string | null>(null);

  // Manejar el envío del formulario
  onSubmit() {
    const { username, password } = this.loginForm.value;

    if (username && password) {
      this.loginService.getUsers().subscribe(
        (users: LoginUser[]) => {

          const user = users.find(u => u.username === username && u.password === password);

          if (user) {
            console.log('Found user:', user);
            this.userId.set(user._id);
            localStorage.setItem('userId', user._id);

            alert("Inici de sessió correcte");

            window.location.reload();
          } else {
            console.error("Nom d'usuari o contrasenya no vàlids");
            alert("Nom d'usuari o contrasenya no vàlids");
          }
        },
        (error) => {
          console.error('Error fetching users:', error);
          alert("S'ha produït un error. Si us plau, torna-ho a provar més tard.");
        }
      );
    } else {
      alert("Introduïu el nom d'usuari i la contrasenya.");
    }
  }



}
