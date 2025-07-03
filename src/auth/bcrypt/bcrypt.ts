import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable() //para marcar a classe como um Serviço, permitindo que ela seja injetada em outras classes através da Injeção de Dependências do NestJS
export class Bcrypt {
  async criptografarSenha(senha: string): Promise<string> {
    const saltos: number = 10;
    return await bcrypt.hash(senha, saltos);
  }

  async compararSenhas(
    senhaDigitada: string,
    senhaBanco: string,
  ): Promise<boolean> {
    return await bcrypt.compare(senhaDigitada, senhaBanco);
  }
}
