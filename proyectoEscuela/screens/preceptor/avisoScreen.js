import React, { Component } from 'react';
import { View,Text, Image, StyleSheet,Icon,Dimensions } from 'react-native';
import  HeaderComponent  from '../../components/header';
import {  Container, Content,Button, Form, Item, Input, Label, Picker } from 'native-base';

const { width:WIDTH } = Dimensions.get('window');

class AvisoScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected2: undefined
    };

  }

  static navigationOptions = {
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('../../assets/aviso.png')}
        style={[styles.icon]}
      />
    ),
  };

  abrirDrawer = () =>{
    this.props.navigation.openDrawer();
  }

  onValueChange2(value) {
    this.setState({
      selected2: value
    });
  }

   render() {
    return (
      <Container>
        <HeaderComponent titulo="Enviar Aviso" abrirDrawer={this.abrirDrawer} />
        <Content>
          <Form>

          <Item stackedLabel style={[styles.input]}>
              <Label style={[styles.label]}>Año</Label>
              <Item picker>
              <Picker
                mode="dropdown"
                placeholder="Select your SIM"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.selected2}
                onValueChange={this.onValueChange2.bind(this)}
              >
                <Picker.Item label="1" value="1" />
                <Picker.Item label="2" value="2" />
                <Picker.Item label="3" value="3" />
                <Picker.Item label="4" value="4" />
                <Picker.Item label="5" value="5" />
              </Picker>
            </Item>
            </Item>          


            <Item stackedLabel style={[styles.input]}>
              <Label style={[styles.label]}>División</Label>
              <Item picker>            
              <Picker
                mode="dropdown"
                style={{ width: undefined }}
                placeholder="Select your SIM"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.selected2}
                onValueChange={this.onValueChange2.bind(this)}
              >
                <Picker.Item label="A" value="A" />
                <Picker.Item label="B" value="B" />
              </Picker>
            </Item>
            </Item>
            

            <Item stackedLabel style={[styles.input]} >
              <Label style={[styles.label]}>Título</Label>
              <Input />
            </Item>
            <Item stackedLabel style={[styles.input]} >
              <Label style={[styles.label]}>Descripción</Label>
              <Input />
            </Item>
            <Item stackedLabel style={[styles.input]} >
              <Label style={[styles.label]}>Cuerpo</Label>
              <Input />
            </Item>

          <View style={[styles.viewCenter]}>
          <Button block success style={[styles.boton]}>
            <Text style={[styles.label]}>Enviar</Text>
          </Button>
          </View>
          
          </Form>
        </Content>
      </Container>
      
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24
  },
  container:{        
    alignItems:'center',
    justifyContent:'center',
  },
  input:{
    borderBottomColor: '#2089DC',
    borderBottomWidth: 2
  },
  boton:{
    marginTop:20,
    width:WIDTH -0,    
  },
  label:{
    fontWeight: 'bold',    
    fontFamily:'sans-serif-light'
  },
  viewCenter:{
    alignItems:'center',
    justifyContent:'center',
  }
});

export default AvisoScreen;
