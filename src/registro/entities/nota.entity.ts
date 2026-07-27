import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Matricula } from "./matricula.entity";

@Entity('notas')
export class Nota {
    @PrimaryGeneratedColumn('increment')
    id_nota!: number;

    @Column({ type: 'decimal', precision: 5, scale: 2 })
    valor!: number;

    @Column({ type: 'varchar', length: 50 })
    tipo_evaluacion!: string; 

    @ManyToOne(() => Matricula)
    @JoinColumn({ name: 'id_matricula' })
    matricula!: Matricula;
}