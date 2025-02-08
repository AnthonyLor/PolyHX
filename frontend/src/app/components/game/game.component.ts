import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule here
import { CommonModule } from '@angular/common'; // Import CommonModule
import axios from 'axios';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [FormsModule, CommonModule], // Include CommonModule here
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  rows: number = 0;
  cols: number = 0;
  matrix: any[] = [];

  constructor() {}

  // Function to get matrix from the backend API
  getMatrix(rows: number, cols: number): Promise<any> {
    return axios
      .get(`http://localhost:3000/matrix?rows=${rows}&cols=${cols}`)
      .then((response) => response.data)
      .catch((error) => {
        throw new Error('Error fetching matrix data');
      });
  }

  fetchMatrix() {
    if (this.rows > 0 && this.cols > 0) {
      this.getMatrix(this.rows, this.cols)
        .then((data) => {
          this.matrix = data;
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } else {
      console.error('Rows and columns must be greater than 0');
    }
  }
}
