import React, { 
    useState, 
    createContext,
    ReactNode
} from 'react'

export type CartProps = {
    id: string;
    name: string;
    price: number;
    amount?: number;
    total?: number
}

type CartContextData = {
    cart: CartProps[];
    addItemCard: (newItem : CartProps) => void;
    removeItemCart: (product : CartProps) => void;
    totalItemsCart: number;
}

export const CartContext = createContext({} as CartContextData)

type CartProviderProps = {
    children: ReactNode;
}

export function CartProvider({ children } : CartProviderProps ){
   
    const [cart, setCart] = useState<CartProps[]>([]);
    const [totalItemsCart, setTotalItemsCart] = useState(0);


    function addItemCard(newItem : CartProps){
        // findIndex = vai percorrer toda a lista e se encontrar o item que estamos passando
        // ele vai devolver a posição do item
        const indexItem = cart.findIndex(item => item.id === newItem.id);

        if(indexItem !== -1){ // se for !== de -1 quer dizer que achou seu item.
            // se entrou aqui quer dizer que temos que adicionar +1 quantidade
            // pq ele já está na sua lista
            
            let cartList = cart;

            // adiciona mais um item, vc tem 1 coca, clicou na coca de novo, o valor passa a ser 2 coca
            cartList[indexItem].amount = (cartList[indexItem].amount || 0) + 1;

            // soma o valor dos items iguais
            cartList[indexItem].total = (cartList[indexItem].amount || 0) * cartList[indexItem].price;

            setCart(cartList);
            
            // sempre recalcular o valor do carrinho após adicionar um outro item
            totalResultCart(cartList);

            return;
        }

        let data = {
            ...newItem,
            amount: 1,
            total: newItem.price
        }

        setCart(products => [...products, data]);

        // passa todos os items do cart + o novo item (data) 
        totalResultCart([ ...cart, data ])
        
    };


    function removeItemCart(product : CartProps){
        const indexItem = cart.findIndex(item => item.id === product.id);

        if (cart[indexItem] && cart[indexItem].amount && (cart[indexItem].amount || 0) > 1) {
            
            let cartList = [...cart];

            cartList[indexItem].amount = (cartList[indexItem].amount || 0) - 1;
            
            // pega o valor total (ex 2 queijos: 30 reais), - (menos) o preço do queijo (15 reias)
            cartList[indexItem].total = 
                (cartList[indexItem].total || 0) - (cartList[indexItem].price || 0) 
            
            setCart(cartList);

            totalResultCart(cartList); // após remover um, refaz todo o calculo do valor
            // dos items no carrinho

            return;
        }

        // se tem apenas um item (ex: 1 queijo), e clico em diminuir ( - )
        // então remove o item do carrinho
        const removeItem = cart.filter( item => item.id !== product.id );
        setCart(removeItem);

        totalResultCart(removeItem); // após remover um, refaz todo o calculo do valor
        // dos items no carrinho

    };


    function totalResultCart(items: CartProps[]) : number {
        let result = items.reduce( (acc, obj) => {
            return acc + (obj.total || 0)
        }, 0 );

        setTotalItemsCart(Number(result.toFixed(2)));

        return result;
    };


    return (
        <CartContext.Provider
            value={{
                cart,
                addItemCard,
                removeItemCart,
                totalItemsCart
            }}
        >
            { children }
        </CartContext.Provider>
    )
}