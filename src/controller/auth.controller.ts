import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Put,
  Res,
  Post,
} from '@nestjs/common';
//IMPORTANTE IMPORTAR RESPONSE
import { Response } from 'express';
import { AuthService } from '../service/auth.service';
import { User } from 'src/model/User';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('create')
    async create(@Body() user: User, @Res() res: Response):Promise<Response> {
        const usuariorepetido = await this.authService.create(user);
        if(usuariorepetido){
            return res.status(499).json(
            {
              message: 'El usuario ya existe',
            });
        }
        else{
          return res.status(201).json(
            {
              message: 'Usuario creado'
            });
        }
    }

  @Get(':email,:password')
    async findOne(@Param('email') email: string, @Param('password') password: string, @Res() res: Response):Promise<Response> {
      const user = await this.authService.findOne(email, password);
      if(user){
        return res.status(200).json(user);
      }
      else{
        return res.status(499).json(
        {
          message: 'Cuenta no encontrada'
        });
    }
    }
  @Put('update/:email')
  async update(@Param('email') email: string, @Body() user: User, @Res() res: Response): Promise<Response> {
    const usuario: User | Error = await this.authService.update(email, user);
    if (usuario instanceof User) {
      return res.status(200).json({
        message: 'Usuario actualizado',
        user: usuario,
      });
    } else {
      return res.status(404).json({
        message: 'Usuario no encontrado',
      });
    }
  }

  @Patch('updateField/:email')
    async updateField(@Param('email') email: string, @Body() newProperty:Partial<User>, @Res() res: Response): Promise<Response> {
      
      const respuesta: User | Error =await this.authService.updateField(email, newProperty);
      if(respuesta instanceof Error){
        return res.status(404).json(
          { 
          message: 'El usuario no existe',
          });
      }
      else{
        return res.status(200).json(
          { 
            message: 'Usuario actualizado',
            user: respuesta,
          });
      }
    }

  @Delete('delete/:email')
  @Delete('delete/:email')
  async remove(@Param('email') email: string, @Res() res: Response): Promise<Response> {
    const respuesta = await this.authService.remove(email);
    if (respuesta instanceof Error) {
      return res.status(404).json({
        message: 'El usuario no existe',
      });
    } else {
      return res.status(200).json({
        message: 'Usuario eliminado',
        user: respuesta,
      });
    }
  }
}
