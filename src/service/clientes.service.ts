import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from 'src/model/Cliente';
import { Cuenta } from 'src/model/Cuenta';
import { Repository } from 'typeorm';


@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cuenta)private cuentasRepository: Repository<Cuenta>,
    @InjectRepository(Cliente)private clientesRepository: Repository<Cliente>
  ){}
  
  async save(cliente: Cliente): Promise<boolean>{
    try{
      await this.clientesRepository.save(cliente);
      return true;
    }catch(error: any){
      return false;
    }
  }
  async findByNumeroCuenta(numeroCuenta: number): Promise<Cliente[]> {
    const cuenta: Cuenta = await this.cuentasRepository.findOne({
      where:{
        numeroCuenta: numeroCuenta
      },
      relations: ['clientes'] // Relación con la tabla clientes
    })
    return cuenta.clientes;

  }
}
