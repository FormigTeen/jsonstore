import {useQuery} from "react-query";

type ErrorResposne = {
    erro: "true";
}

type AddressResponse = {
    cep: string;
    logradouro: string;
    bairro: string;
    localidade: string;
    uf: string;
    estado: string;
    regiao: string;
}

const sanitizeZip = (zip: string) => zip.replace("-", "")

export const useZip = (zip: string) => useQuery<AddressResponse | ErrorResposne>(
    ['zip', sanitizeZip(zip)],
    async () => {
        const response = await fetch(`https://viacep.com.br/ws/${sanitizeZip(zip)}/json/`);
        if (!response.ok) {
            return {
                erro: "true"
            }
        }
        return response.json();
    },
    {
        enabled: !!zip && sanitizeZip(zip).length === 8,
        refetchOnWindowFocus: false,
    }
)