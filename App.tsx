import { Text, View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'

import { Routes } from './src/routes'
import { CartProvider } from './src/context/CartContext'

export default function App() {
  return (
    <NavigationContainer>
      
      <CartProvider>
        <StatusBar 
          barStyle='dark-content' 
          backgroundColor='#FAFAFA'
        />

        <Routes/>
        
      </CartProvider>
    
    </NavigationContainer>
  );
}
