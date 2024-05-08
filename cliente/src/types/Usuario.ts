export interface Usuario {
  nombre: string;
  contraseña?: string;
}

export interface UsuarioID extends Usuario {
  _id: string;
}
