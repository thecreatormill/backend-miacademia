import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Matricula } from "./matricula.entity";

@Entity('asistencias')
export class Asistencia {
    @PrimaryGeneratedColumn('increment')
    id_asistencia!: number;

    @Column({ type: 'date' })
    fecha!: string;

    @Column({ type: 'boolean', default: true })
    asistio!: boolean;

    @ManyToOne(() => Matricula)
    @JoinColumn({ name: 'id_matricula' })
    matricula!: Matricula;
}