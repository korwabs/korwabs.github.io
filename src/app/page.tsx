import Header from "@/components/Header";
import Main from "@/components/Main";
import MainImage from "@/components/MainImage";

export default function Home() {
  return (
    <div className="grid gap-y-16 overflow-hidden">
      <div className="relative bg-background">
        <div className="max-w-7xl mx-auto">
          <div
            className={`relative z-10 pb-8 bg-background sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32`}
          >
            <Header />
            <Main />
          </div>
          <MainImage />
        </div>
      </div>
    </div>
  );
}
