import {useContext} from 'react';

import {
    View,
    Text,
    StyleSheet,
    FlatList
} from 'react-native';

import {CartContext} from '../../context/CartContext';
import { CartItem } from '../../components/CartItem';

export function Cart(){

    const { cart, addItemCard, removeItemCart, totalItemsCart } = useContext(CartContext);

    return (
        <View style={styles.container} >

            <Text> Página Carrinho </Text>

            <FlatList
                data={cart}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <CartItem 
                        data={item} 
                        addAmount={ () => addItemCard(item)}
                        removeAmount={ () => removeItemCart(item) }
                    />
                ) }
                showsVerticalScrollIndicator={false}

                ListEmptyComponent={ () => <Text> Nenhum item no carrinho... </Text> }

                // vai sempre ser mostrado no final da Lista
                ListFooterComponent={() => 
                    <Text style={styles.total} > Total: R$ {totalItemsCart} </Text>
                }

            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
        paddingStart: 14,
        paddingEnd: 14,
        paddingTop: 14
    },
    total: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 24
    }
})