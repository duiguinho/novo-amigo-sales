export interface Usuario {
  id: number;
  nome_completo: string;
  nome_usuario: string;
  senha: string;
  nivel_acesso: string;
  sala_id: number | null;
  created_at: string;
  updated_at: string;
}