import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostagemModule } from './postagem/postagem.module'; //lógica
import { Postagem } from './postagem/entities/postagem.entity'; //estrutura da tabela

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', //SGBD
      host: 'localhost', //endereço do db
      port: 3306, //porta padrão
      username: 'root',
      password: 'root',
      database: 'db_blogpessoal',
      entities: [Postagem], //tabelas
      synchronize: true, //se é para modifiacar em tempo real ou não
    }),
    PostagemModule, //para garantir que os recursos do módulo de postagem, como a Entidade, Service e Controller, sejam registrados e possam ser utilizados pela aplicação
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

//Todas as Classes Entidade devem ser registradas no Módulo principal da aplicação (AppModule), caso contrário a Tabela não será criada no Banco de dados.
