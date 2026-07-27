import { Body, Controller, Get, Param, Post, Patch, ParseIntPipe, Query, Request } from '@nestjs/common';
import { GestionAcademicaService } from './gestion-academica.service';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { CreateClaseDto } from './dto/create-clase.dto';
import { UpdateClaseDto } from './dto/update-clase.dto';
import { CreaterHorarioDto } from './dto/create-horario.dto';
import { UpdateHorarioDto } from './dto/update-horario.dto';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('gestion-academica')
export class GestionAcademicaController {
    constructor(
        private readonly gestionService: GestionAcademicaService
    ){}

    @Roles('ADMIN')
    @Post('cursos')
    crearCurso(createDto: CreateCursoDto) { return this.gestionService.crearCurso(createDto);}

    @Roles('ADMIN')
    @Get('cursos')
    listarCursos(){ return this.gestionService.listCurso();}

    @Roles('ADMIN')
    @Patch('cursos/:id')
    actualizarCurso(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateCursoDto){
        return this.gestionService.actualizarCurso(id, updateDto);
    }

    // -------------------------- //

    @Roles('ADMIN')
    @Post('clases')
    crearClase(@Body() createDto: CreateClaseDto){
        return this.gestionService.crearClase(createDto);
    }

    @Roles('ADMIN')
    @Patch('clases/:id')
    actualizarClase(@Param('id', ParseIntPipe) id: number,  @Body() updateDto: UpdateClaseDto){
        return this.gestionService.actualizarClase(id, updateDto)
    }

    @Roles('ADMIN')
    @Get('clases/buscar')
    buscarClase(@Query('nombre') nombre: string){
        return this.gestionService.buscarClase(nombre);
    }

    @Roles('PROFESOR')
    @Get('mis-clases')
    listarClases(@Request() req: any){
        return this.gestionService.listarClasesProfesor(req.user.sub);
    }

    @Roles('ADMIN')
    @Get('clases')
    listarTodasLasClases() { 
        return this.gestionService.listarTodasLasClases(); 
    }

    // -------------------------- //

    @Roles('ADMIN')
    @Post('clases/:id_clase/horarios')
    agregarHorario(@Param('id_clase', ParseIntPipe)id: number,@Body() createDto: CreaterHorarioDto){
        return this.gestionService.agregarHorario(id, createDto);
    }

    @Roles('ADMIN')
    @Patch('horarios/:id_horario')
    actualizarHorario(@Param('id_horario', ParseIntPipe) id: number, @Body() updateDto: UpdateHorarioDto){
        return this.gestionService.actualizarHorario(id, updateDto);
    }

}
