import { useQuery } from "@tanstack/react-query";
import { Image } from "../data";

async function fetchImages() {
  const response = await fetch("/images");

  if (!response.ok)
    throw new Error(`Failed to fetch with status ${response.status}`);

  return response.json();
}

export function useImages() {
  return useQuery<readonly Image[]>({
    queryKey: ["images"],
    queryFn: fetchImages,
  });
}
