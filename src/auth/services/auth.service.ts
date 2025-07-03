import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Bcrypt } from '../bcrypt/bcrypt';
import { UsuarioLogin } from '../entities/usuariologin.entity';
import { UsuarioService } from './../../usuario/services/usuario.service';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService, //Serviço responsável pela geração do Token JWT
    private bcrypt: Bcrypt, //responsável por verificar se o atributo senha do objeto da classe UsuarioLogin (senha não criptografada) corresponde ao atributo senha do objeto da classe Usuario (senha criptografada) armazenado no banco de dados.
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const buscaUsuario = await this.usuarioService.findByUsuario(username);

    if (!buscaUsuario)
      throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);

    const matchPassword = await this.bcrypt.compararSenhas(
      //O método retornará true (Match) se as senhas forem iguais.
      password,
      buscaUsuario.senha,
    );

    if (buscaUsuario && matchPassword) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { senha, ...resposta } = buscaUsuario;
      return resposta;
    }

    return null;
  }

  async login(usuarioLogin: UsuarioLogin) {
    //responsável por receber as credenciais do usuário e enviá-las ao Passport para autenticar (fazer login) e validar o usuário na aplicação
    //sem a autenticação, não será possível gerar o Token JWT nem obter acesso aos endpoints protegidos
    const payload = { sub: usuarioLogin.usuario }; //Payload (dados do usuário, data e hora de criação e expiração do Token

    const buscaUsuario = await this.usuarioService.findByUsuario(
      usuarioLogin.usuario,
    );

    return {
      id: buscaUsuario?.id,
      nome: buscaUsuario?.nome,
      usuario: usuarioLogin.usuario,
      senha: '',
      foto: buscaUsuario?.foto,
      token: `Bearer ${this.jwtService.sign(payload)}`, //espaço em branco entre a palavra "Bearer" e a parte codificada do Token JWT é obrigatório!, caso contrário, o Token JWT não será validado
    };
  }
}
