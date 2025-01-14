import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { SignupService } from '../services/signup.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  @Output() signupSuccess = new EventEmitter<void>();

  // Definición del formulario de registro
  signupForm = new FormGroup({
    username: new FormControl('', { validators: [Validators.required, Validators.minLength(3)] }),
    password: new FormControl('', { validators: [Validators.required, Validators.minLength(3)] })
  });

  constructor(private signupService: SignupService) {}

  onSubmit() {
    console.log(this.signupForm.value);

    const { username, password } = this.signupForm.value;

    if (username && password) {
      this.signupService.signup(username, password).subscribe(
        (response) => {
          console.log(response);
          alert("T'has registrat correctament!");
        },
        (error) => {
          console.error('Signup failed:', error);
          if (error.status === 409) {
            alert("El nom d'usuari ja existeix. Si us plau, trieu-ne un altre.");
          } else {
            alert("S'ha produït un error durant la inscripció. Si us plau, torna-ho a provar.");
          }
        }
      );
    } else {
      console.error("Falta el nom d'usuari o la contrasenya");
    }
  }
}
