import { Column, Entity,  JoinTable,  ManyToMany,  OneToMany, PrimaryColumn } from "typeorm";
import { Movimiento } from "./Movimiento";
import { Cliente } from "./Cliente";

@Entity("cuentas")
export class Cuenta{
    @PrimaryColumn()
    numeroCuenta: number;
    @Column()
    saldo: number;
    @Column()
    tipoCuenta: string;

    @OneToMany(() => Movimiento, movimiento => movimiento.idCuenta)
    movimientos: Movimiento[];
    @ManyToMany(() => Cliente, cliente => cliente.cuentas)
    @JoinTable({
        //Relación de cliente a titulares
        name: 'titulares',
        joinColumn: {
            name: 'idCuenta',
            referencedColumnName: 'numeroCuenta',
        },
        //Relación de cuenta a cliente
        inverseJoinColumn: {
            name: 'idCliente',
            referencedColumnName: 'dni',
        },
    })
    clientes: Cliente[];

    constructor(numeroCuenta?: number, saldo?: number, tipoCuenta?: string) {
        this.numeroCuenta = numeroCuenta;
        this.saldo = saldo;
        this.tipoCuenta = tipoCuenta;
    }
}
