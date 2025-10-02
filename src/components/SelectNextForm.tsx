import { useState } from 'react';

interface SelectNextProps {
  selectNextN: (n: number) => void;
  isLoading: boolean;
}

function SelectNextForm({ selectNextN, isLoading }: SelectNextProps) {
  const [selectCount, setSelectCount] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectCount(e.target.value);
  };

  const handleSubmit = () => {
    const count = parseInt(selectCount, 10);
    if (!isNaN(count)) {
      selectNextN(count);
    }
  };

  return (
    <div className="flex flex-col border-2 rounded-md w-[15rem] px-4 py-2 absolute z-10 top-16 left-10 bg-white">
      <input
        id="count"
        type="number"
        value={selectCount}
        onChange={handleInputChange}
        placeholder="Enter value..."
        className="border-2 rounded-md p-2"
      />
      <button
        disabled={isLoading}
        className="border-2 rounded-md mt-2 cursor-pointer"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
}

export default SelectNextForm;
