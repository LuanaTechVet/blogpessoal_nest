import { Postagem } from './../entities/postagem.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';

@Injectable()
export class PostagemService {
  constructor(
    @InjectRepository(Postagem)
    private postagemRepository: Repository<Postagem>, //associado. Repository permitem criar qualquer consulta SQL
  ) {}

  async findAll(): Promise<Postagem[]> {
    return await this.postagemRepository.find();
  }

  async findById(id: number): Promise<Postagem> {
    const postagem = await this.postagemRepository.findOne({
      where: {
        id,
      },
    });

    if (!postagem)
      throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND);

    return postagem;
  }

  async findAllByTitulo(titulo: string): Promise<Postagem[]> {
    return await this.postagemRepository.find({
      //método find() da Classe postagemRepository (TypeOrm) é chamado para executar a consulta no banco de dados
      where: {
        titulo: ILike(`%${titulo}%`), //o ILike não diferencia letras maiúsculas de minúsculas(Like sim) Ele localiza todas as postagens cujo atributo titulo contenha a string enviada no parâmetro
      }, //${} pq titulo é uma variável que recebe o texto
    });
  }

  async create(postagem: Postagem): Promise<Postagem> {
    //postagem do tipo Postagem (tabela entidade), o método é responsável por receber um objeto da classe Postagem e persistir seus dados no banco de dados
    return await this.postagemRepository.save(postagem);
    //apenas os Atributos titulo e texto serão enviados, porquê o id será atribuído pelo Banco de dados após o Objeto ser persistido e a data será atribuída pelo Nest (timestamp).
  }

  async update(postagem: Postagem): Promise<Postagem> {
    await this.findById(postagem.id); //O método findById(id: number) da classe PostagemService é chamado para verificar se a postagem que será atualizada existe

    return await this.postagemRepository.save(postagem); //O método save() da classe Repository pode ser usado tanto para persistir um novo objeto quanto para atualizar um objeto existente no banco de dados
  }

  async delete(id: number): Promise<DeleteResult> {
    // O id será enviado pelo Método da Classe PostagemController
    await this.findById(id);

    return await this.postagemRepository.delete(id);
  }
}
