import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Cuenta } from "./Cuenta";


@Entity("movimientos")
export class Movimiento {
    @PrimaryColumn()
    idMovimiento: number;
    @Column()
    idCuenta: string;
    @Column()
    fecha: Date;
    @Column()
    cantidad: number;
    @Column()
    operacion: string;
    @ManyToOne(()=>Cuenta,cuenta=>cuenta.movimientos)
    @JoinColumn({name:"idCuenta", referencedColumnName:"numeroCuenta"})
    cuenta: Cuenta;
    constructor(idMovimiento?:number, cuenta?:Cuenta, fecha?:Date, cantidad?:number, operacion?:string) {
        this.idMovimiento = idMovimiento || 0; // Si no se proporciona, se inicializa a 0
        this.cuenta = cuenta || null; // Si no se proporciona, se inicializa a 0
        this.fecha = fecha || new Date(); // Si no se proporciona, se inicializa a la fecha actual
        this.cantidad = cantidad || 0; // Si no se proporciona, se inicializa a 0
        this.operacion = operacion || ''; // Si no se proporciona, se inicializa a una cadena vacía
        
    }
}   