import { Injectable, OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Rol } from '../roles/entities/rol.entity'
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DatabaseSeed implements OnModuleInit {
    
    constructor(
        @InjectRepository(Rol)
        private readonly roleRepository: Repository<Rol>
    ) {}

    async onModuleInit(): Promise<void> {
        const roles = [
            { name: 'ADMIN' },
            { name: 'PROFESOR' },
            { name: 'ALUMNO' }
        ];
        for (const rol of roles) {
            const exists = await this.roleRepository.findOne({
                where: { name: rol.name }
            });
            if (exists) {
                continue;
            }

            const roleNuevo = this.roleRepository.create({ name: rol.name });
            await this.roleRepository.save(roleNuevo);
            
        }
    }
}
