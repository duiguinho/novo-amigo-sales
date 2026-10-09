import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from '../login/login';

interface Sala {
  id: number;
  nome: string;
}

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormsModule, MatDialogModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css',
})
export class CadastroComponent {

  constructor(private dialog: MatDialog) {}

abrirLogin() {
  this.dialog.closeAll();

  this.dialog.open(LoginComponent, {
    width: '400px',
    maxWidth: '95vw',
    maxHeight: '90vh',
    autoFocus: false,
    panelClass: 'login-dialog'
  });
}

  nome_completo: string = '';
  nome_usuario: string = '';
  email: string = '';
  senha: string = '';
  confirmarSenha: string = '';
  sala_id: number | null = null;

  // Salas temporárias para montar e testar a interface.
  salas: Sala[] = [
    { id: 1, nome: '1º DS' },
    { id: 2, nome: '2º DS' },
    { id: 3, nome: '3º DS' },
    { id: 4, nome: '1º ADM' },
    { id: 5, nome: '2º ADM' },
    { id: 6, nome: '3º ADM' }
  ];

  mensagem: string = '';

  cadastrar() {
    this.mensagem = '';

    if (
      !this.nome_completo.trim() ||
      !this.nome_usuario.trim() ||
      !this.email.trim() ||
      !this.senha ||
      this.sala_id === null
    ) {
      this.mensagem = 'Preencha todos os campos.';
      return;
    }

    if (this.senha.length < 6) {
      this.mensagem = 'A senha deve ter pelo menos 6 caracteres.';
      return;
    }

    if (this.senha !== this.confirmarSenha) {
      this.mensagem = 'As senhas não coincidem.';
      return;
    }

    // Por enquanto, apenas verificamos os dados do formulário.
    // A integração com o Laravel será feita depois.
    console.log({
      nome_completo: this.nome_completo,
      nome_usuario: this.nome_usuario,
      email: this.email,
      sala_id: this.sala_id
    });

    this.mensagem = 'Formulário validado! O cadastro ainda não foi enviado.';
  }
}