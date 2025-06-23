import { IsNotEmpty } from 'class-validator'; //pacote validation com seus decoradores (anotações?) para validação
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'; //pacote typeorm (biblioteca para conectar com o db)

@Entity({ name: 'tb_postagens' }) //criando a tabela e seus atributos
export class Postagem {
  @PrimaryGeneratedColumn() //decorator AUTO_INCREMENT PRIMARY KEY
  id: number;

  @IsNotEmpty() //não vazio, validação
  @Column({ length: 100, nullable: false }) // caso não adicione o decorador @Column (exceto para os atributos Chave Primária e Timestamp), o atributo não será inserido na estrutura da tabela
  titulo: string;

  @IsNotEmpty()
  @Column({ length: 1000, nullable: false }) //false=NOT NULL
  texto: string;

  @UpdateDateColumn()
  data: Date;
}
