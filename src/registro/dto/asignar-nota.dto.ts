import { IsNumber, IsString, Min, Max, IsOptional } from 'class-validator';

export class AsignarNotaDto {
    @IsNumber()
    @Min(0)
    @Max(20) 
    valor!: number;

    @IsString()
    tipo_evaluacion!: string;
}

export class ActualizarNotaDto {
    @IsNumber()
    @Min(0)
    @Max(20)
    valor?: number;
}