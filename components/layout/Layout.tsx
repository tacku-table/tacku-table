import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }: { children: any }) {

    return (
        <div>
            <Header />
            <div>{children}</div>
            <Footer />
        </div>
    );
}
