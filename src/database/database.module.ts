import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseSeed } from './database.seed';
import { Rol } from '../roles/entities/rol.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Rol])
    ],
    providers: [DatabaseSeed],
    
})
export class DatabaseModule {}
