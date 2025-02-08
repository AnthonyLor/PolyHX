import { Injectable } from '@nestjs/common';

const minerals = ['gold', 'silver', 'copper'];
const animals = ['rabbit', 'fox', 'deer'];

@Injectable()
export class MatrixService {
  generateMatrix(rows: number, cols: number): any[][] {
    const matrix: any[][] = [];

    for (let i = 0; i < rows; i++) {
      const row: any[] = [];
      for (let j = 0; j < cols; j++) {
        let cellType: string = 'empty';
        let content: string = '';

        const rand = Math.random();
        if (rand < 0.1) {
          cellType = 'animal';
          content = animals[Math.floor(Math.random() * animals.length)];
        } else if (rand < 0.3) {
          cellType = 'mineral';
          content = minerals[Math.floor(Math.random() * minerals.length)];
        }

        row.push({ type: cellType, content });
      }
      matrix.push(row);
    }

    return matrix;
  }
}
