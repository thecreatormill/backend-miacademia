import { IsString, IsOptional, MinLength, IsEmail } from 'class-validator';

export class UpdateUsuarioDto {
  @IsString()
  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  email?: string;

  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password?: string;
}