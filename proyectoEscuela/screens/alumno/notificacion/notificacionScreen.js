
import React from 'react';
import {  Text, Image, StyleSheet,TouchableOpacity,AsyncStorage,View,ToastAndroid  } from 'react-native';
import { Container, Content, Card, CardItem, Body } from 'native-base';
import  HeaderComponent  from '../../../components/header';
import * as axios from 'axios';
import {Url} from '../../../url';

class NotificacionScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      notificaciones:''
    }
    this.obtenerNotificaciones();
  }
     
  static navigationOptions = {
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('../../../assets/notificacion.png')}
        style={[styles.icon]}
      />
    ),
  };

 

  abrirDrawer = () =>{
    this.props.navigation.openDrawer();
  }


  async obtenerNotificaciones(){

    var notificaciones;
    const usuario = await AsyncStorage.getItem('usuario');
    const legajo = JSON.parse(usuario).legajo;
    

    await axios.get(`${Url}/notificaciones/all/${legajo}`,)
    .then( res => {    
      notificaciones=res.data;
    })
    .catch(function (error) {
      console.log(error);
    });
    
    this.setState({
      notificaciones:notificaciones
    })
    
     
  }

  async cambioScreen(id){
   await AsyncStorage.setItem('idElemento',id.toString());
  }

  listarNotificaciones(){
     var estado=this.state.notificaciones;
    

       if(estado){
       return estado.map((elem,index)=>{
          return(
            <View key={index}>
        <Card>
          <TouchableOpacity onPress={() => {this.cambioScreen(elem.id)}}>
            <CardItem>           
              <Body>                
                <Text style={[styles.texto]}>
                  {elem.fecha}
                </Text>
                <Text style={[styles.texto]}>
                  {elem.titulo}
                </Text>                        
              </Body>
            </CardItem>
          </TouchableOpacity>
        </Card>
        </View>
          )
        })}
      }
  
  render() {

    
    console.log(this.state.notificaciones);
    
  

    return (
    
      <Container>
        <HeaderComponent titulo="Notificaciones" abrirDrawer={this.abrirDrawer}/>
        <Content>
           {
              this.listarNotificaciones()
           }
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
  texto:{
      fontWeight:"bold",
      fontFamily:'sans-serif-light'
  },
  card:{
    backgroundColor:'#B7E3E7'
  }
});
export default NotificacionScreen;
