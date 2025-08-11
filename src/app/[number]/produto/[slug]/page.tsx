import {getStore} from "@/app/services/stores";
import Navbar from "@/app/[number]/components/Navbar/Navbar";
import Gallery from "@/app/[number]/produto/[slug]/components/Gallery";

type PageOptions = {
    params: Promise<{ number: string; }>;
    searchParams?: Promise<{ categoria?: string; }>;
}


export default async function Home({ params, searchParams }: PageOptions) {
    const number = (await params).number
    const store = getStore(number)
    return (
        <>
            <Navbar store={store} />
            <Gallery />
        </>
    );
}
