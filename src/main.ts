import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Blog Pessoal da Luana')
    .setDescription(
      'API REST desenvolvida com NestJS e TypeScript para fins de estudo. O projeto aplica boas práticas de arquitetura, validação de dados, camadas de segurança e integração com banco de dados.',
    )
    .setContact(
      'Luana Silva',
      'https://github.com/LuanaTechVet',
      'luanaap2702@gmail.com',
    )
    .setVersion('1.0')
    .addBearerAuth() //para acessar os recursos do Swagger será necessário efetuar o Login e Enviar o Token JWT
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

  process.env.TZ = '-03:00';

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
