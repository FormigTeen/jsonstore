import { atomWithStorage } from "jotai/utils";

export type AddressField = {
    zip: string;
    value: string;
}

export const numberAtom = atomWithStorage<AddressField>(
    'address.number',
    {
        zip: "",
        value: "",
    }
)

export const complementAtom = atomWithStorage<AddressField>(
    'address.complement',
    {
        zip: "",
        value: "",
    }
)