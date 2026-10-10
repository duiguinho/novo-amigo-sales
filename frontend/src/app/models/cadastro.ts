export interface CadastroModel {
  nome_completo: string;
  nome_usuario: string;
  email: string;
  senha: string;
  confirmarSenha: string;
  sala_id: number | null;
}