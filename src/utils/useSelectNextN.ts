import { useState } from 'react';
import fetchAndFormatData, {
  type FormattedData,
} from '../utils/fetchAndFormatData';

type BooleanSetter = React.Dispatch<React.SetStateAction<boolean>>;
type FormattedDataSetter = React.Dispatch<
  React.SetStateAction<FormattedData[]>
>;

interface NextNReturn {
  selectedRows: FormattedData[];
  setSelectedRows: FormattedDataSetter;
  selectNextN: (n: number) => Promise<void>;
}
export default function useSelectNextN(
  data: FormattedData[],
  page: number,
  totalRecords: number,
  setIsOpen: BooleanSetter,
  setIsLoading: BooleanSetter
): NextNReturn {
  const [selectedRows, setSelectedRows] = useState<FormattedData[]>([]);

  const selectNextN = async (n: number) => {
    setIsLoading(true);

    if (isNaN(n) || n <= 0) {
      setIsLoading(false);
      return;
    }

    let currentSelection: FormattedData[] = [];

    if (n <= data.length) {
      currentSelection = data.slice(0, n);
    } else {
      currentSelection = [...data];
    }

    let needed = n - currentSelection.length;
    let nextPage = page + 1;

    while (needed > 0 && currentSelection.length < totalRecords) {
      const { formattedData } = await fetchAndFormatData(nextPage);

      for (const row of formattedData) {
        currentSelection.push(row as FormattedData);
        needed--;
        if (needed <= 0) break;
      }

      nextPage++;
      if (nextPage > Math.ceil(totalRecords / 12)) break;
    }

    setSelectedRows(currentSelection);
    setIsOpen(false);
    setIsLoading(false);
  };

  return { selectedRows, setSelectedRows, selectNextN };
}
