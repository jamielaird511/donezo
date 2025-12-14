"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

export interface AddressComponents {
  addressFormatted: string;
  placeId: string | null;
  lat: number | null;
  lng: number | null;
  addressStreetNumber: string;
  addressRoute: string;
  addressSubpremise: string;
  addressLocality: string;
  addressSublocality: string;
  addressAdminArea1: string;
  addressPostalCode: string;
  addressCountry: string;
}

interface AddressAutocompleteProps {
  value: string;
  onChange: (components: AddressComponents) => void;
  placeholder?: string;
  id?: string;
  className?: string;
}

declare global {
  interface Window {
    google: {
      maps: {
        places: {
          Autocomplete: new (
            inputField: HTMLInputElement,
            options?: {
              types?: string[];
              componentRestrictions?: { country: string };
            }
          ) => {
            addListener: (event: string, callback: () => void) => void;
            getPlace: () => {
              place_id?: string;
              formatted_address?: string;
              geometry?: {
                location?: {
                  lat: () => number;
                  lng: () => number;
                };
              };
            };
          };
          PlacesService: new (element: HTMLElement | null) => {
            getDetails: (request: {
              placeId: string;
              fields: string[];
            }, callback: (place: any | null, status: any) => void) => void;
          };
          places: {
            PlacesServiceStatus: {
              OK: string;
            };
          };
        };
      };
    };
  }
}

function extractAddressComponent(components: any[], type: string): string {
  const component = components.find((c) => c.types.includes(type));
  return component?.long_name || "";
}

export default function AddressAutocomplete({
  value,
  onChange,
  placeholder = "Enter your address",
  id = "address",
  className = "",
}: AddressAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isLoaded && inputRef.current && !autocompleteRef.current) {
      const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
        types: ["address"],
        componentRestrictions: { country: "nz" },
      });

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (place.place_id && place.formatted_address) {
          const location = place.geometry?.location;
          const lat = location ? location.lat() : null;
          const lng = location ? location.lng() : null;

          // Fetch full place details to get address_components
          const service = new window.google.maps.places.PlacesService(document.createElement("div"));
          service.getDetails(
            {
              placeId: place.place_id,
              fields: ["address_components", "formatted_address", "geometry", "place_id"],
            },
            (detailedPlace, status) => {
              if (status === "OK" && detailedPlace) {
                const components = detailedPlace.address_components || [];
                
                const addressComponents: AddressComponents = {
                  addressFormatted: detailedPlace.formatted_address || place.formatted_address || "",
                  placeId: place.place_id ?? null,
                  lat,
                  lng,
                  addressStreetNumber: extractAddressComponent(components, "street_number"),
                  addressRoute: extractAddressComponent(components, "route"),
                  addressSubpremise: extractAddressComponent(components, "subpremise"),
                  addressLocality: extractAddressComponent(components, "locality"),
                  addressSublocality: extractAddressComponent(components, "sublocality") || extractAddressComponent(components, "sublocality_level_1"),
                  addressAdminArea1: extractAddressComponent(components, "administrative_area_level_1"),
                  addressPostalCode: extractAddressComponent(components, "postal_code"),
                  addressCountry: extractAddressComponent(components, "country"),
                };
                
                onChange(addressComponents);
              } else {
                // Fallback: use basic place data if details fetch fails
                const addressComponents: AddressComponents = {
                  addressFormatted: place.formatted_address || "",
                  placeId: place.place_id ?? null,
                  lat,
                  lng,
                  addressStreetNumber: "",
                  addressRoute: "",
                  addressSubpremise: "",
                  addressLocality: "",
                  addressSublocality: "",
                  addressAdminArea1: "",
                  addressPostalCode: "",
                  addressCountry: "",
                };
                onChange(addressComponents);
              }
            }
          );
        }
      });

      autocompleteRef.current = autocomplete;
    }
  }, [isLoaded, onChange]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emptyComponents: AddressComponents = {
      addressFormatted: e.target.value,
      placeId: null,
      lat: null,
      lng: null,
      addressStreetNumber: "",
      addressRoute: "",
      addressSubpremise: "",
      addressLocality: "",
      addressSublocality: "",
      addressAdminArea1: "",
      addressPostalCode: "",
      addressCountry: "",
    };
    onChange(emptyComponents);
  };

  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
        strategy="lazyOnload"
        onLoad={() => setIsLoaded(true)}
      />
      <input
        ref={inputRef}
        id={id}
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        className={className}
      />
    </>
  );
}

