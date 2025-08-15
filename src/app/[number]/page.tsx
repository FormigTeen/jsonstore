import Cover from "@/app/[number]/components/Cover";
import {getStore} from "@/app/services/stores";
import Navbar from "@/app/[number]/components/Navbar/Navbar";
import Catalog from "@/app/[number]/components/Catalog";
import Filter from "@/app/[number]/components/Filter/Filter";
import Confirm from "@/app/Confirm";

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
            <Filter store={store} />
            <Catalog store={store} />
            <Confirm store={store} />
        </>
    );
}
