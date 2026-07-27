import { UsuariosService } from './../usuarios/usuarios.service';
import { LoginDto } from './dto/login.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService
    ) {}

    async validarUsuario(dni: string, password: string){
        const user = await this.usuariosService.buscarPorDniLogin(dni);
        
        if (!user) {
            throw new UnauthorizedException('Credenciales inválidas.');
        }

        if (!user.active) {
            throw new UnauthorizedException('Tu cuenta se encuentra inactiva.');
        }

        const passwordValida = await bcrypt.compare(password, user.password);
        if (!passwordValida) {
            throw new UnauthorizedException('Credenciales inválidas!');
        }

        return user;
    }

    async login(loginDto: LoginDto) {
        const user = await this.validarUsuario(loginDto.dni, loginDto.password);

        const payload = {
            sub: user.id_usuario,
            dni: user.dni,
            role: user.rol.name 
        };

        const token = await this.jwtService.signAsync(payload);

        return {
            access_token: token,
            user: {
                id: user.id_usuario,
                dni: user.dni,
                nombre: user.nombre,
                apellidos: user.apellidos,
                email: user.email,
                rol: user.rol.name
            }
        };
    }
}
