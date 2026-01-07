"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, ExternalLink } from "lucide-react";

interface MapConsentProps {
  latitude: number;
  longitude: number;
  zoom?: number;
  title: string;
  address: string;
  language?: "de" | "en";
}

const CONSENT_KEY = "openstreetmap_consent";

export const useMapConsent = () => {
  const [hasConsent, setHasConsent] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(CONSENT_KEY) === "true";
    }
    return false;
  });

  const giveConsent = () => {
    localStorage.setItem(CONSENT_KEY, "true");
    setHasConsent(true);
  };

  const revokeConsent = () => {
    localStorage.removeItem(CONSENT_KEY);
    setHasConsent(false);
  };

  return { hasConsent, giveConsent, revokeConsent };
};

const MapConsent = ({ latitude, longitude, zoom = 16, title, address, language = "de" }: MapConsentProps) => {
  const { hasConsent, giveConsent } = useMapConsent();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude - 0.005}%2C${latitude - 0.003}%2C${longitude + 0.005}%2C${latitude + 0.003}&layer=mapnik&marker=${latitude}%2C${longitude}`;
  const externalMapUrl = `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=${zoom}/${latitude}/${longitude}`;

  // Avoid rendering the <iframe> on the server or before client mount
  if (!mounted || !hasConsent) {
    return (
      <div className="bg-secondary/50 rounded-lg p-6 border border-border text-center">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <MapPin className="w-6 h-6 text-primary" />
        </div>
        <h4 className="font-semibold mb-2">{title}</h4>
        <p className="text-muted-foreground text-sm mb-4">{address}</p>
        <p className="text-muted-foreground text-sm mb-4">
          {language === "de"
            ? "Um die Karte anzuzeigen, müssen Sie der Nutzung von OpenStreetMap zustimmen. Dabei werden Daten an OpenStreetMap übertragen."
            : "To display the map, you must consent to the use of OpenStreetMap. Data will be transmitted to OpenStreetMap."
          }
        </p>
        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          <Button onClick={giveConsent} size="sm">
            {language === "de" ? "Karte laden" : "Load Map"}
          </Button>
          <a 
            href={externalMapUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="sm" className="w-full sm:w-auto">
              <ExternalLink className="w-4 h-4 mr-2" />
              {language === "de" ? "In OpenStreetMap öffnen" : "Open in OpenStreetMap"}
            </Button>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg overflow-hidden border border-border">
      <iframe
        src={mapUrl}
        width="100%"
        height="250"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={`Map: ${title}`}
        aria-label={`OpenStreetMap showing location of ${title} at ${address}`}
      />
      <div className="bg-secondary/50 p-3 flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{address}</span>
        <a 
          href={externalMapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline text-sm inline-flex items-center gap-1"
        >
          <ExternalLink className="w-3 h-3" />
          {language === "de" ? "Größere Karte" : "Larger map"}
        </a>
      </div>
    </div>
  );
};

export default MapConsent;
