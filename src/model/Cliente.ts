import { Entity, PrimaryColumn, Column, ManyToMany } from "typeorm";
import { Cuenta } from "./Cuenta";


@Entity("clientes")
export class Cliente {
@PrimaryColumn()
    dni: number;

    @Column()
    nombre: string;

    @Column()
    direccion: string;

    @Column()
    telefono: string;
    //A través de la propiedad cuenta, obtienes los clientes con los que se relaciona la entidad Cuenta
    @ManyToMany(() => Cuenta, cuenta => cuenta.clientes)
    cuentas: Cuenta[];
    constructor(dni:number, nombre: string, direccion: string, telefono: string) {
        this.dni = dni;
        this.nombre = nombre;
        this.direccion = direccion;
        this.telefono = telefono;
    }
}
