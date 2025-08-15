import Cover from "@/app/[number]/_components/Cover";
import {getStore} from "@/app/services/stores";
import Navbar from "@/app/[number]/_components/Navbar/Navbar";
import Catalog from "@/app/[number]/_components/Catalog";
import Filter from "@/app/[number]/_components/Filter/Filter";
import Confirm from "@/app/Confirm";
import TransitionWrapper from "@/app/components/transition-wrapper";

type PageOptions = {
    params: Promise<{ number: string; }>;
}


export default async function Home({ params }: PageOptions) {
    const number = (await params).number
    const store = getStore(number)
    return (
        <>
            <TransitionWrapper>
                <Navbar store={store} />
                <Cover store={store} />
                <Filter store={store} />
                <Catalog store={store} />
                <Confirm store={store} />
            </TransitionWrapper>
        </>
    );
}
