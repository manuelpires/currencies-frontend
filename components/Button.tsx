import { FC, PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  onClick: () => void;
}

const Button: FC<Props> = ({ onClick, children }) => (
  <button
    className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full text-sm md:text-md"
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
