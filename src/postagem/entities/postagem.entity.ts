import { IsNotEmpty } from 'class-validator'; //pacote validation com seus decoradores (anotações?) para validação
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'; //pacote typeorm (biblioteca para conectar com o db)
import { Tema } from '../../tema/entities/tema.entity';

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

  @ManyToOne(() => Tema, (tema) => tema.postagem, {
    //terá um Objeto da Classe Tema, (chamado tema) => que no modelo Relacional será a Chave Estrangeira na Tabela tb_postagens
    onDelete: 'CASCADE',
  })
  tema: Tema;
  //a Chave Estrangeira (temaId) foi criada na Tabela tb_postagens, no db_blogpessoal
}
