import { Module } from '@nestjs/common';
import { GestionAcademicaController } from './gestion-academica.controller';
import { GestionAcademicaService } from './gestion-academica.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Curso } from './entities/curso.entity';
import { Clase } from './entities/clase.entity';
import { Horario } from './entities/horario.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Curso, Clase, Horario, Usuario])],
  controllers: [GestionAcademicaController],
  providers: [GestionAcademicaService],
  exports: [GestionAcademicaService]
})
export class GestionAcademicaModule {}
