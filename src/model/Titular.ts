import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("titulares")
export class Titular {
    @PrimaryColumn()
    idCuenta: string;
    @Column()
    idCliente: string;

    constructor(idCuenta: string, idCliente: string) {
        this.idCuenta = idCuenta;
        this.idCliente = idCliente;
    }
}
