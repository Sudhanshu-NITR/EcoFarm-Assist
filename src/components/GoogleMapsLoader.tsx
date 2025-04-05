"use client";

import { useEffect } from "react";

export default function GoogleMapsLoader() {
  useEffect(() => {
    async function loadMapsLibs() {
      if (window.google && google.maps) {
        try {
          await google.maps.importLibrary("places");
          await google.maps.importLibrary("geometry");
          console.log("Google Maps libraries loaded.");
        } catch (err) {
          console.error("Error loading Google Maps libraries:", err);
        }
      } else {
        console.error("Google Maps JS API not available.");
      }
    }

    loadMapsLibs();
  }, []);

  return null;
}
