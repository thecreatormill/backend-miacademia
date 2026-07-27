import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { Rol } from '../roles/entities/rol.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import bcrypt from 'bcryptjs';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UpdateUsuarioAdminDto } from './dto/update.-admin-usuario.dto';

@Injectable()
export class UsuariosService {
    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>,
        @InjectRepository(Rol)
        private readonly rolRepository: Repository<Rol>
    ){}

    async crearUsuario (createDto: CreateUsuarioDto){
        const {id_rol, dni, ...usuarioData} = createDto;
        const validar_dni = await this.usuarioRepository.findOne({where: {dni: dni}});
        const rol = await this.rolRepository.findOne({where: {id: id_rol}})

        if(validar_dni) throw new ConflictException ('El DNI ingresado ya existe.');
        if(!rol) throw new NotFoundException ('No se valida el rol ingresado.');

        const usuario_nuevo = this.usuarioRepository.create({...usuarioData, dni, rol});
        usuario_nuevo.password = await bcrypt.hash(usuario_nuevo.password, 10);

        return this.usuarioRepository.save(usuario_nuevo)
    }

    async buscarPorId(id: number): Promise<Usuario>{
        const usuario = await this.usuarioRepository.findOne({ 
            where: {
                id_usuario: id
            },
            relations: {
                rol: true
            }
        })

        if (!usuario) {
        throw new NotFoundException('Usuario no encontrado');}
        return usuario;
    }

    async buscarPorDni(dni: string): Promise<Usuario>{
        const usuario = await this.usuarioRepository.findOne({ 
            where: {
                dni: dni
            },
            relations: {
                rol: true
            }
        })
        
        if (!usuario) {
        throw new NotFoundException('Usuario no encontrado');}

        return usuario;
    }

    async buscarPorDniLogin(dni: string) {
    return await this.usuarioRepository.findOne({ 
        where: { dni: dni },
        select: {
            id_usuario: true, 
            dni: true, 
            password: true, 
            active: true, 
            nombre: true, 
            apellidos: true, 
            email: true
        }, 
        relations: {
            rol: true
        }
    });
}

    async buscarPorRol(rol: string) {
        return this.usuarioRepository.find({
            where: { rol: { name: rol } },
            relations: { rol: true }
        });
    }

    async actualizarUsuario(id: number, updateDto: UpdateUsuarioDto){
        const usuario = await this.buscarPorId(id);

        if (updateDto.password) {
            updateDto.password = await bcrypt.hash(updateDto.password, 10);
        }

        Object.assign(usuario, updateDto);
        return this.usuarioRepository.save(usuario);
    }

    async actualizarUsuarioAdmin(dni: string, updateAdminDto: UpdateUsuarioAdminDto){
        const usuario = await this.buscarPorDni(dni);

        const { id_rol, ...updateData } = updateAdminDto;

        if (id_rol) {
            const rol = await this.rolRepository.findOne({ where: { id: id_rol } });
            if (!rol) throw new NotFoundException('El nuevo rol no existe');
            usuario.rol = rol;
        }

        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 10);
        }

        Object.assign(usuario, updateData);
        return this.usuarioRepository.save(usuario);
    }

    async eliminarUsuario(id: number){
        const usuario = await this.buscarPorId(id);
        usuario.active = false;
        
        await this.usuarioRepository.save(usuario);
        return { mensaje: `El usuario con DNI ${usuario.dni} ha sido desactivado exitosamente.` };
    }
}