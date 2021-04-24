import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { Files, FilesSchema } from './schemas/files.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{name: Files.name, schema: FilesSchema}]),
    AuthModule
  ],
  controllers: [FilesController],
  providers: [FilesService],
  exports: [FilesService]
})
export class FilesModule {}
