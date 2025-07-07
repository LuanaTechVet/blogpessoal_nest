import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class ProdService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      url: process.env.DATABASE_URL, //url define o endereço do servidor, a porta, o usuário, a senha e o nome do Banco de dados. Essa url será enviada pelo Render, por isso ela está passada por meio de uma variável de ambiente
      logging: false,
      dropSchema: false,
      ssl: {
        rejectUnauthorized: false,
      },
      synchronize: true,
      autoLoadEntities: true, //ele procura todas Classes Entidade Registradas na Classe AppModule e cria as respectivas tabelas no Banco de dados na nuvem
    };
  }
}
