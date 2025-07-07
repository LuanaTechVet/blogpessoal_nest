import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { PostagemModule } from './postagem/postagem.module'; //lógica
import { TemaModule } from './tema/tema.module';
import { UsuarioModule } from './usuario/usuario.module';
import { ConfigModule } from '@nestjs/config';
import { ProdService } from './data/services/prod.service';

@Module({
  imports: [
    ConfigModule.forRoot(), //registra o provedor ConfigService, que fornece os métodos necessários para ler variáveis de Ambiente e Classes de Configuração
    TypeOrmModule.forRootAsync({
      //fornece diversas maneiras de lidar com a configuração assíncrona
      useClass: ProdService, //qual Classe de Serviço de Configuração vamos utilizar( ProdService para nuvem e DevService localmente)
      imports: [ConfigModule], //para permitir que a configuração dinâmica funcione
    }),

    PostagemModule, //para garantir que os recursos do módulo de postagem, como a Entidade, Service e Controller, sejam registrados e possam ser utilizados pela aplicação
    TemaModule, //não for registrado no AppModule, não será possível criar um Relacionamento com as Classes Entidades deste Módulo
    AuthModule,
    UsuarioModule,
  ],
  controllers: [AppController], //Se a Classe AppController, não for registrada no Módulo principal da aplicação (AppModule), o endpoint do Swagger não ficará disponível
  providers: [],
})
export class AppModule {}

//Todas as Classes Entidade devem ser registradas no Módulo principal da aplicação (AppModule), caso contrário a Tabela não será criada no Banco de dados.
