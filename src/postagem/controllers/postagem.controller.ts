import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
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

  @Get('/:id') //mapea as requisições HTTP GET enviadas para o endpoint /postagens/:id. O :id no endpoint é um parâmetro de rota, que representa o identificador da postagem a ser recuperada.
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Postagem> {
    //@Param('id') para capturar o valor do parâmetro id enviado na URL da requisição e o insere como argumento no método findById()
    return this.postagemService.findById(id); //A Classe ParseIntPipe é utilizada para garantir que o valor de id seja tratado como um número inteiro
  }

  @Get('/titulo/:titulo')
  @HttpCode(HttpStatus.OK)
  findByAllTitulo(@Param('titulo') titulo: string): Promise<Postagem[]> {
    //novo método, findAllByTitulo foi criado na service
    //Por questões de boas práticas e legibilidade do código, a Variável de Caminho e o Parâmetro do Método devem possuir o mesmo nome
    return this.postagemService.findAllByTitulo(titulo);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED) //qualquer requisição POST enviada para esse endereço será tratada pelo Método create da classe controladora
  //o método é utilizado para criar novos registros no banco de dados, recebendo os dados no corpo da requisição
  create(@Body() postagem: Postagem): Promise<Postagem> {
    //Este decorador(@Body) acessa o Objeto postagem enviado no corpo da Requisição e insere no Objeto postagem (parâmetro) do Método create(@Body() postagem: Postagem)
    return this.postagemService.create(postagem);
  }
  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() postagem: Postagem): Promise<Postagem> {
    return this.postagemService.update(postagem);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT) //quando a Resposta da Requisição for positiva (o Objeto foi apagado no Banco de dados), será retornado o HTTP Status NO_CONTENT 🡪 204
  delete(@Param('id', ParseIntPipe) id: number) {
    //@Param('id'): Este decorator insere o valor enviado na variável de caminho id (:id), no parâmetro do Método delete(@Param('id', ParseIntPipe) id: number);
    return this.postagemService.delete(id);
  }
}
