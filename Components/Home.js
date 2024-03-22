const { View, Text } = require("react-native");
import * as React from 'react';
import { Header } from './Header';

export const Home = () => {

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Header/>
        <Text>
            Home
        </Text>
      </View>      
    )
}
