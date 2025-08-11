import { getUrl, Store} from "@/app/services/stores";

export const useStore = (store: Store) => {
    return {
        ...store,
        getPageUrl: getUrl(store),
    }
}