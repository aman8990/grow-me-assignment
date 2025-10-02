import { Column } from 'primereact/column';
import { DataTable, type DataTablePageEvent } from 'primereact/datatable';
import { useEffect, useState } from 'react';
import fetchAndFormatData, {
  type FormattedData,
} from '../utils/fetchAndFormatData';
import useSelectNextN from '../utils/useSelectNextN';
import SelectNextForm from './SelectNextForm';
import getColumns from '../utils/getColumns';

function Table() {
  const columns = getColumns();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<FormattedData[]>([]);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { selectedRows, setSelectedRows, selectNextN } = useSelectNextN(
    data,
    page,
    totalRecords,
    setIsOpen,
    setIsLoading
  );

  const fetchData = async (page: number) => {
    setIsLoading(true);

    const { formattedData, totalRecords } = await fetchAndFormatData(page);

    setData(formattedData);
    setTotalRecords(totalRecords);

    setIsLoading(false);
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const onPageChange = (e: DataTablePageEvent) => {
    setPage(e.page! + 1);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isOpen && (
        <SelectNextForm selectNextN={selectNextN} isLoading={isLoading} />
      )}

      <div
        className="text-5xl cursor-pointer text-black absolute top-3 left-14 z-10"
        onClick={() => handleToggle()}
      >
        <i className="pi pi-chevron-down" style={{ fontSize: '1rem' }} />
      </div>

      <DataTable
        value={data}
        paginator
        loading={isLoading}
        rows={12}
        totalRecords={totalRecords}
        onPage={onPageChange}
        lazy
        first={(page - 1) * 12}
        showGridlines
        selectionMode="checkbox"
        selection={selectedRows}
        onSelectionChange={(e) => setSelectedRows(e.value)}
        tableStyle={{ minWidth: '50rem' }}
      >
        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />

        {columns.map((col) => (
          <Column
            key={col.field}
            field={col.field}
            header={col.header}
            headerClassName="text-center"
            bodyClassName="text-center"
            alignHeader="center"
          />
        ))}
      </DataTable>
    </>
  );
}

export default Table;
