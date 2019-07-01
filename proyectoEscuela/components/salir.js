
import React from 'react';
import { View, Text, StyleSheet, Image,AsyncStorage } from 'react-native';

class SalirComponent extends React.Component {
  constructor(props) {
    super(props);
    this.salir();
    
  }

  static navigationOptions = {
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('../assets/salir.png')}
        style={[styles.icon]}
      />
    ),
  };
  
 async salir(){
    await AsyncStorage.removeItem('usuario');
    this.props.navigation.navigate('Login');
  }

  render() {

    return (
    
      <View></View>
    );
  }

}


const styles = StyleSheet.create({
    icon: {
        width: 24,
        height: 24
      }
});

export default SalirComponent;
