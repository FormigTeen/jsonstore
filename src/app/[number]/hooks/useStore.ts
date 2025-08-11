import { getUrl, Store} from "@/app/services/stores";

type StoreParams = {
    number: string;
}
export const useStore = (store: Store) => {
    return {
        ...store,
        getPageUrl: getUrl(store),
    }
}