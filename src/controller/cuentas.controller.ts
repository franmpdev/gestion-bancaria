import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { Cuenta } from "src/model/Cuenta";
import { CuentasService } from "src/service/cuentas.service";

@Controller('cuentas')
export class CuentasController {
  constructor(private readonly cuentasService: CuentasService) {}
  @Get("buscarPorFecha/:fecha")
  buscarPorFecha(@Param("fecha") fecha:Date){
    return this.cuentasService.findByMovimientosFecha(fecha);
  }
  @Get("buscarPorCantidad/:cantidad")
  buscarPorCantidad(@Param("cantidad") cantidad:number){
    return this.cuentasService.findByExtraccionMin(cantidad);
  }
  @Get("buscarPorDni/:dni")
  buscarPorDni(@Param("dni") dni:number){
    return this.cuentasService.findByDni(dni);
  }
  @Post("create")
  async create(@Body() cuenta: Cuenta) {
    const creado = await this.cuentasService.save(cuenta);
    if (creado) {
      return {
        message: 'Cuenta creada correctamente',
        cuenta: cuenta,
      };
    } else {
      return {
        message: 'Error al crear la cuenta',
        cuenta: null,
      };
    }
  }
} 