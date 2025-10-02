import axios from 'axios';

export interface FormattedData {
  id: number;
  title: string;
  place_of_origin: string;
  artist_display: string;
  inscriptions: string | null;
  date_start: number | null;
  date_end: number | null;
}

interface Results {
  formattedData: FormattedData[];
  totalRecords: number;
}

async function fetchAndFormatData(page: number): Promise<Results> {
  const res = await axios.get(
    `https://api.artic.edu/api/v1/artworks?page=${page}`
  );

  type Artwork = (typeof res.data.data)[number];

  const formattedData: FormattedData[] = res?.data?.data.map(
    (artwork: Artwork) => ({
      id: artwork?.id,
      title: artwork?.title,
      place_of_origin: artwork?.place_of_origin,
      artist_display: artwork?.artist_display,
      inscriptions: artwork?.inscriptions ?? null,
      date_start: artwork?.date_start ?? null,
      date_end: artwork?.date_end ?? null,
    })
  );

  return { formattedData, totalRecords: res?.data?.pagination?.total ?? 0 };
}

export default fetchAndFormatData;
