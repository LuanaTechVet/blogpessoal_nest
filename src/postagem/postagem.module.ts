import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postagem } from './entities/postagem.entity';
import { PostagemService } from './services/postagem.service';
import { PostagemController } from './controllers/postagem.controller';
import { TemaModule } from '../tema/tema.module';

@Module({
  imports: [TypeOrmModule.forFeature([Postagem]), TemaModule], //TemaModule da acesso as Classes do Módulo Tema, para checarmos se o Tema existe antes de persistir a Postagem
  providers: [PostagemService], //lógica, regras de negócio, gerencia as crud da tb_postagens
  controllers: [PostagemController], //recebe as requisições http e delega o processamento para as services
  exports: [], //disponibiliza para outros módulos
})
export class PostagemModule {}
