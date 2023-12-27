import Header from "@/components/Header";
import Main from "@/components/Main";

export default function Home() {
  return (
    <body
      style={{ fontFamily: "'Source Sans Pro', sans-serif;" }}
      className="leading-normal tracking-normal text-white gradient"
    >
      <Header />
      <Main />
    </body>
  );
}
