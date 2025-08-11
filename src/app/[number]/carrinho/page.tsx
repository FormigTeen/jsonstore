import Cover from "@/app/[number]/components/Cover";
import {getStore} from "@/app/services/stores";
import Navbar from "@/app/[number]/components/Navbar/Navbar";
import {useStore} from "@/app/[number]/hooks/useStore";
import Banners from "@/app/[number]/components/Banners";
import Cart from "@/app/Cart";
import Offers from "@/app/Offers";

type PageOptions = {
    params: Promise<{ number: string; }>;
}

export default async function Home({ params }: PageOptions) {
    const number = (await params).number
    const store = getStore(number)
    return (
        <>
            <Navbar store={store} />
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
