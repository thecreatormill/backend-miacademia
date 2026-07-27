import { IsString, IsEmail, Length, IsInt, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @Length(8, 8, { message: 'El DNI debe tener exactamente 8 caracteres' })
  dni!: string;

  @IsString()
  @IsNotEmpty({ message: 'Los nombres son obligatorios' })
  nombres!: string;

  @IsString()
  @IsNotEmpty({ message: 'Los apellidos son obligatorios' })
  apellidos!: string;

  @IsEmail({}, { message: 'El formato del email no es válido' })
  email!: string;

  @IsString()
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password!: string;

  @IsInt({ message: 'El ID del rol debe ser un número entero' })
  id_rol!: number;
}