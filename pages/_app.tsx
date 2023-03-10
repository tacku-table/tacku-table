import Layout from "@/components/layout/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loding from "@/components/loding/Loding";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const start = () => {
      setIsLoading(true);
    };
    const end = () => {
      setIsLoading(false);
    };
    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", end);
    router.events.on("routeChangeError", end);
    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", end);
      router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <Loding />
      ) : (
        <QueryClientProvider client={queryClient}>
          <Layout>
            <Component {...pageProps} />
            <ToastContainer />
          </Layout>
        </QueryClientProvider>
      )}
    </>
  );
}
