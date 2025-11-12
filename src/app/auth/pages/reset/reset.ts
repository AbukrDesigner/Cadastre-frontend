import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-reset',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './reset.html',
  styleUrl: './reset.scss',
})
export class Reset {
  togglePassword(inputId: string, iconId: string) {
    const passwordInput = document.getElementById(inputId) as HTMLInputElement | null;
    const eyeIcon = document.getElementById(iconId);

    if (!passwordInput || !eyeIcon) {
      return;
    }

    const isHidden = passwordInput.type === 'password';
    passwordInput.type = isHidden ? 'text' : 'password';
    eyeIcon.classList.toggle('bi-eye', !isHidden);
    eyeIcon.classList.toggle('bi-eye-slash', isHidden);
  }
}
