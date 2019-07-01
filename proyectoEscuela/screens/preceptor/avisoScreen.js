import React, { Component } from 'react';
import { View, Text, Button, Image, StyleSheet, ScrollView, AsyncStorage, TouchableOpacity, Dimensions  } from 'react-native';
import  HeaderComponent  from '../../components/header';
import {  Container, Content, Form, Item, Input, Label, Picker, Card, CardItem, Body } from 'native-base';
import * as axios from 'axios';
import {Url} from '../../url';

const { width:WIDTH } = Dimensions.get('window');

class AvisoScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anioSelected:0,
      divisionSelected:0,
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

      this.setState({
        //anioSelected: this.state.anioSelected,
        //divisionSelected:this.state.divisionSelected,
        //titulo:this.state.titulo,
        //descripcion:this.state.descripcion,
        //cuerpo:this.state.cuerpo,
        anios:an,
        //divisiones:this.state.divisones, 
        //estado:this.state.estado
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
        //anioSelected: this.state.anioSelected,
        //divisionSelected:this.state.division,
        //titulo:this.state.titulo,
        //descripcion:this.state.descripcion,
        //cuerpo:this.state.cuerpo,
        //anios: this.state.anios,
        divisiones: div, 
        estado:2
      });
  }

  onValueChangeAnio(value) {
    var valor = parseInt(value);
    this.setState({
      anioSelected: valor,
      divisionSelected:0,
      //titulo:this.state.titulo,
      //descripcion:this.state.descripcion,
      //cuerpo:this.state.cuerpo,
      //anios: this.state.anios,
      //divisiones: this.state.divisiones, 
      estado:1
    });
  }

  onValueChangeDivision(value) {
    var val = parseInt(value);
    this.setState({
     // anioSelected: this.state.anio,
      divisionSelected:val,
      //titulo:this.state.titulo,
      //descripcion:this.state.descripcion,
      //cuerpo:this.state.cuerpo,
      //anios: this.state.anios,
      //divisiones: this.state.divisiones, 
      estado:3
    });
  }

  async enviarAviso(){
    var user = await AsyncStorage.getItem('usuario');
    var emisor = JSON.parse(user);
    console.log(emisor);
    var f = new Date();
    f.setMonth(f.getMonth()+1);
    var fe = ''+f.getFullYear()+'/'+f.getMonth()+'/'+f.getDate();
    console.log(fe);
    await axios.post(`${Url}/notificaciones/aviso/enviar/division`,
       {titulo:this.state.titulo, 
       descripcion:this.state.descripcion,
       cuerpo:this.state.cuerpo,
       fecha:fe,
       rollAutor:emisor.roll,
       dniAutor:emisor.dni,
       divisionID:this.state.divisionSelected       
    })
    .then( res => {    
      console.log('AVISO ENVIADO CON EXITO!');
    })
    .catch(function (error) {
      console.log(error);
    });

    this.setState({
      anioSelected:0,
      divisionSelected:0,
      titulo:'',
      descripcion:'',
      cuerpo:'',
      divisiones:'', 
      estado:0
    });
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
     } else if ((this.state.estado == 0)&&(this.state.anios !== '')){
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
                selectedValue={this.state.anioSelected.toString()}
                onValueChange={this.onValueChangeAnio.bind(this)}
              >
              <Picker.Item label={"Seleccionar año..."} value={"0"} key=""/>
              {
                this.state.anios.map( (element, index) => (
                  <Picker.Item label={element.numero.toString()} value={element.numero.toString()} key=""/>  
                ))
              }
             </Picker>
            </Item>
            </Item>  
            </Form>
        </Content>
      </Container> 

      );
     } else if((this.state.estado == 1)&&(this.state.anios !== '')){
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
            selectedValue={this.state.anioSelected.toString()}
            onValueChange={this.onValueChangeAnio.bind(this)}
          >
          <Picker.Item label={"Seleccionar año..."} value={"0"} /> 
          {
            this.state.anios.map( (element, index) => (
              <Picker.Item label={element.numero.toString()} value={element.numero.toString()} key="" />  
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
     } else if((this.state.estado == 2)&&(this.state.anios !== '')&&(this.state.divisiones !== '')){
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
            selectedValue={this.state.anioSelected.toString()}
            onValueChange={this.onValueChangeAnio.bind(this)}
          >
           <Picker.Item label={"Seleccionar año..."} value={"0"} /> 
          {
            this.state.anios.map( (element, index) => (
              <Picker.Item label={element.numero.toString()} value={element.numero.toString()}  key="" />  
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
                selectedValue={this.state.divisionSelected.toString()}
                onValueChange={this.onValueChangeDivision.bind(this)}
              >
              <Picker.Item label={"Seleccione division..."} value={"0"} /> 
              {
                 this.state.divisiones.map( (element, index) => (
                   <Picker.Item label={element.nombre} value={element.id.toString()} key="" />  
                    ))
              }
              </Picker>
            </Item>
            </Item> 
        </Form>
    </Content>
        </Container> );
     } else if((this.state.estado == 3)&&(this.state.divisionSelected !== '')) {
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
              selectedValue={this.state.anioSelected.toString()}
              onValueChange={this.onValueChangeAnio.bind(this)}
            >
            <Picker.Item label={"Seleccionar año..."} value={"0"} /> 
            {
              this.state.anios.map( (element, index) => (
                <Picker.Item label={element.numero.toString()} value={element.numero.toString()}  key="" />  
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
                  selectedValue={this.state.divisionSelected.toString()}
                onValueChange={this.onValueChangeDivision.bind(this)}
              >
              <Picker.Item label={"Seleccione division..."} value={"0"} /> 
              {
                 this.state.divisiones.map( (element, index) => (
                   <Picker.Item label={element.nombre} value={element.id.toString()} key="" />  
                    ))
              }
                </Picker>
              </Item>
              </Item>

              <Item stackedLabel style={[styles.input]} >
              <Label style={[styles.label]}>Título</Label>
              <Input onChangeText={(text) => this.setState({titulo:text})}/>
            </Item>
            <Item stackedLabel style={[styles.input]} >
              <Label style={[styles.label]}>Descripción</Label>
              <Input onChangeText={(text) => this.setState({descripcion:text})}/>
            </Item>
            <Item stackedLabel style={[styles.input]} >
              <Label style={[styles.label]}>Cuerpo</Label>
              <Input onChangeText={(text) => this.setState({cuerpo:text})}/>
            </Item> 
            <Text>
                  {''}
              </Text> 

             <View style={[styles.viewCenter]}>
             <Button
        onPress={()=>{this.enviarAviso()}}
        title="Enviar"
        color="#2089DC"
          />
          </View>
          </Form>
      </Content>
          </Container> );
     } else {
       console.log('ERROR');
       return (
         <View>
           <HeaderComponent titulo="Enviar Aviso" abrirDrawer={this.abrirDrawer} />
           </View>
       );
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
