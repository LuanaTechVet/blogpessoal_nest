import { IsNotEmpty } from 'class-validator'; //pacote validation com seus decoradores (anotações?) para validação
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'; //pacote typeorm (biblioteca para conectar com o db)
import { Tema } from '../../tema/entities/tema.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_postagens' }) //criando a tabela e seus atributos
export class Postagem {
  @ApiProperty()
  @PrimaryGeneratedColumn() //decorator AUTO_INCREMENT PRIMARY KEY
  id: number;

  @ApiProperty()
  @IsNotEmpty() //não vazio, validação
  @Column({ length: 100, nullable: false }) // caso não adicione o decorador @Column (exceto para os atributos Chave Primária e Timestamp), o atributo não será inserido na estrutura da tabela
  titulo: string;

  @ApiProperty()
  @IsNotEmpty()
  @Column({ length: 1000, nullable: false }) //false=NOT NULL
  texto: string;

  @ApiProperty()
  @UpdateDateColumn()
  data: Date;

  @ApiProperty({ type: () => Tema }) //se não colocar o type, cria dependência circular.
  @ManyToOne(() => Tema, (tema) => tema.postagem, {
    //terá um Objeto da Classe Tema, (chamado tema) => que no modelo Relacional será a Chave Estrangeira na Tabela tb_postagens
    onDelete: 'CASCADE',
  })
  tema: Tema;
  //a Chave Estrangeira (temaId) foi criada na Tabela tb_postagens, no db_blogpessoal

  @ApiProperty({ type: () => Usuario })
  @ManyToOne(() => Usuario, (usuario) => usuario.postagem, {
    onDelete: 'CASCADE',
  })
  usuario: Usuario;
}
