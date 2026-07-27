import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Matricula } from './entities/matricula.entity';
import { Nota } from './entities/nota.entity';
import { Asistencia } from './entities/asistencia.entity';
import { Clase } from '../gestion-academica/entities/clase.entity';

import { CrearMatriculaDto } from './dto/create-matricula.dto';
import { ActualizarNotaDto, AsignarNotaDto } from './dto/asignar-nota.dto';
import { ActualizarAsistenciaDto, RegistrarAsistenciaDto } from './dto/register-asistencia.dto';

@Injectable()
export class RegistroService {
    constructor(
        @InjectRepository(Matricula)
        private readonly matriculaRepository: Repository<Matricula>,
        @InjectRepository(Nota)
        private readonly notaRepository: Repository<Nota>,
        @InjectRepository(Asistencia)
        private readonly asistenciaRepository: Repository<Asistencia>,
        @InjectRepository(Clase)
        private readonly claseRepository: Repository<Clase>
    ) {}


    async crearMatricula(createDto: CrearMatriculaDto) {
        const validarRegistro = await this.matriculaRepository.findOne({
            where: {
                alumno: { id_usuario: createDto.id_alumno },
                clase: { id_clase: createDto.id_clase },
                estado: 'ACTIVO'
            }
        });

        if (validarRegistro) throw new ConflictException('El alumno ya está registrado en esta clase.');
        
        const clase = await this.claseRepository.findOne({
            where: { id_clase: createDto.id_clase },
            relations: { horarios: true }
        });

        if (!clase) throw new NotFoundException('Clase no encontrada.');

        const matriculados = await this.matriculaRepository.count({
            where: { clase: { id_clase: createDto.id_clase }, estado: 'ACTIVO' }
        });

        if (matriculados >= clase.capacidad_maxima) {
            throw new BadRequestException('La clase no cuenta con cupos disponibles.');
        }

        const registroCursos = await this.matriculaRepository.find({
            where: { 
                alumno: { id_usuario: createDto.id_alumno }, 
                estado: 'ACTIVO' 
            },
            relations: {
                clase: {
                    horarios: true,
                    curso: true
                }
            }
        });

        for (const cursoRegistrado of registroCursos) {
            for (const horarioConsulta of clase.horarios) {
                for (const horarioRegistrado of cursoRegistrado.clase.horarios) {
                    if (horarioConsulta.dia_semana === horarioRegistrado.dia_semana) {
                        if (horarioConsulta.hora_inicio < horarioRegistrado.hora_fin && horarioConsulta.hora_fin > horarioRegistrado.hora_inicio) {
                            throw new ConflictException(`Hay un cruce de horarios detectado con el curso ${cursoRegistrado.clase.curso.nombre} el día ${horarioConsulta.dia_semana}`);
                        }
                    }
                }
            }
        }

        const matricula = this.matriculaRepository.create({
            alumno: { id_usuario: createDto.id_alumno } as any,
            clase: { id_clase: createDto.id_clase } as any, 
            estado: 'ACTIVO'
        });

        return this.matriculaRepository.save(matricula);
    }

    async obtenerMatriculasAlumno(id_alumno: number) {
        return this.matriculaRepository.find({
            where: {
                alumno: { id_usuario: id_alumno },
                estado: 'ACTIVO'
            },
            relations: {
                clase: { curso: true }
            }
        });
    }

    async obtenerHistorialPorAlumno(id_alumno: number) {
        return this.matriculaRepository.find({
            where: { 
                alumno: { id_usuario: id_alumno }, 
                estado: In(['APROBADO', 'REPROBADO', 'RETIRADO']) 
            },
            relations: {
                clase: { curso: true }
            }
        });
    }

    async listarAlumnosPorClase(id_clase: number) {
        return this.matriculaRepository.find({
            where: { clase: { id_clase }, estado: 'ACTIVO' },
            relations: { alumno: true }
        });
    }

    async cerrarRegistro(id_matricula: number) {
        const matricula = await this.matriculaRepository.findOne({ where: { id_matricula } });
        if (!matricula) throw new NotFoundException('Matrícula no encontrada');
        if (matricula.estado !== 'ACTIVO') throw new BadRequestException('La matrícula ya está cerrada');

        const notas = await this.notaRepository.find({ where: { matricula: { id_matricula } } });
        
        let promedio = 0;
        if (notas.length === 0) {
            matricula.estado = 'REPROBADO';
        } else {
            const suma = notas.reduce((acc, nota) => acc + Number(nota.valor), 0);
            promedio = suma / notas.length;
            matricula.estado = promedio >= 11 ? 'APROBADO' : 'REPROBADO';
        }
        
        return this.matriculaRepository.save(matricula);
    }

    async agregarNota(id_matricula: number, dto: AsignarNotaDto) {
        const matricula = await this.matriculaRepository.findOne({ where: { id_matricula } });
        if (!matricula || matricula.estado !== 'ACTIVO') throw new BadRequestException('Matrícula inactiva o no existe');
        
        const nuevaNota = this.notaRepository.create({ ...dto, matricula });
        return await this.notaRepository.save(nuevaNota);
    }

    async listarNotas(id_matricula: number) {
        return this.notaRepository.find({ where: { matricula: { id_matricula } } });
    }

    async actualizarNota(id_nota: number, dto: ActualizarNotaDto, rol: string) {
        const nota = await this.notaRepository.findOne({ 
            where: { id_nota }, 
            relations: { matricula: true }
        });

        if (!nota) throw new NotFoundException('Nota no encontrada');

        if (nota.matricula.estado !== 'ACTIVO' && rol !== 'ADMIN') {
            throw new BadRequestException('No se puede modificar, la matrícula está cerrada');
        }
        
        Object.assign(nota, dto);
        return await this.notaRepository.save(nota);
    }

    async registrarAsistencia(id_matricula: number, dto: RegistrarAsistenciaDto) {
        const matricula = await this.matriculaRepository.findOne({ where: { id_matricula } });
        if (!matricula || matricula.estado !== 'ACTIVO') throw new BadRequestException('Matrícula inactiva o no existe');
        
        const nuevaAsistencia = this.asistenciaRepository.create({ ...dto, matricula });
        return await this.asistenciaRepository.save(nuevaAsistencia);
    }

    async listarAsistencias(id_matricula: number) {
        return this.asistenciaRepository.find({ 
            where: { matricula: { id_matricula } } 
        });
    }

    async actualizarAsistencia(id_asistencia: number, dto: ActualizarAsistenciaDto, rol: string) {
        const asistencia = await this.asistenciaRepository.findOne({ 
            where: { id_asistencia }, 
            relations: { matricula: true }
        });
        
        if (!asistencia) throw new NotFoundException('Asistencia no encontrada');
        
        if (asistencia.matricula.estado !== 'ACTIVO' && rol !== 'ADMIN') {
            throw new BadRequestException('No se puede modificar, la matrícula está cerrada');
        }
        
        Object.assign(asistencia, dto);
        return await this.asistenciaRepository.save(asistencia);
    }
}