import { Routes } from '@angular/router';
import { GameComponent } from './game/game.component'; // Ensure the correct path

export const routes: Routes = [
  { path: '', component: GameComponent }, // Set GameComponent as the default route
  { path: '**', redirectTo: '', pathMatch: 'full' } // Redirect any unknown routes to the main page
];
