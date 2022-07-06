import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileSystemRaumRepository } from './infrastructure/file-system-raum.repository';
import { FileSystemRaumService } from './infrastructure/file-system-raum.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, FileSystemRaumRepository, FileSystemRaumService],
})
export class AppModule {}
