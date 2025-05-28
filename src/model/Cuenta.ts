import { Column, Entity,  OneToMany, PrimaryColumn } from "typeorm";
import { Movimiento } from "./Movimiento";

@Entity("cuentas")
export class Cuenta{
    @PrimaryColumn()
    numeroCuenta: string;
    @Column()
    saldo: number;
    @Column()
    titular: string;
    @Column()
    tipo: string;

    @OneToMany(() => Movimiento, movimiento => movimiento.idCuenta)
    movimientos: Movimiento[];


    constructor(numeroCuenta: string, saldo: number, titular: string, tipo: string) {
        this.numeroCuenta = numeroCuenta;
        this.saldo = saldo;
        this.titular = titular;
        this.tipo = tipo;
    }
}
