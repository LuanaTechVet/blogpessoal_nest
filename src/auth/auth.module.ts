import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsuarioModule } from '../usuario/usuario.module';
import { Bcrypt } from './bcrypt/bcrypt';
import { jwtConstants } from './constants/constants';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    forwardRef(() => UsuarioModule), //para validar o usuário e a senha no banco de dados durante o processo de autenticação (login)
    PassportModule, //para implementar o pacote Passport e suas Strategies
    JwtModule.register({
      secret: jwtConstants.secret, //.register configura a propriedade secret (chave de assinatura do token JWT) com o valor da propriedade secret da constante jwtConstants
      signOptions: { expiresIn: '1h' }, //opções do processo de criação do token
    }),
  ],
  controllers: [AuthController], //Desta forma o endpoint de autenticação ficará disponível para receber Requisições HTTP
  providers: [Bcrypt, AuthService, LocalStrategy, JwtStrategy], //Bcrypt para comparar a senha do usuário com a senha criptografada armazenada no DB, os outros dois, responsáveis por gerar o token JWT e autenticar o usuário respectivamente.
  // JwtStrategy é responsável por validar o token JWT enviado no cabeçalho da Requisição, antes de autorizar o acesso ao endpoint protegido.
  exports: [Bcrypt],
})
export class AuthModule {}
