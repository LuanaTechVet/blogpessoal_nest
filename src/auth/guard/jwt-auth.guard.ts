import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
//Essa Classe será utilizada em todas as Classes Controladoras que possuam endpoints protegidos, para redirecionar as Requisições para a Estratégia Jwt do Passport, ou seja,
// efetuar a validação do Token JWT enviado no cabeçalho da Requisição, antes de autorizar o acesso ao endpoint, mesmo que o usuário esteja autenticado
