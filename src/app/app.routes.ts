import { Routes } from '@angular/router';
import { FullScreenMapComponent } from './pages/full-screen-map/full-screen-map.component';
import { MarkersComponent } from './pages/markers/markers.component';
import { HousesComponent } from './pages/houses/houses.component';

export const routes: Routes = [
  {
    title: 'Fullscreen Map',
    component: FullScreenMapComponent,
    path: 'fullscreen',
  },
  {
    title: 'Markers',
    component: MarkersComponent,
    path: 'markers',
  },
  {
    title: 'Houses',
    component: HousesComponent,
    path: 'houses',
  },
  {
    redirectTo: 'fullscreen',
    path: '**',
  },
];
