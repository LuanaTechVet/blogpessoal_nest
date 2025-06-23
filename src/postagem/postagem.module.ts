import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postagem } from './entities/postagem.entity';
import { PostagemService } from './services/postagem.service';
import { PostagemController } from './controllers/postagem.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Postagem])],
  providers: [PostagemService], //lógica, regras de negócio, gerencia as crud da tb_postagens
  controllers: [PostagemController], //recebe as requisições http e delega o processamento para as services
  exports: [], //disponibiliza para outros módulos
})
export class PostagemModule {}
