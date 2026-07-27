import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';


@Entity('roles')
export class Rol {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        unique: true,
        nullable: false
    })
    name!: string;

    @OneToMany(() => Usuario, usuario => usuario.rol)
    users!: Usuario[];
}