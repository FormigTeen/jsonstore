'use client'
import {useAtom} from "jotai";
import {complementAtom, numberAtom} from "@/app/stores/address";

export const useAddress = (zip: string) => {

    const [defaultNumber, setDefaultNumber] = useAtom(numberAtom)
    const [defaultComplement, setDefaultComplement] = useAtom(complementAtom);

    const number = defaultNumber.zip === zip ? defaultNumber.value : "";
    const complement = defaultComplement.zip === zip ? defaultComplement.value : "";

    const setNumber = (value: string) => {
        setDefaultNumber({
            zip,
            value,
        });
    };

    const setComplement = (value: string) => {
        setDefaultComplement({
            zip,
            value,
        });
    };

    return {
        number,
        complement,
        setNumber,
        setComplement,
    };

}