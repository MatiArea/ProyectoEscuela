
import React from 'react';
import {  Text, Image, StyleSheet,TouchableOpacity,  } from 'react-native';
import { Container, Content, Card, CardItem, Body } from 'native-base';
import  HeaderComponent  from '../../../components/header';
class NotificacionScreen extends React.Component {
  constructor(props) {
    super(props);
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

  
  render() {
    return (
    
      <Container>
        <HeaderComponent titulo="Notificaciones" abrirDrawer={this.abrirDrawer}/>
        <Content>
            <Card>
                <TouchableOpacity>
                    <CardItem style={[styles.card]}>           
                        <Body>                
                            <Text style={[styles.texto]}>
                                16/06/2019
                            </Text>
                            <Text style={[styles.texto]}>
                                Se han subidos las notas...
                            </Text>                        
                        </Body>
                    </CardItem>
                </TouchableOpacity>
            </Card>
            <Card>
                <TouchableOpacity>
                    <CardItem>           
                        <Body>                
                            <Text style={[styles.texto]}>
                                22/06/2019
                            </Text>
                            <Text style={[styles.texto]}>
                                Nuevo aviso del profesor...
                            </Text>                        
                        </Body>
                    </CardItem>
                </TouchableOpacity>
            </Card>
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
