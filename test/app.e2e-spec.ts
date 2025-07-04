/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('Testes dos Módulos Usuário e Auth (e2e)', () => {
  let app: INestApplication<App>;
  let token: any;
  let usuarioId: any;
  let temaId: any;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite', //guarda os objetos/ambiente para teste na memória
          database: ':memory:',
          entities: [__dirname + './../src/**/entities/*.entity.ts'],
          synchronize: true,
          dropSchema: true,
        }),
        AppModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('01 - Deve Cadastrar um novo Usuário', async () => {
    const resposta = await request(app.getHttpServer()) //request() que cria uma Requisição que será enviada para a aplicação, ao chamar um createNestApplication, criamos uma aplicação, e depois é inicianda com o app.init()
      .post('/usuarios/cadastrar') //Requisição será do tipo POST, através do Método post(), e enviará a Requisição para o endereço do endpoint Cadastrar Usuario
      .send({
        //Transforma os atributos num objeto da Classe Usuario, que será enviado no body da requisição
        nome: 'Root',
        usuario: 'root@root.com',
        senha: 'rootroot',
        foto: '-',
      })
      .expect(201); //Caso o HTTP Status da Resposta da Requisição seja 201, o Teste Passa. Caso seja outro Status, o Teste Falha

    usuarioId = resposta.body.id; //resposta.body.id, para extrair o Atributo id do Corpo da Resposta da Requisição.
  });

  it('02 - Não deve cadastrar um uduário duplicado', async () => {
    return await request(app.getHttpServer())
      .post('/usuarios/cadastrar')
      .send({
        nome: 'Root',
        usuario: 'root@root.com',
        senha: 'rootroot',
        foto: '-',
      })
      .expect(400);
  });

  it('03 - Deve autenticar o usuário (Login)', async () => {
    const resposta = await request(app.getHttpServer())
      .post('/usuarios/logar')
      .send({
        usuario: 'root@root.com',
        senha: 'rootroot',
      })
      .expect(200);

    token = resposta.body.token;
  });

  it('04 - Deve listar todos os usuários', async () => {
    return (
      request(app.getHttpServer()) //não foi criado uma const, utilizamos o return que executará e retornará a Resposta do Método request()
        .get('/usuarios/all')
        .set('Authorization', `${token}`) //Como o endpoint (/usuarios/all) está protegido pelo Token JWT, precisamos enviar o token de um usuário válido no cabeçalho da Requisição, através do Método set().
        // Como guardamos o token do usuário Root (criado no 1º teste e autenticado no 2º), na variável token, vamos enviar esta variável no parâmetro Authorization do Cabeçalho (Header) da Requisição
        .send({})
        .expect(200)
    );
  });

  it('05 - Deve atualizar um usuário', async () => {
    return request(app.getHttpServer())
      .put('/usuarios/atualizar')
      .set('Authorization', `${token}`)
      .send({
        id: usuarioId, //recebeu o id do usuário Root no 1º teste
        nome: 'Root Atualizado',
        usuario: 'root@root.com',
        senha: 'rootroot',
        foto: '-',
      })
      .expect(200)
      .then((resposta) => {
        expect('Root Atualizado').toEqual(resposta.body.nome); //método then(), da Biblioteca SuperTest, acessa e verifica se a alteração foi realmente efetuada. A resposta da Requisição será armazenada no Objeto resposta, criado na Arrow Function
      });
  });

  it('06 - Deve criar um novo tema', async () => {
    const resposta = await request(app.getHttpServer())
      .post('/temas')
      .set('Authorization', `${token}`)
      .send({
        descricao: 'novo tema',
      })
      .expect(201);

    temaId = resposta.body.id;
  });

  it('07 - Deve conseguir criar uma nova postagem', async () => {
    await request(app.getHttpServer())
      .post('/postagens')
      .set('Authorization', `${token}`)
      .send({
        titulo: 'titulo da postagem',
        texto: 'texto da postagem',
        tema: temaId,
        usuario: usuarioId,
      })
      .expect(201);
  });
});
