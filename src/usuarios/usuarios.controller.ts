import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { Body, Controller, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UpdateUsuarioAdminDto } from './dto/update.-admin-usuario.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('usuarios')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsuariosController {
    constructor(
        private readonly usuariosService: UsuariosService
    ){}

    @Get('mi-perfil')
    miPerfilUsuario(@Request() req: any){
        const dni_usuario = req.user.dni;
        return this.usuariosService.buscarPorDni(dni_usuario);
    }

    @Roles('ADMIN', 'PROFESOR')
    @Get('buscar/:dni')
    buscarPorDni(@Param('dni') dni: string){
        return this.usuariosService.buscarPorDni(dni);
    }

    @Roles('ADMIN')
    @Get('rol/:rol')
    usuariosRol(@Param('rol') rol: string){
        return this.usuariosService.buscarPorRol(rol);
    }

    @Roles('ADMIN')
    @Post()
    crearUsuario(@Body() createUsuarioDto: CreateUsuarioDto){
        return this.usuariosService.crearUsuario(createUsuarioDto)
    }

    @Roles('PROFESOR, ALUMNO')
    @Patch('mi-perfil')
    actualizarMiPerfil(@Request() req: any, @Body() updateUsuarioDto: UpdateUsuarioDto){
        const id_usuario = req.user.sub;
        return this.usuariosService.actualizarUsuario(id_usuario, updateUsuarioDto);
    }

    @Roles('ADMIN')
    @Patch('admin/:dni')
    actualizarUsuario(@Param('dni') dni: string, @Body() updateUsuarioDto: UpdateUsuarioAdminDto){
        return this.usuariosService.actualizarUsuarioAdmin(dni, updateUsuarioDto);
    }
}