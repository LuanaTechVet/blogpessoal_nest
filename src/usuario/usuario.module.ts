import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { AuthModule } from '../auth/auth.module';
import { UsuarioService } from './services/usuario.service';
import { UsuarioController } from './controllers/usuario.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario]), forwardRef(() => AuthModule)], //forwardRef(), para evitar o erro de Dependência Cíclica, porque AuthModule utilizará UsuarioModule e vice-versa
  providers: [UsuarioService],
  controllers: [UsuarioController],
  exports: [UsuarioService],
})
export class UsuarioModule {}
