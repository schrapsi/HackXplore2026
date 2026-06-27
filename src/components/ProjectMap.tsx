import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Project } from '../types';

interface ProjectMapProps {
  projects: Project[];
  onFundProject: (project: Project) => void;
}

export function ProjectMap({ projects, onFundProject }: ProjectMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const userMarkerRef = useRef<L.Marker | null>(null);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = L.map(mapContainerRef.current, {
      zoomControl: true,
      scrollWheelZoom: true,
    });

    mapRef.current = map;

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      maxZoom: 20
    }).addTo(map);

    const style = document.createElement('style');
    style.innerHTML = `
      .leaflet-popup-content-wrapper {
        background: white !important;
        color: #1a1a1a !important;
        border-radius: 1rem !important;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
        padding: 0px !important;
        border: 1px solid #e0e6eb !important;
      }
      .leaflet-popup-content {
        margin: 8px !important;
        line-height: inherit !important;
      }
      .leaflet-popup-tip {
        background: white !important;
        border: 1px solid #e0e6eb !important;
        box-shadow: none !important;
      }
      .leaflet-container a.leaflet-popup-close-button {
        color: #7e8387 !important;
        padding: 6px 4px 0 0 !important;
        font-size: 16px !important;
      }
      .leaflet-container a.leaflet-popup-close-button:hover {
        color: #123250 !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      document.head.removeChild(style);
    };
  }, []);

  // Update projects on the map (Non-blinking markers)
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    if (projects.length === 0) return;

    const bounds = L.latLngBounds([]);

    projects.forEach(project => {
      const { lat, lng } = project.coordinates;
      if (typeof lat !== 'number' || typeof lng !== 'number' || isNaN(lat) || isNaN(lng)) return;

      // Clean, non-blinking marker HTML
      const markerHtml = `
        <div class="relative flex items-center justify-center w-8 h-8 group">
          <div class="relative w-8 h-8 bg-primary text-primary-content rounded-full flex items-center justify-center border-2 border-base-100 shadow-md group-hover:scale-110 transition-transform duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        html: markerHtml,
        className: 'custom-leaflet-marker',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -12]
      });

      const container = document.createElement('div');
      container.className = 'p-1 max-w-[260px] text-left';

      container.innerHTML = `
        <div class="rounded-xl overflow-hidden mb-2 relative">
          <img src="${project.imageUrl}" class="w-full h-28 object-cover" alt="${project.title}" />
          <span class="absolute top-2 left-2 badge badge-primary badge-sm font-semibold shadow-sm">${project.location}</span>
        </div>
        <div class="flex flex-col gap-1">
          <span class="text-[10px] uppercase font-bold text-accent tracking-wider">${project.categoryLabel}</span>
          <h3 class="font-bold text-sm text-primary leading-tight mb-1">${project.title}</h3>
          <p class="text-[11px] text-base-content/80 line-clamp-2 mb-2">${project.description}</p>
          <div class="flex justify-between items-center mb-3 bg-base-200/50 p-2 rounded-lg border border-base-300/30">
            <div>
              <span class="text-[8px] uppercase font-bold text-primary block">Launch Cost</span>
              <span class="font-extrabold text-xs text-base-content">€${project.initialCost.toLocaleString()}</span>
            </div>
            <div class="text-right">
              <span class="text-[8px] uppercase font-bold text-success block">Impact Metric</span>
              <span class="font-extrabold text-[10px] text-base-content line-clamp-1">${project.impactMetric}</span>
            </div>
          </div>
          <button class="btn btn-primary btn-sm w-full rounded-full shadow-sm text-xs font-semibold py-1.5 h-auto min-h-0 fund-btn">
            Fund this project
          </button>
        </div>
      `;

      const button = container.querySelector('.fund-btn');
      if (button) {
        button.addEventListener('click', (e) => {
          e.preventDefault();
          onFundProject(project);
        });
      }

      const marker = L.marker([lat, lng], { icon: customIcon })
        .addTo(map)
        .bindPopup(container);

      markersRef.current.push(marker);
      bounds.extend([lat, lng]);
    });

    // Fit map bounds to show all projects
    if (projects.length > 0) {
      map.fitBounds(bounds, {
        padding: [50, 50],
        maxZoom: 13,
      });
    }
  }, [projects, onFundProject]);

  // Update user location marker on the map
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (userMarkerRef.current) {
      userMarkerRef.current.remove();
      userMarkerRef.current = null;
    }

    if (userLocation) {
      const userMarkerHtml = `
        <div class="relative flex items-center justify-center w-8 h-8">
          <div class="absolute w-6 h-6 bg-accent/30 rounded-full animate-pulse"></div>
          <div class="w-3.5 h-3.5 bg-accent rounded-full border-2 border-white shadow-md"></div>
        </div>
      `;

      const userIcon = L.divIcon({
        html: userMarkerHtml,
        className: 'user-location-marker',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const marker = L.marker(userLocation, { icon: userIcon })
        .addTo(map)
        .bindPopup('<div class="text-xs font-semibold py-1 px-2 text-center text-base-content">You are here</div>');

      userMarkerRef.current = marker;
      map.flyTo(userLocation, 14);
    }
  }, [userLocation]);

  // Handle Fullscreen transitions (recalculate Leaflet dimensions)
  useEffect(() => {
    if (mapRef.current) {
      setTimeout(() => {
        mapRef.current?.invalidateSize();
      }, 150);
    }
  }, [isFullscreen]);

  // Handle Escape key to exit fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  // Geolocation trigger
  const handleLocateMe = () => {
    setLocationError(null);
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
      },
      (error) => {
        console.error("Error getting location:", error);
        setLocationError("Could not access your location. Please check browser permissions.");
        setTimeout(() => setLocationError(null), 4000);
      }
    );
  };

  return (
    <div className={`relative w-full bg-base-100 ${isFullscreen ? 'fixed inset-0 z-[5000] rounded-none p-4 md:p-6 bg-base-200' : 'flex-grow min-h-0 rounded-3xl border border-base-300 shadow-lg'}`}>
      
      {/* Map Element */}
      <div ref={mapContainerRef} className="w-full h-full z-0 rounded-2xl overflow-hidden" />

      {/* Floating Control Panel */}
      <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
        {/* Locate Me */}
        <button 
          onClick={handleLocateMe}
          className="btn btn-circle btn-primary bg-base-100 border border-base-300 text-base-content hover:bg-base-200 shadow-md"
          title="Show My Location"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
        </button>

        {/* Fullscreen Toggle */}
        <button 
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="btn btn-circle btn-primary bg-base-100 border border-base-300 text-base-content hover:bg-base-200 shadow-md"
          title={isFullscreen ? "Exit Fullscreen" : "Make Fullscreen"}
        >
          {isFullscreen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9L3 3m12 6V4.5m0 4.5h4.5m-4.5 0l6-6M9 15v4.5M9 15H4.5M9 15l-6 6m12-9v4.5m0-4.5h4.5m-4.5 0l6 6" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75v4.5m0-4.5h-4.5m4.5 0L15 9m5.25 11.25v-4.5m0 4.5h-4.5m4.5 0L15 15" />
            </svg>
          )}
        </button>
      </div>

      {/* Geolocation Error Toast overlay */}
      {locationError && (
        <div className="absolute bottom-4 left-4 z-[1000] toast toast-start">
          <div className="alert alert-error text-xs shadow-lg py-2 px-4 rounded-xl flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-4 w-4" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{locationError}</span>
          </div>
        </div>
      )}
    </div>
  );
}
