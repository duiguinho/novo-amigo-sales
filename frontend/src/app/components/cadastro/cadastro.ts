import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from '../login/login';
import { CadastroModel } from '../../models/cadastro';

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

  cadastro: CadastroModel = {
    nome_completo: '',
    nome_usuario: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    sala_id: null
  };

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
      !this.cadastro.nome_completo.trim() ||
      !this.cadastro.nome_usuario.trim() ||
      !this.cadastro.email.trim() ||
      !this.cadastro.senha ||
      this.cadastro.sala_id === null
    ) {
      this.mensagem = 'Preencha todos os campos.';
      return;
    }

    if (this.cadastro.senha.length < 6) {
      this.mensagem = 'A senha deve ter pelo menos 6 caracteres.';
      return;
    }

    if (this.cadastro.senha !== this.cadastro.confirmarSenha) {
      this.mensagem = 'As senhas não coincidem.';
      return;
    }

    console.log({
      nome_completo: this.cadastro.nome_completo,
      nome_usuario: this.cadastro.nome_usuario,
      email: this.cadastro.email,
      sala_id: this.cadastro.sala_id
    });

    this.mensagem =
      'Formulário validado! O cadastro ainda não foi enviado.';
  }
}