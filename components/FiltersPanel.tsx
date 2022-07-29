import { FC, useState } from "react";
import { Filter, Sort } from "../constants";
import Toggle from "./Toggle";
import Button from "./Button";

interface Props {
  onFiltersChange: (filter: Filter, checked: boolean) => void;
  onSortChange: (sort: Sort) => void;
}

const FiltersPanel: FC<Props> = ({ onFiltersChange, onSortChange }) => {
  const [isHideNotUSChecked, setHideNotUSChecked] = useState(false);
  const [isHideNotTestModeChecked, setHideNotTestModeChecked] = useState(false);

  const handleHideNotUSChange = (checked: boolean) => {
    setHideNotUSChecked(checked);
    onFiltersChange(Filter.HIDE_NOT_SUPPORTED_IN_US, checked);
  };

  const handleHideNotTestModeChange = (checked: boolean) => {
    setHideNotTestModeChecked(checked);
    onFiltersChange(Filter.HIDE_NOT_SUPPORTED_TEST_MODE, checked);
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <Toggle
        label="Hide not supported in the US"
        isChecked={isHideNotUSChecked}
        onChange={handleHideNotUSChange}
      />

      <Toggle
        label="Hide not available in Test Mode"
        isChecked={isHideNotTestModeChecked}
        onChange={handleHideNotTestModeChange}
      />

      <div
        className="inline-flex content-center gap-3 items-center rounded-md shadow-sm"
        role="group"
      >
        <span className="text-md text-slate-300">Sort:</span>

        <Button onClick={() => onSortChange(Sort.CODE)}>Symbol</Button>
        <Button onClick={() => onSortChange(Sort.NAME)}>Name</Button>
        <Button onClick={() => onSortChange(Sort.RANDOM)}>Random</Button>
      </div>
    </div>
  );
};

export default FiltersPanel;
