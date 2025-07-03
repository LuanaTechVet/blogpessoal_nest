import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../services/auth.service';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private _usernameField: string;
  private _passwordField: string;

  constructor(private readonly authService: AuthService) {
    super();
    this._usernameField = 'usuario';
    this._passwordField = 'senha';
  }

  async validate(usuario: string, senha: string): Promise<any> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const validaUsuario = await this.authService.validateUser(usuario, senha); //validateUser(usuario, senha) da Classe AuthService, valida se o usuário existe e se a senha fornecida está correta. Se ambos forem validados, o método retorna um Objeto da Classe Usuario, sem o atributo senha (para garantir segurança e boas práticas), representando o usuário autenticado.
    if (!validaUsuario) {
      throw new UnauthorizedException('Usuário e/ou senha incorretos!');
    }
    return validaUsuario; //retorna os dados do usuário autenticado
  }
}
