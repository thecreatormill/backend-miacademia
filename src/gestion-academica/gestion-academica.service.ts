import { Injectable, NotFoundException } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Curso } from './entities/curso.entity';
import { Clase } from './entities/clase.entity';
import { Horario } from './entities/horario.entity';
import { CreateClaseDto } from './dto/create-clase.dto';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { UpdateClaseDto } from './dto/update-clase.dto';
import { CreaterHorarioDto } from './dto/create-horario.dto';
import { UpdateHorarioDto } from './dto/update-horario.dto';

@Injectable()
export class GestionAcademicaService {
    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>,
        @InjectRepository(Curso)
        private readonly cursoRepository: Repository<Curso>,
        @InjectRepository(Clase)
        private readonly claseRepository: Repository<Clase>,
        @InjectRepository(Horario)
        private readonly horarioRepository: Repository<Horario>
    ){}

    // -------------------------- //

    async crearCurso(createDto: CreateCursoDto){
        let codigoCurso = '';
        let existe = true;
        while(existe){
            const random = Math.floor(1000 + Math.random() * 9000);
            codigoCurso = `CO${random};`
            const validarExistente = await this.cursoRepository.findOne({
                where: {codigo: codigoCurso}
            })
        }
        const curso = this.cursoRepository.create({...createDto, codigo: codigoCurso});
        return this.cursoRepository.save(curso);
    }

    async listCurso(){
        return await this.cursoRepository.find()
    }

    async actualizarCurso(id_curso: number, updateDto: UpdateCursoDto){
        const curso = await this.cursoRepository.findOne({where: {id_curso: id_curso}});
        if(!curso) throw new NotFoundException('Curso no encontrado');
        Object.assign(curso, updateDto);
        return this.cursoRepository.save(curso);
    }

    // -------------------------- //

    async crearClase(createDto: CreateClaseDto){
        const curso = await this.cursoRepository.findOne({where: {id_curso: createDto.id_curso}});
        const profesor = await this.usuarioRepository.findOne({where: {id_usuario: createDto.id_profesor}});

        if(!curso || !profesor) throw new NotFoundException('El curso u profesor es incorrecto.');
        
        const clase = this.claseRepository.create({...createDto, curso, profesor});
        return this.claseRepository.save(clase);
    }

    async actualizarClase(id_clase: number, updateDto: UpdateClaseDto){
        const clase = await this.claseRepository.findOne({where: {id_clase: id_clase}});
        if(!clase) throw new NotFoundException('Clase no encontrada.');
        Object.assign(clase, updateDto);
        return this.claseRepository.save(clase);
    }

    async buscarClase(nombre: string){
        return this.claseRepository.find({
            where: {curso: {nombre: Like(`%${nombre}%`)}, active: true},
            relations: {curso: true, profesor: true}
        });
    }

    async listarClasesProfesor(id_profesor: number){
        return this.claseRepository.find({
            where: {profesor: {id_usuario: id_profesor}, active: true},
            relations: {curso: true, horarios: true}
        });
    }
    
    async listarTodasLasClases() {
        return await this.claseRepository.find({
            relations: { curso: true, profesor: true, horarios: true }
        });
    }

    // -------------------------- //

    async agregarHorario(id_clase: number, createDto: CreaterHorarioDto) {
        const clase = await this.claseRepository.findOne({ where: { id_clase } });
        if (!clase) throw new NotFoundException('Clase no encontrada');
        const nuevoHorario = this.horarioRepository.create({ ...createDto, clase });
        return await this.horarioRepository.save(nuevoHorario);
    }

    async actualizarHorario(id_horario: number, updateDto: UpdateHorarioDto) {
        const horario = await this.horarioRepository.findOne({ where: { id_horario } });
        if (!horario) throw new NotFoundException('Horario ingresado incorrecto');
        Object.assign(horario, updateDto);
        return await this.horarioRepository.save(horario);
    }
}
