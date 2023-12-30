import React, { useState } from "react";

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native'

import {CartProps} from '../../context/CartContext'

type CartItemProps = {
    data: CartProps;
    addAmount: () => void;
    removeAmount: () => void;
}

export function CartItem({data, addAmount, removeAmount} : CartItemProps ){

    const [amount, setAmount] = useState(data.amount)

    function handleIncrease(){
        addAmount(); // vai aumentar a quantidade no contexto do nosso carrinho
        setAmount(item => Number(item) + 1) // vai aumentar visualmente no app tbm
    };

    function handleDecrease(){
        removeAmount();

        if(amount === 0){
            setAmount(0)
            return
        }

        setAmount(item => Number(item) - 1)
    };

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.name}> { data.name } </Text>
                <Text style={styles.price}> { data.price } </Text>
            </View>
            
            <View style={styles.amountContainer}>
                <TouchableOpacity 
                    style={styles.buttonRemove}
                    onPress={handleDecrease}
                >
                    <Text> - </Text>
                </TouchableOpacity>

                <Text style={styles.amount}> { amount } </Text>

                <TouchableOpacity 
                    style={styles.buttonAdd}
                    onPress={handleIncrease}
                >
                    <Text> + </Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: '#DFDFDF',
        borderRadius: 2,
        marginBottom: 14,
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    name: {
        fontWeight: 'bold',
        fontSize: 18
    },
    price: {
        fontSize: 16
    },
    amountContainer: {
        marginTop: 14,
        marginBottom: 14,
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonAdd: {
        backgroundColor: '#168FFF',
        padding: 6,
        paddingLeft: 14,
        paddingRight: 14,
        borderRadius: 2,
    },
    buttonRemove: {
        backgroundColor: '#168FFF',
        padding: 6,
        paddingLeft: 14,
        paddingRight: 14,
        borderRadius: 2
    },
    amount: {
        marginLeft: 14,
        marginRight: 14
    }
})