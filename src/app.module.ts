import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostagemModule } from './postagem/postagem.module'; //lógica
import { Postagem } from './postagem/entities/postagem.entity'; //estrutura da tabela
import { Tema } from './tema/entities/tema.entity';
import { TemaModule } from './tema/tema.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', //SGBD
      host: 'localhost', //endereço do db
      port: 3306, //porta padrão
      username: 'root',
      password: 'root',
      database: 'db_blogpessoal',
      entities: [Postagem, Tema], //tabelas, se não forem registradas aqui não serão criadas no db
      synchronize: true, //se é para modifiacar em tempo real ou não
    }),
    PostagemModule, //para garantir que os recursos do módulo de postagem, como a Entidade, Service e Controller, sejam registrados e possam ser utilizados pela aplicação
    TemaModule, //não for registrado no AppModule, não será possível criar um Relacionamento com as Classes Entidades deste Módulo
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

//Todas as Classes Entidade devem ser registradas no Módulo principal da aplicação (AppModule), caso contrário a Tabela não será criada no Banco de dados.
