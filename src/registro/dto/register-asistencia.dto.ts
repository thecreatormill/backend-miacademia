import { IsDateString, IsBoolean, IsOptional } from 'class-validator';

export class RegistrarAsistenciaDto {
    @IsDateString()
    fecha!: string;

    @IsBoolean()
    presente!: boolean;
}

export class ActualizarAsistenciaDto {
    @IsBoolean()
    presente?: boolean;
}