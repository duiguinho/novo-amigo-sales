
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CadastroComponent } from '../cadastro/cadastro';
import { AuthService } from '../../service/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatDialogModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  nome_usuario = '';
  senha = '';

  constructor(
    private dialog: MatDialog,
    private authService: AuthService
  ) {}

  entrar() {
    if (!this.nome_usuario.trim() || !this.senha) {
      alert('Preencha o nome de usuário e a senha.');
      return;
    }

    this.authService.login({
      nome_usuario: this.nome_usuario.trim(),
      senha: this.senha,
    }).subscribe({
      next: (resposta) => {
        localStorage.setItem('token', resposta.token);
        localStorage.setItem(
          'usuario',
          JSON.stringify(resposta.usuario)
        );

        alert(`Bem-vindo, ${resposta.usuario.nome_completo}!`);
        this.dialog.closeAll();
      },
      error: (erro) => {
        console.error('Erro no login:', erro);

        if (erro.status === 401) {
          alert('Nome de usuário ou senha incorretos.');
        } else {
          alert(
            'Não foi possível entrar. Verifique se o Laravel está funcionando.'
          );
        }
      },
    });
  }

  abrirCadastro(event: Event) {
    event.preventDefault();
    this.dialog.closeAll();

    this.dialog.open(CadastroComponent, {
      width: '400px',
      maxWidth: '95vw',
      maxHeight: '90vh',
      autoFocus: false,
      panelClass: 'login-dialog',
    });
  }
}
