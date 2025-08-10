import Header from "@/app/Header";
import Cover from "@/app/Cover";
import Banners from "@/app/Banners";
import Offers from "@/app/Offers";
import Filter from "@/app/Filter";
import Catalog from "@/app/Catalog";

export default function Home() {
  return (
      <>
          <Header
              brandHref="https://gramstore.com.br/storage/23371/logo-loja-juliana-4.png"
          />
          <Cover />
          <Filter />
          <Catalog />
      </>
  );
}
