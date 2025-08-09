import Header from "@/app/Header";
import Cover from "@/app/Cover";
import Banners from "@/app/Banners";

export default function Home() {
  return (
      <>
          <Header
              brandHref="https://gramstore.com.br/storage/23371/logo-loja-juliana-4.png"
          />
          <Cover />
          <Banners />
      </>
  );
}
