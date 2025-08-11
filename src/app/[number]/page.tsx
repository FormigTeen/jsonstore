import Cover from "@/app/[number]/components/Cover";
import {getStore} from "@/app/services/stores";
import Navbar from "@/app/[number]/components/Navbar/Navbar";
import {useStore} from "@/app/[number]/hooks/useStore";
import Banners from "@/app/[number]/components/Banners";

type PageOptions = {
    params: Promise<{ number: string; }>;
}

export default async function Home({ params }: PageOptions) {
    const number = (await params).number
    const store = getStore(number)
    return (
        <>
            <Navbar store={store} />
            <Cover store={store} />
            <Banners />
        </>
    );
}
