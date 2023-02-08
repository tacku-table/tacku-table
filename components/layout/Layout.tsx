import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }: { children: any }) {
  return (
    <div>
      <Header />
      <div style={{ border: "1px solid blue", height: 500 }}>{children}</div>
      <Footer />
    </div>
  );
}
