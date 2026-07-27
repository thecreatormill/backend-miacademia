import { IsString, IsNotEmpty, Matches } from 'class-validator';

export class CreaterHorarioDto {
    @IsString()
    @IsNotEmpty()
    dia_semana!: string;

    @IsString()
    hora_inicio!: string;

    @IsString()
    hora_fin!: string;
}