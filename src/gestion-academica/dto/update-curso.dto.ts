import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class UpdateCursoDto {
    @IsString()
    nombre?: string;

    @IsString()
    descripcion?: string;

    @IsBoolean()
    active?: boolean;
}