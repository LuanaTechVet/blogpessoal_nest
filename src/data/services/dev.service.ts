import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Postagem } from '../../postagem/entities/postagem.entity';
import { Tema } from '../../tema/entities/tema.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';

@Injectable()
export class DevService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql', //SGBD
      host: 'localhost', //endereço do db
      port: 3306, //porta padrão
      username: 'root',
      password: 'root',
      database: 'db_blogpessoal',
      entities: [Postagem, Tema, Usuario], //tabelas, se não forem registradas aqui não serão criadas no db
      synchronize: true, //se é para modifiacar em tempo real ou não
    };
  }
}
