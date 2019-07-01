import React, { Component } from 'react';
import { View, Text, Button, Image, StyleSheet, ScrollView, AsyncStorage, TouchableOpacity } from 'react-native';
import  HeaderComponent  from '../../components/header';
import {  Container, Content,Button, Form, Item, Input, Label, Picker } from 'native-base';
import * as axios from 'axios';
import {Url} from '../../url';

const { width:WIDTH } = Dimensions.get('window');

class AvisoScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anioSelected:0,
      divisionSelected:'',
      titulo:'',
      descripcion:'',
      cuerpo:'',
      anios:'',
      divisiones:'', 
      estado:0
    };
    this.abrirDrawer = this.abrirDrawer.bind(this);
    this.obtenerAnios();
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
    this.props.navigation.navigate('DrawerOpen');
  }

  async obtenerAnios(){
    var an;
    await axios.get(`${Url}/colegio/anios`,)
      .then( res => {    
        an=res.data;
      })
      .catch(function (error) {
        console.log(error);
      });

      //await AsyncStorage.setItem('anios', JSON.stringify(anios));

      this.setState({
        anioSelected: this.state.anio,
        divisionSelected:this.state.division,
        titulo:this.state.titulo,
        descripcion:this.state.descripcion,
        cuerpo:this.state.cuerpo,
        anios:an,
        divisiones:this.state.divisones, 
        estado:this.state.estado
      });
  }

  async obtenerDivisiones(anio){
    var div;
    await axios.get(`${Url}/colegio/divisiones/${anio}`,)
      .then( res => {    
        div=res.data;
      })
      .catch(function (error) {
        console.log(error);
      });

      this.setState({
        anioSelected: this.state.anioSelected,
        divisionSelected:this.state.division,
        titulo:this.state.titulo,
        descripcion:this.state.descripcion,
        cuerpo:this.state.cuerpo,
        anios: this.state.anios,
        divisiones: div, 
        estado:2
      });
  }

  onValueChangeAnio(value) {
    this.setState({
      anioSelected: value,
      divisionSelected:this.state.division,
      titulo:this.state.titulo,
      descripcion:this.state.descripcion,
      cuerpo:this.state.cuerpo,
      anios: this.state.anios,
      divisiones: this.state.divisiones, 
      estado:1
    });
    console.log(this.state);
  }

  onValueChangeDivision(value) {
    this.setState({
      anioSelected: this.state.anio,
      divisionSelected:value,
      titulo:this.state.titulo,
      descripcion:this.state.descripcion,
      cuerpo:this.state.cuerpo,
      anios: this.state.anios,
      divisiones: this.state.divisiones, 
      estado:3
    });
    console.log(this.state);
  }

   render() {
     if((this.state.estado == 0)&&(this.state.anios == '')){
      return (
        <View>
        <HeaderComponent titulo="Envio de aviso" abrirDrawer={this.abrirDrawer}/>
        <View>
        <Card>
          <TouchableOpacity onPress={() => {}}>
            <CardItem>           
              <Body>                
                <Text style={[styles.texto]}>
                  {'Cargando...'}
                </Text>                        
              </Body>
            </CardItem>
          </TouchableOpacity>
        </Card>
        </View>
        </View>
      );
     } else if ((this.state.estado == 0)&&(this.state.anios != '')){
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
                selectedValue={'Seleccionar año...'}
                onValueChange={this.onValueChangeAnio.bind(this)}
              >
              {
                this.state.anios.map( (element, index) => (
                  <Picker.Item label={element.numero} value={element.numero} />  
                ))
              }
             </Picker>
            </Item>
            </Item>  
            </Form>
        </Content>
      </Container> 
      );
     } else if((this.state.estado == 1)&&(this.state.anios != '')){
       this.obtenerDivisiones(this.state.anioSelected);
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
            selectedValue={'Seleccionar año...'}
            onValueChange={this.onValueChangeAnio.bind(this)}
          >
          {
            this.state.anios.map( (element, index) => (
              <Picker.Item label={element.numero} value={element.numero} />  
            ))
          }
         </Picker>
        </Item>
        </Item>  
        </Form>
        <View>
        <Card>
          <TouchableOpacity onPress={() => {}}>
            <CardItem>           
              <Body>                
                <Text style={[styles.texto]}>
                  {'Cargando...'}
                </Text>                        
              </Body>
            </CardItem>
          </TouchableOpacity>
        </Card>
        </View>
    </Content>
        </Container> );
     } else if((this.state.estado == 2)&&(this.state.anios != '')&&(this.state.divisiones != '')){
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
            selectedValue={'Seleccionar año...'}
            onValueChange={this.onValueChangeAnio.bind(this)}
          >
          {
            this.state.anios.map( (element, index) => (
              <Picker.Item label={element.numero} value={element.numero} />  
            ))
          }
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
                selectedValue={'Seleccione division...'}
                onValueChange={this.onValueChangeDivision.bind(this)}
              >
              {
                 this.state.divisiones.map( (element, index) => (
                   <Picker.Item label={element.nombre} value={element.nombre} />  
                    ))
              }
              </Picker>
            </Item>
            </Item> 
        </Form>
    </Content>
        </Container> );
     } else if((this.state.estado == 3)&&(this.state.divisionSelected != '')) {
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
              selectedValue={'Seleccionar año...'}
              onValueChange={this.onValueChangeAnio.bind(this)}
            >
            {
              this.state.anios.map( (element, index) => (
                <Picker.Item label={element.numero} value={element.numero} />  
              ))
            }
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
                  selectedValue={'Seleccione division...'}
                  onValueChange={this.onValueChangeDivision.bind(this)}
                >
                {
                   this.state.divisiones.map( (element, index) => (
                     <Picker.Item label={element.nombre} value={element.nombre} />  
                      ))
                }
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
             <Button
        onPress={()=>{} }
        title="Enviar"
        color="#2089DC"
          />
          </View>
          </Form>
      </Content>
          </Container> );
     }
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
