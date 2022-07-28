import { FC, PropsWithChildren } from "react";

const Card: FC<PropsWithChildren> = ({ children }) => (
  <div className="text-center bg-slate-800 border-solid border border-slate-700 rounded-xl p-6">
    {children}
  </div>
);

export default Card;
