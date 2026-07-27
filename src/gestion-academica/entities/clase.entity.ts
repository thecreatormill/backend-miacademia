import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Curso } from "./curso.entity";
import { Horario } from "./horario.entity";
import { Usuario } from "../../usuarios/entities/usuario.entity"; 

@Entity('clases')
export class Clase {
    @PrimaryGeneratedColumn('increment')
    id_clase!: number;

    @Column({ type: 'varchar', length: 50 })
    seccion!: string; 

    @Column({ type: 'date' })
    fecha_inicio!: string; 

    @Column({ type: 'date' })
    fecha_fin!: string; 

    @Column({ type: 'int'})
    capacidad_maxima!: number

    @Column({ type: 'bool', default: true })
    active!: boolean;

    @ManyToOne(() => Curso, curso => curso.clases)
    @JoinColumn({ name: 'id_curso' })
    curso!: Curso;

    @ManyToOne(() => Usuario) 
    @JoinColumn({ name: 'id_profesor' })
    profesor!: Usuario;

    @OneToMany(() => Horario, horario => horario.clase, { cascade: true })
    horarios!: Horario[];
}