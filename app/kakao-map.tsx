'use client';

import Script from 'next/script';
import { useEffect, useRef, useState, type ReactNode } from 'react';

type KakaoMaps = {
  load(callback: () => void): void;
  LatLng: new (latitude: number, longitude: number) => unknown;
  Map: new (element: HTMLElement, options: { center: unknown; level: number; scrollwheel: boolean; keyboardShortcuts: boolean }) => { addControl(control: unknown, position: number): void };
  Marker: new (options: { position: unknown; map: unknown; title: string }) => { setMap(map: null): void };
  ZoomControl: new () => unknown;
  ControlPosition: { RIGHT: number };
  event: {
    addListener(target: unknown, name: string, handler: () => void): void;
    removeListener(target: unknown, name: string, handler: () => void): void;
  };
};

export function KakaoMap({ appKey, latitude, longitude, name, children }: {
  appKey: string;
  latitude: number;
  longitude: number;
  name: string;
  children: ReactNode;
}) {
  const canvas = useRef<HTMLDivElement>(null);
  const [sdkReady, setSdkReady] = useState(false);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    const maps = (window as Window & { kakao?: { maps?: KakaoMaps } }).kakao?.maps;
    const element = canvas.current;
    if (!sdkReady || !maps || !element) return;

    let active = true;
    let dispose = () => {};
    maps.load(() => {
      if (!active) return;
      const position = new maps.LatLng(latitude, longitude);
      const map = new maps.Map(element, { center: position, level: 4, scrollwheel: false, keyboardShortcuts: true });
      const marker = new maps.Marker({ position, map, title: name });
      map.addControl(new maps.ZoomControl(), maps.ControlPosition.RIGHT);
      const showMap = () => setMapReady(true);
      maps.event.addListener(map, 'tilesloaded', showMap);
      dispose = () => {
        maps.event.removeListener(map, 'tilesloaded', showMap);
        marker.setMap(null);
        element.replaceChildren();
      };
    });
    return () => { active = false; dispose(); };
  }, [sdkReady, latitude, longitude, name]);

  return <div className="kakao-map">
    {children}
    <div ref={canvas} className="kakao-map-canvas" data-ready={mapReady} aria-label={name + ' 카카오맵'} aria-hidden={!mapReady} inert={!mapReady}/>
    <Script src={'https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=' + encodeURIComponent(appKey)} strategy="afterInteractive" onReady={() => setSdkReady(true)}/>
  </div>;
}
