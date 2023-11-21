import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { S3Module } from '../s3/s3.module';
import { I18nService } from 'src/i18n';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    S3Module
  ],
  controllers: [UserController],
  providers: [UserService, I18nService],
})
export class UserModule {}
