import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CadastroComponent } from '../cadastro/cadastro';
import { LoginModel } from '../../models/login';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatDialogModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {

  login: LoginModel = {
    nome_usuario: '',
    senha: ''
  };

  constructor(private dialog: MatDialog) {}

  entrar() {
    if (!this.login.nome_usuario.trim() || !this.login.senha) {
      alert('Preencha o nome de usuário e a senha.');
      return;
    }

    // Depois conectaremos este método à API Laravel.
    console.log('Dados de login:', this.login);
  }

  abrirCadastro(event: Event) {
    event.preventDefault();

    this.dialog.closeAll();

    this.dialog.open(CadastroComponent, {
      width: '400px',
      maxWidth: '95vw',
      maxHeight: '90vh',
      autoFocus: false,
      panelClass: 'login-dialog'
    });
  }
}