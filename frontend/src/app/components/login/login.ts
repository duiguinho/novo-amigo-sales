
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CadastroComponent } from '../cadastro/cadastro';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatDialogModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {

  nome_usuario: string = '';
  senha: string = '';

  constructor(private dialog: MatDialog) {}

  entrar() {
    if (!this.nome_usuario || !this.senha) {
      alert('Preencha o nome de usuário e a senha.');
      return;
    }

    // Depois conectaremos este método à API Laravel.
    console.log('Nome de usuário:', this.nome_usuario);
    console.log('Senha preenchida.');
  }

  abrirCadastro(event: Event) {
    event.preventDefault();

    this.dialog.closeAll();

    this.dialog.open(CadastroComponent);
  }

  
}