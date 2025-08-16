import {getStore} from "@/app/services/stores";
import Navbar from "@/app/[number]/_components/Navbar/Navbar";
import Gallery from "@/app/[number]/produto/[slug]/components/Gallery";
import {findProduct} from "@/app/[number]/hooks/useProducts";
import Text from "@/app/[number]/produto/[slug]/components/Text";
import List from "@/app/[number]/produto/[slug]/components/List";
import Confirm from "@/app/Confirm";
import TransitionWrapper from "@/app/components/transition-wrapper";
import Title from "@/app/[number]/produto/[slug]/components/Title";

type PageOptions = {
    params: Promise<{ number: string; slug: string; }>;
}


export default async function Home({ params }: PageOptions) {

    const number = (await params).number
    const slug = (await params).slug
    const store = getStore(number)
    const product = findProduct(store, slug)

    if (!product) {
        throw new Error(`Product with slug "${slug}" not found in store "${store.title}"`);
    }
    return (
        <>
            <Navbar store={store} />
            <TransitionWrapper>
                <Title store={store} product={product} className="mt-3" />
                <List product={product} className="mt-3" />
                <Text product={product} />
                <Gallery product={product} />
            </TransitionWrapper>
            <Confirm store={store} hasStore />
        </>
    );
}
