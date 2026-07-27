import { IsInt } from 'class-validator';

export class CrearMatriculaDto {
    @IsInt({ message: 'El ID del alumno es obligatorio' })
    id_alumno!: number;

    @IsInt({ message: 'El ID de la clase es obligatorio' })
    id_clase!: number;
}
