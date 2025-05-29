import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Cliente } from "src/model/Cliente"
import { Cuenta } from "src/model/Cuenta"
import { Movimiento } from "src/model/Movimiento"
import { Repository, MoreThan } from "typeorm"

@Injectable()
export class CuentasService {
  constructor(@InjectRepository(Movimiento) private movimientosRepository:Repository<Movimiento>,
              @InjectRepository(Cuenta) private cuentasRepository:Repository<Cuenta>,
              @InjectRepository(Cliente) private clientesRepository:Repository<Cliente>){
    
  }
  async save(cuenta:Cuenta):Promise<boolean>{
    try{
      await this.cuentasRepository.save(cuenta);
      return true;
    }catch(error:any){
      return false;
    }
  }
  async findByMovimientosFecha(fecha:Date):Promise<Cuenta[]>{
    const movimientos:Movimiento[]=await this.movimientosRepository.find({
      where:{
        fecha:fecha
      },
      relations:["cuenta"]
    });//Movimiento[]
    return [...new Set(movimientos.map(m=>m.cuenta))];
    
  }
  async findByExtraccionMin(cantidad:number):Promise<Cuenta[]>{
    const movimientos:Movimiento[]=await this.movimientosRepository.find({
      where:{
        cantidad:MoreThan(cantidad),
        operacion:"extracción"
      },
      relations:["cuentas"] //Relación con la tabla cuentas
    });//Movimiento[]
    return movimientos.map(m=>m.cuenta);
    
  }

  //cuentas asociada al titular cuyo dni se proporciona como parámetro

  async findByDni(dni:number):Promise<Cuenta[]>{
    //Función que hace una consulta a la tabla clientes y devuelve las cuentas asociadas
    //al titular cuyo dni se proporciona como parámetro
    const cliente:Cliente=await this.clientesRepository.findOne({
      where:{
        dni:dni
      },
      relations:["cuentas"] //Relación con la tabla cuentas
      //Debe tener siempre la relación para que se pueda acceder a las cuentas del cliente
    });

    if(cliente){
      return cliente.cuentas;
    }else{
      return [];
    }
    
  } 
} 