import { FC } from "react";
import Card from "./Card";

interface Props {
  code: string;
  name: string;
}

const CurrencyCard: FC<Props> = ({ code, name }) => (
  <Card>
    <div className="text-2xl font-bold text-slate-300 uppercase">{code}</div>
    <div className="text-slate-400">{name}</div>
  </Card>
);

export default CurrencyCard;
