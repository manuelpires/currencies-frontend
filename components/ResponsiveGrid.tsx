import { FC, PropsWithChildren } from "react";

const ResponsiveGrid: FC<PropsWithChildren> = ({ children }) => (
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">{children}</div>
);

export default ResponsiveGrid;
