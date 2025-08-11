import dinero, {Currency} from 'dinero.js'

export const toString =
    (value: number, currency: Currency = 'BRL') =>
        dinero({ amount: value, currency })
            .toUnit()
            .toLocaleString('pt-BR', { style: 'currency', currency });
