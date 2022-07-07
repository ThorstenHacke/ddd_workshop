import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileSystemPersonRepository } from './infrastructure/file-system-person.repository';
import { FileSystemRaumRepository } from './infrastructure/file-system-raum.repository';
import { PersonController } from './infrastructure/person/person.controller';
import { RoomController } from './infrastructure/room.controller';

@Module({
  imports: [],
  controllers: [AppController, RoomController, PersonController],
  providers: [AppService, FileSystemRaumRepository, FileSystemPersonRepository],
})
export class AppModule {}
