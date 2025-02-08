import { Module } from '@nestjs/common';
import { MatrixController } from './matrix/matrix.controller';
import { MatrixService } from './services/generate-world/generate-world.service';

@Module({
  imports: [],
  controllers: [MatrixController],
  providers: [MatrixService],
})
export class AppModule {}
