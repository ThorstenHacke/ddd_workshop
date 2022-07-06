import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileSystemRaumRepository } from './infrastructure/file-system-raum.repository';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, FileSystemRaumRepository],
})
export class AppModule {}
