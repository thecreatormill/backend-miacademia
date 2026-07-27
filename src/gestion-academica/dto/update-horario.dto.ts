import { IsString, IsOptional, Matches } from 'class-validator';

export class UpdateHorarioDto {
    @IsString()
    dia_semana?: string;

    @IsString()
    hora_inicio?: string;

    @IsString()
    hora_fin?: string;
}