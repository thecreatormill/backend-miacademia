import { UsuariosModule } from './../usuarios/usuarios.module';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Module({
    imports: [
        UsuariosModule,
        JwtModule.registerAsync({
            global: true,
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.getOrThrow<string>('JWT_SECRET'),
                signOptions: {
                    expiresIn: '1h'
                }
            })
        
        })
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        JwtAuthGuard
    ]
})
export class AuthModule {}
