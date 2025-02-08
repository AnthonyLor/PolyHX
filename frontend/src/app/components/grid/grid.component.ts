import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-grid',
  standalone: true,
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements AfterViewInit {

  @ViewChild('gridCanvas', { static: false }) gridCanvas!: ElementRef<HTMLCanvasElement>;

  private gridSystem!: GridSystem;

  ngAfterViewInit() {
    if (this.gridCanvas) {
      const gridMatrix = [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1]
      ];

      this.gridSystem = new GridSystem(gridMatrix, 1, 1);
      this.gridSystem.render(this.gridCanvas.nativeElement);
    }
  }
}

class GridSystem {
  private matrix: number[][];
  private cellSize = 40;
  private padding = 2;
  private player = { x: 1, y: 1, color: "orange" };
  private outlineContext!: CanvasRenderingContext2D;
  private uiContext!: CanvasRenderingContext2D;
  private topContext!: CanvasRenderingContext2D;

  constructor(matrix: number[][], playerX: number, playerY: number) {
    this.matrix = matrix;
    this.player.x = playerX;
    this.player.y = playerY;
    this.matrix[playerY][playerX] = 2;
  }

  private isValidMove(x: number, y: number): boolean {
    return this.matrix[this.player.y + y][this.player.x + x] === 0;
  }

  private updateMatrix(y: number, x: number, val: number) {
    this.matrix[y][x] = val;
  }

  private movePlayer = (event: KeyboardEvent) => {
    const { keyCode } = event;
    let moved = false;

    if (keyCode === 37 && this.isValidMove(-1, 0)) { // Left
      this.updateMatrix(this.player.y, this.player.x, 0);
      this.updateMatrix(this.player.y, this.player.x - 1, 2);
      this.player.x--;
      moved = true;
    } 
    else if (keyCode === 39 && this.isValidMove(1, 0)) { // Right
      this.updateMatrix(this.player.y, this.player.x, 0);
      this.updateMatrix(this.player.y, this.player.x + 1, 2);
      this.player.x++;
      moved = true;
    } 
    else if (keyCode === 38 && this.isValidMove(0, -1)) { // Up
      this.updateMatrix(this.player.y, this.player.x, 0);
      this.updateMatrix(this.player.y - 1, this.player.x, 2);
      this.player.y--;
      moved = true;
    } 
    else if (keyCode === 40 && this.isValidMove(0, 1)) { // Down
      this.updateMatrix(this.player.y, this.player.x, 0);
      this.updateMatrix(this.player.y + 1, this.player.x, 2);
      this.player.y++;
      moved = true;
    }

    if (moved) this.render(this.outlineContext.canvas);
  }

  private getContext(width: number, height: number, color: string, isTransparent = false): CanvasRenderingContext2D {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d") as CanvasRenderingContext2D;

    canvas.width = width;
    canvas.height = height;
    canvas.style.position = "absolute";
    canvas.style.background = color;
    if (isTransparent) canvas.style.backgroundColor = "transparent";

    return context;
  }

  render(canvas: HTMLCanvasElement) {
    const w = (this.cellSize + this.padding) * this.matrix[0].length - this.padding;
    const h = (this.cellSize + this.padding) * this.matrix.length - this.padding;

    canvas.width = w;
    canvas.height = h;

    this.outlineContext = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.uiContext = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.topContext = canvas.getContext("2d") as CanvasRenderingContext2D;

    for (let row = 0; row < this.matrix.length; row++) {
      for (let col = 0; col < this.matrix[row].length; col++) {
        const cellVal = this.matrix[row][col];
        let color = "#111";

        if (cellVal === 1) color = "#4488FF";
        else if (cellVal === 2) color = this.player.color;

        this.outlineContext.fillStyle = color;
        this.outlineContext.fillRect(
          col * (this.cellSize + this.padding),
          row * (this.cellSize + this.padding),
          this.cellSize, this.cellSize
        );
      }
    }

    this.uiContext.font = "20px Courier";
    this.uiContext.fillStyle = "white";
    this.uiContext.fillText("Grid Based System", 20, 30);
  }
}
