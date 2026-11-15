'use client';

import Script from 'next/script';
import { useEffect, useRef, useState, type ReactNode } from 'react';

type NaverMaps = {
  LatLng: new (latitude: number, longitude: number) => unknown;
  Map: new (element: HTMLElement, options: { center: unknown; zoom: number; zoomControl: boolean; scrollWheel: boolean }) => { destroy(): void };
  Marker: new (options: { position: unknown; map: unknown; title: string }) => { setMap(map: null): void };
  Event: { once(target: unknown, name: string, handler: () => void): void };
};

export function NaverMap({ clientId, latitude, longitude, name, children }: {
  clientId: string;
  latitude: number;
  longitude: number;
  name: string;
  children: ReactNode;
}) {
  const canvas = useRef<HTMLDivElement>(null);
  const [sdkReady, setSdkReady] = useState(false);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    const maps = (window as Window & { naver?: { maps?: NaverMaps } }).naver?.maps;
    if (!sdkReady || !maps || !canvas.current) return;

    const position = new maps.LatLng(latitude, longitude);
    const map = new maps.Map(canvas.current, { center: position, zoom: 16, zoomControl: true, scrollWheel: false });
    const marker = new maps.Marker({ position, map, title: name });
    let mounted = true;
    maps.Event.once(map, 'tilesloaded', () => { if (mounted) setMapReady(true); });
    return () => {
      mounted = false;
      marker.setMap(null);
      map.destroy();
    };
  }, [sdkReady, latitude, longitude, name]);

  return <div className="naver-map">
    {children}
    <div ref={canvas} className="naver-map-canvas" data-ready={mapReady} aria-label={name + ' 네이버 지도'} aria-hidden={!mapReady} inert={!mapReady}/>
    <Script src={'https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=' + encodeURIComponent(clientId)} strategy="afterInteractive" onReady={() => setSdkReady(true)}/>
  </div>;
}
