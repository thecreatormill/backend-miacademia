import { IsInt, IsDateString, IsOptional, IsBoolean, IsString } from 'class-validator';

export class UpdateClaseDto {
    @IsInt()
    id_curso?: number;

    @IsInt()
    id_profesor?: number;

    @IsString()
    seccion?: string;

    @IsDateString()
    fecha_inicio?: string;

    @IsDateString()
    fecha_fin?: string;

    capacidad_maxima?: number

    @IsBoolean()
    active?: boolean;
}