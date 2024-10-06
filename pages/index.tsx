import Link from "next/link";
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
        <h3 className="text-xl font-semibold">About</h3>
        <article className="text-sm text-justify">
          I'm a software engineer at NTUC FairPrice. I specialize in UI/UX,
          using tools such as Figma, Node.js, and React.js to deliver
          high-quality and user-friendly web applications.
          <br />
          <br />
          Before joining NTUC FairPrice, I gained valuable experience and skills
          in web development and project management at several companies,
          including GudangAda, STOQO, and Shopee. Additionally, I served as an
          industrial trainer for web frontend development at Glints, where I
          provided consultation and guidance to students and ran workshops on
          technical topics.
          <br />
          <br />I have a bachelor's degree in Computer Science from University
          of Indonesia, where I also worked as a teaching assistant and
          participated in several internships.
        </article>
        <h3 className="text-xl font-semibold mt-3">Resume</h3>
        <Link
          className="text-blue-700 hover:underline text-sm"
          href="https://files.harryakbar.dev/Resume_HarryAkbarAliMunir-15.pdf"
          target="_blank"
          rel="noopener noreferrer"
          download
        >
          Download here
        </Link>
        <h3 className="text-xl font-semibold mt-3">Personal Project</h3>
        <p className="text-sm italic">
          These are some of the tools that I built in my free time,{" "}
          <Link className="text-blue-700 hover:underline" href="/app">
            click here
          </Link>
        </p>
      </Container>
    </Layout>
  );
}
