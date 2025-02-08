import { Controller, Get, Query } from '@nestjs/common';
import { MatrixService } from 'src/services/generate-world/generate-world.service';

@Controller('matrix')
export class MatrixController {
  constructor(private readonly matrixService: MatrixService) {}

  @Get()
  getMatrix(@Query('rows') rows: string, @Query('cols') cols: string) {
    const rowCount = parseInt(rows, 10);
    const colCount = parseInt(cols, 10);

    if (isNaN(rowCount) || isNaN(colCount)) {
      return {
        message: 'Rows and cols must be valid integers',
      };
    }

    const matrix = this.matrixService.generateMatrix(rowCount, colCount);
    return matrix;
  }
}
