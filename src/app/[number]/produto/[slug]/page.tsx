import {getStore} from "@/app/services/stores";
import Navbar from "@/app/[number]/components/Navbar/Navbar";
import Gallery from "@/app/[number]/produto/[slug]/components/Gallery";
import {findProduct} from "@/app/[number]/hooks/useProducts";
import Text from "@/app/[number]/produto/[slug]/components/Text";

type PageOptions = {
    params: Promise<{ number: string; slug: string; }>;
    searchParams?: Promise<{ categoria?: string; }>;
}


export default async function Home({ params, searchParams }: PageOptions) {

    const number = (await params).number
    const slug = (await params).slug
    const store = getStore(number)
    const product = findProduct(store, slug)
    console.log({
        store, slug
    })

    if (!product) {
        throw new Error(`Product with slug "${slug}" not found in store "${store.title}"`);
    }
    return (
        <>
            <Navbar store={store} />
            <Gallery product={product} />
            <Text product={product} />
        </>
    );
}
