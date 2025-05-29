import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';

import { ClientesService } from '../service/clientes.service';
import { Cliente } from 'src/model/Cliente';

@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Post('create')
  async create(@Body() cliente: Cliente) {
    const creado = await this.clientesService.save(cliente)
    if(creado){
      return {
        message: 'Cliente creado correctamente',
        cliente: cliente,
      };
    }
    else{
      return {
        message: 'Error al crear el cliente',
        cliente: null,
      }
    }

    
  }


}
