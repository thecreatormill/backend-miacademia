import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from "typeorm";
import { Usuario } from "../../usuarios/entities/usuario.entity";
import { Clase } from "../../gestion-academica/entities/clase.entity";

@Entity('matriculas')
export class Matricula {
    @PrimaryGeneratedColumn('increment')
    id_matricula!: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    fecha_matricula!: Date;

    @Column({ type: 'varchar', length: 20, default: 'ACTIVO' })
    estado!: string; 

    @ManyToOne(() => Usuario)
    @JoinColumn({ name: 'id_alumno' })
    alumno!: Usuario;

    @ManyToOne(() => Clase)
    @JoinColumn({ name: 'id_clase' })
    clase!: Clase;
}