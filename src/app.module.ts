import { Module } from '@nestjs/common';
import { CuentasController } from './controller/cuentas.controller';
import { CuentasService } from './service/cuentas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cuenta } from './model/Cuenta';
import { Movimiento } from './model/Movimiento';
import { Cliente } from './model/Cliente';
import { Titular } from './model/Titular';
import { ClientesController } from './controller/clientes.controller';
import { ClientesService } from './service/clientes.service';

@Module({
  imports: [
      TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '30092001',
        database: 'bancabd',
        entities: [Cuenta, Movimiento, Cliente, Titular],
        synchronize: false,
    }),
    TypeOrmModule.forFeature([Cuenta, Movimiento, Cliente, Titular]),
    
  ],
  controllers: [CuentasController, CuentasController, ClientesController],
  providers: [CuentasService, CuentasService, ClientesService],
})
export class AppModule {}
