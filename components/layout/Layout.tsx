import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }: { children: any }) {
  return (
    <>
      <Header />
      <div className="pt-[84px] xl:w-full sm:w-full h-full flex flex-col items-center sm:mt-0 mt-20 mx-auto">
        {children}
      </div>
      <Footer />
    </>
  );
}
