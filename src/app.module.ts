import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { S3Module } from './s3/s3.module';
import { LanguageHandler } from './language-handler';
import { I18nService } from './i18n';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.MONGODB_URL,
      useNewUrlParser: true,
      database: 'questr_users',
      entities: [User],
      synchronize: true,
    }),
    UserModule,
    S3Module 
  ],
  providers: [I18nService]
})
export class AppModule {}
