import { useState, useContext } from 'react'

import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
    TouchableOpacity
} from 'react-native';

import { Feather } from '@expo/vector-icons';
import { Product } from '../../components/Product'

import {useNavigation} from '@react-navigation/native'
import { CartContext, CartProps } from '../../context/CartContext'

export function Home(){
    const navigation = useNavigation();
    const { cart, addItemCard } = useContext(CartContext)

    const [products, setProducts] = useState([
        {
            id: '1',
            name: 'Blusa Masculina',
            price: 19.90,
        },
        {
            id: '2',
            name: 'Short',
            price: 16.50,
        },
        {
            id: '3',
            name: 'Boné',
            price: 45.00,
        },
        {
            id: '4',
            name: 'Tênis',
            price: 73.90,
        },
        {
            id: '5',
            name: 'Meia',
            price: 5.00,
        },
    ])

    function handleAddCart(item : CartProps){
        addItemCard(item)
    }

    return (
        <SafeAreaView style={styles.container} >

            <View style={styles.cartContent}>
                <Text style={styles.title}>Lista de Produtos</Text>
               
                <TouchableOpacity 
                    onPress={() => navigation.navigate('Cart')}
                    style={styles.cartButton}
                >
                    { cart.length >= 1 && (
                        <View style={styles.dot}>
                            <Text style={styles.dotText}>

                                {cart?.length}

                            </Text>
                        </View>
                    ) }

                    <Feather
                        name='shopping-cart'
                        size={30}
                        color='#000'
                    />
                </TouchableOpacity>
            </View>
            
            <FlatList
                //style={styles.list}
                data={products}
                keyExtractor={(item) => String(item.id) }
                renderItem={ ({item}) => 

                    <Product 
                        data={item}
                        addToCart={ () => handleAddCart(item)}
                    /> 
                }
            />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
        paddingEnd: 14,
        paddingStart: 14
    },
    cartContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 24,
        marginBottom: 24
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    cartButton: {

    },
    dot: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
        width: 20,
        height: 20,
        borderRadius: 12,
        position: 'absolute',
        zIndex: 10,
        bottom: -2,
        left: -4
    },
    dotText: {
        fontSize: 12,
        color: '#FFF'
    }
})