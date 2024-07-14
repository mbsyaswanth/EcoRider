import { useState, useEffect, useCallback, useRef } from "react";
import { openDB } from "idb";

const useLocationSearch = (debounceTime = 300, throttleTime = 1000) => {
  const [db, setDb] = useState(null);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const lastCallTime = useRef(0);
  const debounceTimeoutId = useRef(null);
  const throttleTimeoutId = useRef(null);

  useEffect(() => {
    const initDB = async () => {
      const database = await openDB("NominatimCache", 1, {
        upgrade(db) {
          db.createObjectStore("searchResults", { keyPath: "query" });
        }
      });
      setDb(database);
    };
    initDB();
  }, []);

  const performSearch = useCallback(
    async (query) => {
      if (!db || !query.trim()) return;

      setIsLoading(true);
      setError(null);

      try {
        let cacheStore = db
          .transaction("searchResults", "readwrite")
          .objectStore("searchResults");
        const cachedResult = await cacheStore.get(query);

        if (
          cachedResult &&
          Date.now() - cachedResult.timestamp < 24 * 60 * 60 * 1000
        ) {
          setResults(cachedResult.results);
          return;
        }

        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
            query
          )}&format=json&limit=10&countrycodes=in`,
          {
            headers: {
              "User-Agent": "YourAppName/1.0" // Replace with your app name and version
            }
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        const newResults = data.map((item) => ({
          place_id: item.place_id,
          name: item.name,
          address: item.display_name,
          lat: parseFloat(item.lat),
          lon: parseFloat(item.lon),
          bounding_box: item.boundingbox,
          type: item.type,
          address_type: item.addresstype
        }));

        cacheStore = db
          .transaction("searchResults", "readwrite")
          .objectStore("searchResults");
        await cacheStore.put({
          query,
          results: newResults,
          timestamp: Date.now()
        });

        setResults(newResults);
      } catch (err) {
        setError("An error occurred while searching. Please try again.");
        console.error("location search error", err);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    },
    [db]
  );

  const searchNominatim = useCallback(
    (query) => {
      setIsLoading(true);
      setError(null);

      // Clear any existing debounce timeout
      if (debounceTimeoutId.current) {
        clearTimeout(debounceTimeoutId.current);
      }

      // Clear any existing throttle timeout
      if (throttleTimeoutId.current) {
        clearTimeout(throttleTimeoutId.current);
      }

      // Set a new debounce timeout
      debounceTimeoutId.current = setTimeout(() => {
        const now = Date.now();
        if (now - lastCallTime.current >= throttleTime) {
          // If enough time has passed since the last call, perform the search immediately
          lastCallTime.current = now;
          console.log("Last call time: ", lastCallTime.current);
          console.log("Triggering debounced query: q= ", query);
          performSearch(query);
        } else {
          // Otherwise, set a throttle timeout to perform the search when the throttle period is over
          console.log(
            "Throttling request after millisec:",
            throttleTime - (now - lastCallTime.current)
          );
          if (throttleTimeoutId.current)
            clearTimeout(throttleTimeoutId.current);
          throttleTimeoutId.current = setTimeout(() => {
            lastCallTime.current = Date.now();
            console.log("Last call time: ", lastCallTime.current);
            console.log("Triggering throttled query: q= ", query);
            performSearch(query);
          }, throttleTime - (now - lastCallTime.current));
        }
      }, debounceTime);
    },
    [debounceTime, performSearch, throttleTime]
  );

  useEffect(() => {
    return () => {
      if (debounceTimeoutId.current) {
        clearTimeout(debounceTimeoutId.current);
      }
      if (throttleTimeoutId.current) {
        clearTimeout(throttleTimeoutId.current);
      }
    };
  }, []);

  return { searchNominatim, results, isLoading, error };
};

export default useLocationSearch;
