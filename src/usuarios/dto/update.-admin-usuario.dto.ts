import { IsString, IsEmail, Length, IsInt, IsOptional, MinLength, IsBoolean } from 'class-validator';

export class UpdateUsuarioAdminDto {
  @IsOptional()
  @IsString()
  @Length(8, 8, { message: 'El DNI debe tener exactamente 8 caracteres' })
  dni?: string;

  @IsOptional()
  @IsString()
  nombres?: string;

  @IsOptional()
  @IsString()
  apellidos?: string;

  @IsOptional()
  @IsEmail({}, { message: 'El formato del email no es válido' })
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password?: string;

  @IsOptional()
  @IsInt({ message: 'El ID del rol debe ser un número entero' })
  id_rol?: number;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}
