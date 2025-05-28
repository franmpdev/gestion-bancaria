import { Module } from '@nestjs/common';
import { CuentasController } from './controller/cuentas.controller';
import { CuentasService } from './service/cuentas.service';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cuenta } from './model/Cuenta';
import { Movimiento } from './model/Movimiento';
import { Cliente } from './model/Cliente';
import { Titular } from './model/Titular';

@Module({
  imports: [
      TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '30092001',
        database: 'db_peluqueria',
        entities: [Cuenta, Movimiento, Cliente, Titular],
        synchronize: false,
    }),
    TypeOrmModule.forFeature([Cuenta, Movimiento, Cliente, Titular]),
    
  ],
  controllers: [CuentasController, AuthController, CuentasController],
  providers: [CuentasService, AuthService, CuentasService],
})
export class AppModule {}
