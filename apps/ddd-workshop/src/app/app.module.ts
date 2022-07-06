import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileSystemRaumRepository } from './infrastructure/file-system-raum.repository';
import { RoomController } from './infrastructure/room.controller';

@Module({
  imports: [],
  controllers: [AppController, RoomController],
  providers: [AppService, FileSystemRaumRepository],
})
export class AppModule {}
