"use client";

import { useEffect, useRef, useState } from "react";
import * as maplibregl from "maplibre-gl";
import type { StyleSpecification } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { DEFAULT_HUDDLE_RADIUS_METERS, type Huddle } from "../../data/gatherings";

type NumberedHuddle = Huddle & { number: number };

type HuddleMapProps = {
  huddles: NumberedHuddle[];
  selectedId: string | null;
  onSelect: (id: string) => void;
};

// OpenFreeMap: free, no API key, no usage limits. Map data © OpenStreetMap contributors.
const STYLE_URL = "https://tiles.openfreemap.org/styles/positron";

// MapLibre does its heavy lifting in a background worker script. Webpack can't find it
// on its own, so `pnpm install` copies it into /public (see "postinstall" in package.json).
maplibregl.setWorkerUrl(`/maplibre-gl-worker.mjs?v=${maplibregl.getVersion()}`);

const COLUMBUS: [number, number] = [-82.9988, 39.9612]; // [lng, lat]
const MAX_ZOOM = 14; // capped so nobody can zoom down to street level

// Site palette (globals.css)
const C = {
  jaguar: "#000114",
  biscay: "#12325f",
  mariner: "#1e4cea",
  portage: "#91a9f4",
  wildsand: "#f4f4f4",
};

/**
 * Recolors OpenFreeMap's "Positron" style to the RISE palette.
 * Keys are layer ids from that style; tweak any color here.
 */
const BRAND_PAINT: Record<string, Record<string, string>> = {
  background: { "background-color": C.wildsand },
  park: { "fill-color": "#e3e9f7" },
  landcover_wood: { "fill-color": "#e3e9f7" },
  landuse_residential: { "fill-color": "#eeeef0" },
  building: { "fill-color": "#e9eaee", "fill-outline-color": "#dfe1e7" },
  water: { "fill-color": "#c9d5fb" },
  waterway: { "line-color": "#b4c5f8" },
  highway_minor: { "line-color": "#e2e5ec" },
  highway_major_casing: { "line-color": "#d5dae6" },
  highway_motorway_casing: { "line-color": "#c7cfe2" },
  highway_motorway_bridge_casing: { "line-color": "#c7cfe2" },
  railway: { "line-color": "#dde1ea" },
  railway_transit: { "line-color": "#dde1ea" },
  railway_service: { "line-color": "#dde1ea" },
  water_name_point_label: { "text-color": "#4a63b5" },
  water_name_line_label: { "text-color": "#4a63b5" },
  "highway-name-minor": { "text-color": "#7a869c" },
  "highway-name-major": { "text-color": "#6a7891" },
  label_other: { "text-color": "#5a6f92" },
  label_village: { "text-color": C.biscay },
  label_town: { "text-color": C.biscay },
  label_city: { "text-color": C.biscay },
  label_city_capital: { "text-color": C.biscay },
};

function brandStyle(style: StyleSpecification): StyleSpecification {
  return {
    ...style,
    layers: style.layers.map((layer) => {
      const paint = BRAND_PAINT[layer.id];
      return paint && "paint" in layer ? ({ ...layer, paint: { ...layer.paint, ...paint } } as typeof layer) : layer;
    }),
  };
}

const radiusOf = (h: Huddle) => h.radiusMeters ?? DEFAULT_HUDDLE_RADIUS_METERS;

/** Rough meters → degrees, good enough at city scale. */
function offsets(lat: number, meters: number) {
  const dLat = meters / 111_320;
  return { dLat, dLng: meters / (111_320 * Math.cos((lat * Math.PI) / 180)) };
}

function circlePolygon(h: Huddle) {
  const { dLat, dLng } = offsets(h.approxLat, radiusOf(h));
  const ring: [number, number][] = [];
  for (let i = 0; i <= 64; i++) {
    const a = (i / 64) * 2 * Math.PI;
    ring.push([h.approxLng + dLng * Math.cos(a), h.approxLat + dLat * Math.sin(a)]);
  }
  return { type: "Feature" as const, properties: {}, geometry: { type: "Polygon" as const, coordinates: [ring] } };
}

const escapeHtml = (text: string) =>
  text.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function pinElement(h: NumberedHuddle) {
  const el = document.createElement("button");
  el.type = "button";
  el.title = h.name;
  el.setAttribute("aria-label", `Show ${h.name} on the map`);
  el.className = "relative block h-[42px] w-8 cursor-pointer drop-shadow-md";
  el.innerHTML = `
    <svg viewBox="0 0 32 42" class="h-full w-full" aria-hidden="true">
      <path d="M16 1C7.7 1 1 7.6 1 15.8 1 27 16 41 16 41s15-14 15-25.2C31 7.6 24.3 1 16 1z" fill="${C.biscay}" stroke="#fff" stroke-width="2"/>
    </svg>
    <span class="absolute inset-x-0 top-[7px] text-center font-display text-sm font-bold text-white">${h.number}</span>
    <span class="absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded-md bg-white px-2 py-0.5 font-display text-xs font-bold text-jaguar shadow">${escapeHtml(h.neighborhood)}</span>`;
  return el;
}

function areaLabelElement(h: NumberedHuddle) {
  const el = document.createElement("div");
  el.className =
    "pointer-events-none whitespace-nowrap rounded-md bg-white px-2 py-0.5 font-display text-sm font-bold text-jaguar shadow";
  el.textContent = `${h.number} · ${h.neighborhood}`;
  return el;
}

export default function HuddleMap({ huddles, selectedId, onSelect }: HuddleMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [ready, setReady] = useState(false);

  // Create the map once
  useEffect(() => {
    let cancelled = false;
    let map: maplibregl.Map | undefined;

    fetch(STYLE_URL)
      .then((res) => res.json())
      .then((style: StyleSpecification) => {
        if (cancelled || !containerRef.current) return;
        map = new maplibregl.Map({
          container: containerRef.current,
          style: brandStyle(style),
          center: COLUMBUS,
          zoom: 11,
          minZoom: 9,
          maxZoom: MAX_ZOOM,
          scrollZoom: false, // don't hijack page scrolling
          dragRotate: false,
          pitchWithRotate: false,
          touchPitch: false,
          attributionControl: { compact: true },
        });
        map.touchZoomRotate.disableRotation();
        map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");

        map.on("load", () => {
          map!.addSource("area", { type: "geojson", data: { type: "FeatureCollection", features: [] } });
          map!.addLayer({
            id: "area-fill",
            type: "fill",
            source: "area",
            paint: { "fill-color": C.portage, "fill-opacity": 0.35 },
          });
          map!.addLayer({
            id: "area-outline",
            type: "line",
            source: "area",
            paint: { "line-color": C.mariner, "line-width": 2 },
          });
          mapRef.current = map!;
          setReady(true);
        });
      })
      .catch((err) => console.error("Huddle map failed to load", err));

    return () => {
      cancelled = true;
      map?.remove();
      mapRef.current = null;
    };
  }, []);

  // Pins, the selected area, and framing
  useEffect(() => {
    const map = mapRef.current;
    if (!ready || !map) return;

    const selected = huddles.find((h) => h.id === selectedId);
    const markers: maplibregl.Marker[] = [];

    for (const h of huddles) {
      if (h.id === selectedId) continue;
      const el = pinElement(h);
      el.addEventListener("click", () => onSelect(h.id));
      markers.push(new maplibregl.Marker({ element: el, anchor: "bottom" }).setLngLat([h.approxLng, h.approxLat]).addTo(map));
    }

    // Selected huddle: an approximate area instead of a pin
    (map.getSource("area") as maplibregl.GeoJSONSource).setData({
      type: "FeatureCollection",
      features: selected ? [circlePolygon(selected)] : [],
    });
    if (selected) {
      markers.push(
        new maplibregl.Marker({ element: areaLabelElement(selected), anchor: "center" })
          .setLngLat([selected.approxLng, selected.approxLat])
          .addTo(map),
      );
    }

    const targets = selected ? [selected] : huddles;
    if (targets.length > 0) {
      const bounds = new maplibregl.LngLatBounds();
      for (const h of targets) {
        const { dLat, dLng } = offsets(h.approxLat, radiusOf(h) * 1.3);
        bounds.extend([h.approxLng - dLng, h.approxLat - dLat]);
        bounds.extend([h.approxLng + dLng, h.approxLat + dLat]);
      }
      map.fitBounds(bounds, { padding: 40, maxZoom: 13, duration: 600 });
    }

    return () => markers.forEach((m) => m.remove());
  }, [ready, huddles, selectedId, onSelect]);

  return <div ref={containerRef} className="h-full w-full" />;
}
