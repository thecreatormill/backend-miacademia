import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCursoDto {
    @IsString()
    @IsNotEmpty({ message: 'El nombre del curso es obligatorio.' })
    nombre!: string;

    @IsOptional()
    @IsString()
    descripcion?: string;
}