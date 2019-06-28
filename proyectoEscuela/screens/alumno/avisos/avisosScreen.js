
import React from 'react';
import { Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import  HeaderComponent  from '../../../components/header';
import { Container, Header, Content, Card, CardItem, Body } from 'native-base';

class AvisosScreen extends React.Component {
  constructor(props) {
    super(props);

  }

  static navigationOptions = {
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('../../../assets/aviso.png')}
        style={[styles.icon]}
      />
    ),
  };

  abrirDrawer = () =>{
    this.props.navigation.openDrawer();
  }

  async obtenerAvisos(){

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


  render() {
    return (
    
        <Container>
        <HeaderComponent titulo="Avisos" abrirDrawer={this.abrirDrawer}/>
        <Content>
            <Card>
                <TouchableOpacity>
                    <CardItem>           
                        <Body>                
                            <Text style={[styles.texto]}>
                                Fecha:16/06/2019
                            </Text>
                            <Text style={[styles.texto]}>
                                Título:Puto
                            </Text>
                            <Text style={[styles.texto]}>
                                Descripción:El que lee
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
                                Fecha:16/06/2019
                            </Text>
                            <Text style={[styles.texto]}>
                                Título:Puto
                            </Text>
                            <Text style={[styles.texto]}>
                                Descripción:El que lee
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
  }
});

export default AvisosScreen;
