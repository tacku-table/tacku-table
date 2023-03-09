import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }: { children: any }) {
    return (
        <>
            <Header />
            <div className="pt-28">{children}</div>
            <Footer />
        </>
    );
}
