import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Clase } from "./clase.entity";

@Entity('horarios')
export class Horario {
    @PrimaryGeneratedColumn('increment')
    id_horario!: number;

    @Column({ type: 'varchar', length: 20 })
    dia_semana!: string; 

    @Column({ type: 'time' })
    hora_inicio!: string; 

    @Column({ type: 'time' })
    hora_fin!: string; 

    @ManyToOne(() => Clase, clase => clase.horarios, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_clase' })
    clase!: Clase;
}