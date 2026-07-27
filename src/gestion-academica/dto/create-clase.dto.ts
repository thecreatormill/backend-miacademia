import { IsNotEmpty, IsInt, IsDateString, IsString, IsNumber } from 'class-validator';

export class CreateClaseDto {
    @IsInt()
    id_curso!: number;

    @IsInt()
    id_profesor!: number;

    @IsString()
    seccion!: string;

    @IsNumber()
    capacidad_maxima!: number

    @IsDateString()
    fecha_inicio!: string;

    @IsDateString()
    fecha_fin!: string;
}