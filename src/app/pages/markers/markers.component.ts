import {
  AfterViewInit,
  Component,
  ElementRef,
  signal,
  viewChild,
} from '@angular/core';
import mapboxgl, { LngLatLike } from 'mapbox-gl';
import { environment } from '../../../environments/environment';
import { v4 as uuidV4 } from 'uuid';
import { JsonPipe } from '@angular/common';

mapboxgl.accessToken = environment.mapboxKey;

interface Marker {
  id: string;
  mapboxMarker: mapboxgl.Marker;
}

@Component({
  selector: 'app-markers',
  imports: [JsonPipe],
  templateUrl: './markers.component.html',
})
export class MarkersComponent implements AfterViewInit {
  divElement = viewChild<ElementRef>('map');
  map = signal<mapboxgl.Map | null>(null);
  markers = signal<Marker[]>([]);

  async ngAfterViewInit() {
    if (!this.divElement()) return;

    await new Promise((resolve) => {
      setTimeout(resolve, 80);
    });

    const element = this.divElement()?.nativeElement;

    const map = new mapboxgl.Map({
      container: element, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-122.40985, 37.793085], // starting position [lng, lat]
      zoom: 14, // starting zoom
    });

    this.mapListeners(map);
  }

  mapListeners(map: mapboxgl.Map) {
    map.on('click', (event) => this.onMapClick(event, map));

    this.map.set(map);
  }

  onMapClick(event: mapboxgl.MapMouseEvent, map: mapboxgl.Map) {
    console.log(event.lngLat);

    const { lng, lat } = event.lngLat;

    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );

    const mapboxMarker = new mapboxgl.Marker({ draggable: true, color })
      .setLngLat([lng, lat])
      .addTo(map);

    const newMarker: Marker = {
      id: uuidV4(),
      mapboxMarker,
    };

    this.markers.set([newMarker, ...this.markers()]);
    //esta tambien es valida
    // this.markers.update((markers) => [newMarker, ...markers]);

    console.log(this.markers());

    mapboxMarker.on('dragend', () => {
      console.log('dragend');
    });
  }

  flyToMarker(lngLat: LngLatLike) {
    if (!this.map()) return;
    this.map()?.flyTo({ center: lngLat });
  }

  deleteMarker(marker: Marker) {
    if (!this.map()) return;
    marker.mapboxMarker.remove();
    this.markers.set(this.markers().filter((m) => m.id !== marker.id));
  }
}
