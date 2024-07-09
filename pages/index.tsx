import Container from "../components/container";
import Intro from "../components/intro";
import Layout from "../components/layout";
import Head from "next/head";

export default function Index() {
  return (
    <Layout>
      <Head>
        <title>Harry Akbar Ali M</title>
      </Head>
      <Container>
        <Intro />
        <div className="flex md:space-x-4 flex-col md:flex-row items-start md:items-top space-x-0">
          Resume
        </div>
      </Container>
    </Layout>
  );
}
