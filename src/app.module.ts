import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { LessonModule } from './lesson/lesson.module';
import { User } from './users/entities/user.entity';
import { Lesson } from './lesson/entities/lesson.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { RolesGuard } from './auth/guards/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ['.env'] }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'mysql',
          autoLoadEntities: true,
          synchronize: true,
          entities: [User, Lesson],
          host: configService.get('DB_HOST'),
          username: configService.get('DB_USER'),
          password: configService.get('DB_PASS'),
          database: configService.get('DB_NAME'),
          port: configService.get('DB_PORT'),
        };
      },
    }),
    UsersModule,
    LessonModule,
    AuthModule,
  ],
  controllers: [],
  providers: [JwtService, { provide: APP_GUARD, useClass: RolesGuard }],
})
export class AppModule {}
