import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import {CartProps} from '../../context/CartContext';

type ProductProps = {
    data: CartProps,
    addToCart: () => void
}

export function Product({data, addToCart} : ProductProps){
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}> {data.name} </Text>
                <Text style={styles.price}> R$ {data.price} </Text>
            </View>
            <TouchableOpacity 
                style={styles.buttonAdd}
                onPress={addToCart}    
            >
                <Text style={styles.buttonText}> + </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: '#DFDFDF',
        marginBottom: 14,
        padding: 8,
        paddingBottom: 14,
        paddingTop: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        fontWeight: 'bold'
    },
    price: {
        fontWeight: 'bold'
    },
    buttonAdd: {
        paddingStart: 12,
        paddingEnd: 12,
        backgroundColor: '#168FFF',
        paddingTop: 6,
        paddingBottom: 6,
        borderRadius: 2
    },
    buttonText: {
        color: '#FFF'
    },
})