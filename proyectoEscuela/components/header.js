
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';

class HeaderComponent extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
    
      <View >
        <Header
         backgroundColor='#2089DC'
          leftComponent={{ icon: 'menu', color: '#fff',onPress:this.props.abrirDrawer }}
          centerComponent={{ text: this.props.titulo, style: { color: '#fff',fontWeight:"bold",fontSize:20,fontFamily:'sans-serif-medium' } }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
});

export default HeaderComponent;
