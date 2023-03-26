import { useState, useEffect } from "react";

interface Joke {
  id: string;
  value: string;
}

interface UseJokeSearchResult {
  options: string[];
  isLoading: boolean;
  error: string | null;
}

const useJokeSearch = (query: string): UseJokeSearchResult => {
  const [options, setOptions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (query.length < 3 || query.length > 120) {
        setOptions([query]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.chucknorris.io/jokes/search?query=${query}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch jokes");
        }

        const data: { result?: Joke[] } = await response.json();
        const jokes = data?.result?.map((joke) => joke.value) || [];
        setOptions(jokes);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Please try again, there is something went wrong");
        }
      }

      setIsLoading(false);
    };

    fetchData();
  }, [query]);

  return { options, isLoading, error };
};

export default useJokeSearch;
