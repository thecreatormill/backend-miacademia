import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Rol } from "../../roles/entities/rol.entity";

@Entity('usuarios')
export class Usuario {
    @PrimaryGeneratedColumn('increment')
    id_usuario!: number;

    @Column({length: 8, unique: true})
    dni!: string;

    @Column({type: 'varchar', length: 255})
    nombre!: string;

    @Column({type: 'varchar', length: 255})
    apellidos!: string;

    @Column({type: 'varchar', select: false})
    password!: string;

    @Column({type: 'varchar', length: 255})
    email!:string

    @Column({type: 'bool', default: true})
    active!: boolean

    @ManyToOne(() => Rol, rol => rol.users)
    @JoinColumn({ name: 'rol_id' })
    rol!: Rol;
}
