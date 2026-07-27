import { Module } from '@nestjs/common';
import { RegistroController } from './registro.controller';
import { RegistroService } from './registro.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Matricula } from './entities/matricula.entity';
import { Nota } from './entities/nota.entity';
import { Asistencia } from './entities/asistencia.entity';
import { Clase } from '../gestion-academica/entities/clase.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Matricula, Nota, Asistencia, Clase])],
  controllers: [RegistroController],
  providers: [RegistroService]
})
export class RegistroModule {}
