import {
  AfterViewInit,
  Component,
  ElementRef,
  input,
  signal,
  viewChild,
} from '@angular/core';
import mapboxgl, { LngLatLike } from 'mapbox-gl';
import { environment } from '../../../environments/environment';
import { v4 as uuidV4 } from 'uuid';
import { JsonPipe } from '@angular/common';

mapboxgl.accessToken = environment.mapboxKey;
@Component({
  selector: 'app-minimap',
  imports: [],
  templateUrl: './minimap.component.html',
})
export class MinimapComponent {
  divElement = viewChild<ElementRef>('map');
  map = signal<mapboxgl.Map | null>(null);
  lngLat = input<{ lng: number; lat: number }>();

  async ngAfterViewInit() {
    if (!this.divElement()) return;

    await new Promise((resolve) => {
      setTimeout(resolve, 80);
    });

    const element = this.divElement()?.nativeElement;
    const { lng, lat } = this.lngLat()!;
    console.log(lng, lat);

    const map = new mapboxgl.Map({
      container: element, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [lng, lat], // starting position [lng, lat]
      zoom: 14, // starting zoom
    });

    new mapboxgl.Marker().setLngLat(this.lngLat()!).addTo(map);
  }
}
