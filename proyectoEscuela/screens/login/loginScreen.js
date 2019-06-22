import React from 'react';
import { View, Text, StyleSheet,ImageBackground,TextInput,Dimensions,TouchableOpacity,ToastAndroid } from 'react-native';
import fondo from '../../assets/fondo.jpg';
import Icon from 'react-native-vector-icons/Ionicons'

const { width:WIDTH } = Dimensions.get('window');

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: '',
      contrasenia:''
    };
  }

  static navigationOptions = {
    header: null
}

login(){
  if(this.state.usuario==='Ivan'){
    this.props.navigation.navigate('Alumno');
  }
  if(this.state.usuario==='Matias'){
    this.props.navigation.navigate('Profesor');
  }
  if(this.state.usuario==='Tincho'){
    this.props.navigation.navigate('Preceptor');
  }
}

  render() {
    return (
      <ImageBackground source={fondo} style={styles.backgroundContainer}>
        <View style={styles.inputContainer}>
          <Icon name={'ios-person'} size={28} color={'rgba(0,0,0,1)'} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder={'Usuario'}
            placeholderTextColor={'#ffffff'}
            onChangeText={(text) => this.setState({usuario:text})}
            value={this.state.usuario}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name={'ios-lock'} size={28} color={'rgba(0,0,0,1)'} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder={'Contraseña'}
            placeholderTextColor={'#ffffff'}
            onChangeText={(text) => this.setState({contrasenia:text})}
            value={this.state.contrasenia}
          />
        </View>
        <TouchableOpacity style={styles.btnLogin} onPress={() => {this.login()}}>
          <Text style={styles.text}>Ingresar</Text>
        </TouchableOpacity>
      </ImageBackground>

    );
  }
}

const styles = StyleSheet.create({
  backgroundContainer:{
    flex:1,
    width:null,
    height:null,
    justifyContent:'center',
    alignItems:'center'
  },
  inputContainer:{
    marginTop:10,

  }
  ,
  input:{
    width:WIDTH -55,
    height:45,
    borderRadius:25,
    fontSize:16,
    paddingLeft:45,
    color:'#ffffff',
    backgroundColor:'rgba(100,100,100,0.7)',
    marginHorizontal:25
  },
  inputIcon:{
    position:'absolute',
    top:8,
    left:37
  },
  btnLogin:{    
    width:WIDTH -55,
    height:45,
    borderRadius:25,
    backgroundColor:'#5DADE2',
    justifyContent:'center',
    marginTop:20
  },
  text:{
    color:'#ffffff',
    fontSize:16,
    textAlign:'center'
  }

  
});

export default LoginScreen;
