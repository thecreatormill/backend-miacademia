import { ActualizarNotaDto, AsignarNotaDto } from './dto/asignar-nota.dto';
import { CrearMatriculaDto } from './dto/create-matricula.dto';
import { ActualizarAsistenciaDto, RegistrarAsistenciaDto } from './dto/register-asistencia.dto';
import { RegistroService } from './registro.service';
import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('registro')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RegistroController {
    constructor(private readonly registroService: RegistroService) {}

    @Roles('ADMIN')
    @Post('matriculas')
    matricular(@Body() createDto: CrearMatriculaDto) { 
        return this.registroService.crearMatricula(createDto); 
    }

    @Roles('ALUMNO')
    @Get('mis-matriculas')
    obtenerMisMatriculas(@Request() req: any) { 
        return this.registroService.obtenerMatriculasAlumno(req.user.sub); 
    }

    @Roles('ALUMNO')
    @Get('mi-historial')
    obtenerMiHistorial(@Request() req: any) { 
        return this.registroService.obtenerHistorialPorAlumno(req.user.sub); 
    }

    @Roles('ADMIN', 'PROFESOR')
    @Get('clases/:id_clase/matriculas')
    listarAlumnosPorClase(@Param('id_clase', ParseIntPipe) id: number) { 
        return this.registroService.listarAlumnosPorClase(id); 
    }

    @Roles('ADMIN', 'PROFESOR')
    @Patch('matriculas/:id/cerrar')
    cerrarMatricula(@Param('id', ParseIntPipe) id: number) {
         return this.registroService.cerrarRegistro(id); 
    }

    @Roles('ADMIN', 'PROFESOR')
    @Post('matriculas/:id/notas')
    agregarNota(@Param('id', ParseIntPipe) id: number, @Body() asignarDto: AsignarNotaDto) { 
        return this.registroService.agregarNota(id, asignarDto); 
    }

    @Roles('ADMIN', 'PROFESOR')
    @Get('matriculas/:id/notas')
    listarNotas(@Param('id', ParseIntPipe) id: number) { 
        return this.registroService.listarNotas(id); 
    }

    @Roles('ADMIN', 'PROFESOR')
    @Patch('notas/:id_nota')
    actualizarNota(@Param('id_nota', ParseIntPipe) id: number, @Body() updateDto: ActualizarNotaDto, @Request() req: any) {
        return this.registroService.actualizarNota(id, updateDto, req.user.role); 
    }

    @Roles('ADMIN', 'PROFESOR')
    @Post('matriculas/:id/asistencias')
    registrarAsistencia(@Param('id', ParseIntPipe) id: number, @Body() registerDto: RegistrarAsistenciaDto) { 
        return this.registroService.registrarAsistencia(id, registerDto); 
    }

    @Roles('ADMIN', 'PROFESOR')
    @Get('matriculas/:id/asistencias')
    listarAsistencias(@Param('id', ParseIntPipe) id: number) { 
        return this.registroService.listarAsistencias(id); 
    }

    @Roles('ADMIN', 'PROFESOR')
    @Patch('asistencias/:id_asistencia')
    actualizarAsistencia(@Param('id_asistencia', ParseIntPipe) id: number, @Body() updateDto: ActualizarAsistenciaDto, @Request() req: any) { 
        return this.registroService.actualizarAsistencia(id, updateDto, req.user.role); 
    }
}