import { UserEntity } from './app/user/user.entity';
import 'dotenv/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './app/user/user.controller';
import { UserModule } from './app/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: String(process.env.HOST_MONGO),
      port: Number(process.env.PORT_MONGO),
      database: String(process.env.DATABASE_MONGO),
      entities: [UserEntity],
      useUnifiedTopology: true,
    }),
    UserModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
