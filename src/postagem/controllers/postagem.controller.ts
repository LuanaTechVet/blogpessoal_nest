import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { Postagem } from '../entities/postagem.entity';
import { PostagemService } from '../services/postagem.service';

@Controller('/postagens') //URL (Endpoint): Define o caminho da requisição,todas as requisições enviadas para o caminho /postagens serão direcionadas para a classe controladora PostagemController
export class PostagemController {
  constructor(private readonly postagemService: PostagemService) {}

  @Get()
  @HttpCode(HttpStatus.OK) //códigos de sucesso
  findAll(): Promise<Postagem[]> {
    return this.postagemService.findAll();
  }
}
