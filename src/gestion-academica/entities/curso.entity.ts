import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Clase } from "./clase.entity";

@Entity('cursos')
export class Curso {
    @PrimaryGeneratedColumn('increment')
    id_curso!: number;

    @Column({ type: 'varchar', length: 10, unique: true })
    codigo!: string; 

    @Column({ type: 'varchar', length: 100, unique: true })
    nombre!: string;

    @Column({ type: 'text', nullable: true })
    descripcion!: string;

    @Column({ type: 'bool', default: true })
    active!: boolean;

    @OneToMany(() => Clase, clase => clase.curso)
    clases!: Clase[];
}