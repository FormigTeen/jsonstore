import Header from "@/app/Header";
import Gallery from "@/app/Gallery";
import Text from "@/app/Text";
import List from "@/app/List";
import Confirm from "@/app/Confirm";
import TitleCart from "@/app/TitleCart";
import Cart from "@/app/Cart";

export default function Home() {
  return (
      <>
          <Header
              brandHref="https://gramstore.com.br/storage/23371/logo-loja-juliana-4.png"
          />
          <TitleCart total={5000} />
          <Cart
              items={[
                  { id: 12, title: "Exemplo / 👗 Vestidinho Fashion Primavera Azul Tam M", price: 2999.99 },
                  { id: 13, title: "Exemplo / 👗 Vestidinho Fashion Primavera Azul Tam G", price: 2999.99 },
                  { id: 38, title: "Exemplo / 👗 Vestidinho Fashion Primavera Rosa Tam P", price: 2999.99 },
              ]}
          />
      </>
  );
}
