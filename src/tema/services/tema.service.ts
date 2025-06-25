import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { Tema } from './../entities/tema.entity';

@Injectable()
export class TemaService {
  constructor(
    @InjectRepository(Tema)
    private temaRepository: Repository<Tema>,
  ) {}

  async findAll(): Promise<Tema[]> {
    return await this.temaRepository.find({
      relations: {
        //O comando relations tem por objetivo exibir os Objetos da Classe Postagem que estão relacionados com os Objetos da Classe Tema
        postagem: true,
        //Ao executar o método, além de exibir os Objetos da Classe Tema, será exibido também a lista de Objetos da Classe Postagem associados a cada Objeto da Classe da Tema
        //Se o comando relations não for adicionada nos 3 Métodos de consulta, ao testar os 3 Métodos GET no Insomnia o Relacionamento entre as Classes não será exibido.
      },
    });
  }

  async findById(id: number): Promise<Tema> {
    const tema = await this.temaRepository.findOne({
      where: {
        id,
      },
      relations: {
        postagem: true,
      },
    });

    if (!tema)
      throw new HttpException('Tema não encontrado!', HttpStatus.NOT_FOUND);

    return tema;
  }

  async findAllByDescricao(descricao: string): Promise<Tema[]> {
    return await this.temaRepository.find({
      where: {
        descricao: ILike(`%${descricao}`),
      },
      relations: {
        postagem: true,
      },
    });
  }
  async create(Tema: Tema): Promise<Tema> {
    return await this.temaRepository.save(Tema);
  }

  async update(tema: Tema): Promise<Tema> {
    await this.findById(tema.id);

    return await this.temaRepository.save(tema);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);

    return await this.temaRepository.delete(id);
  }
}
