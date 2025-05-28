import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("clientes")
export class Cliente {
@PrimaryColumn()
    dni: string;

    @Column()
    nombre: string;

    @Column()
    direccion: string;

    @Column()
    telefono: string;

    constructor(dni:string, nombre: string, direccion: string, telefono: string) {
        this.dni = dni;
        this.nombre = nombre;
        this.direccion = direccion;
        this.telefono = telefono;
    }
}
