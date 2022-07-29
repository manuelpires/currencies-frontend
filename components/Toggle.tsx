import { FC } from "react";

interface Props {
  label: string;
  isChecked: boolean;
  onChange: (checked: boolean) => void;
}

const Toggle: FC<Props> = ({ label, isChecked, onChange }) => (
  <label className="inline-flex relative items-center cursor-pointer">
    <input
      type="checkbox"
      className="sr-only peer"
      checked={isChecked}
      onChange={(event) => onChange(event.target.checked)}
    />
    <div className="w-11 h-6 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-30 rounded-full peer bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all border-gray-600 peer-checked:bg-pink-600"></div>
    <span className="ml-3 text-md text-slate-300">{label}</span>
  </label>
);

export default Toggle;
