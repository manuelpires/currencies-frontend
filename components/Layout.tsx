import { FC } from "react";
import Head from "next/head";

interface Props extends React.PropsWithChildren {
  title: string;
  description: string;
}

const Layout: FC<Props> = ({ title, description, children }) => (
  <div className="px-8">
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    {children}
  </div>
);

export default Layout;
