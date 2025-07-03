import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../constants/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // Configuração da Estratégia JWT
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //pacote ExtractJwt, que extrai o Token JWT do Cabeçalho da Requisição
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret, //informamos que a chave de assinatura do Token JWT está armazenada no arquivo constants.ts, na const jwtConstants, na propriedade secret. Lembre-se de que, em um ambiente de produção, essa chave deve ser codificada e/ou protegida por questões de segurança
    });
  }
  //função de hook que será chamada pelo Passport quando o Token JWT for validado com sucesso. O payload do Token JWT é passado como argumento para essa função, e você pode realizar qualquer lógica adicional necessária, como buscar informações adicionais do usuário no banco de dados ou verificar permissões.
  async validate(payload: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await payload;
  }
}
