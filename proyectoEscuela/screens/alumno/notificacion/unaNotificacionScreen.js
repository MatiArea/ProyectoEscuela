
import React from 'react';
import {  Text, Image, StyleSheet,TouchableOpacity,AsyncStorage,View,ToastAndroid, Button  } from 'react-native';
import { Container, Content, Card, CardItem, Body } from 'native-base';
import  HeaderComponent  from '../../../components/header';
import * as axios from 'axios';
import {Url} from '../../../url';

class UnaNotificacionScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      notificacion:'', 
    }
    this.abrirDrawer = this.abrirDrawer.bind(this);
    this.obtenerNotificacion();
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
    this.props.navigation.navigate('DrawerOpen');
  }

  async obtenerNotificacion(){
    const idnotificacion = await AsyncStorage.getItem('id');
    var noti;
    console.log(idnotificacion);

    await axios.get(`${Url}/notificaciones/display/${idnotificacion}`,)
    .then( res => {    
      noti=res.data;
    })
    .catch(function (error) {
      console.log(error);
    });
    
    this.setState({
      notificacion:noti
    })

    await axios.put(`${Url}/notificaciones/update/${idnotificacion}`, idnotificacion)
    .then( res => {    
      console.log(res);
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  
  render(){

    if(this.state.notificacion == ""){
      return (
        <View>
        <HeaderComponent titulo="Notificacion" abrirDrawer={this.abrirDrawer}/>
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
    } else {
    return (
      <Container>
        <HeaderComponent titulo="Notificacion" abrirDrawer={this.abrirDrawer}/>
        <View>
        <Card>
          <TouchableOpacity onPress={() =>{}}>
            <CardItem>           
              <Body>                
                <Text style={[styles.texto]}>
                  {`Fecha: ${this.state.notificacion.fecha}`}
                </Text>
                <Text style={[styles.texto]}>
                  {`Titulo: ${this.state.notificacion.titulo}`}
                </Text> 
                <Text style={[styles.texto]}>
                  {``}
                </Text> 
                <Text style={[styles.texto]}>
                {`Cuerpo:`}
                </Text>    
                <Text style={[styles.texto]}>
                  {``}
                </Text> 
                <Text style={[styles.texto]}>
                {this.state.notificacion.cuerpo}
                </Text>                     
              </Body>
            </CardItem>
          </TouchableOpacity>
        </Card>
        <Button
        onPress={  () => {this.props.navigation.navigate('notificaciones')} }
        title="Volver"
        color="#2089DC"
          />
        </View>
        </Container>
        );
      }
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
});
export default UnaNotificacionScreen;
