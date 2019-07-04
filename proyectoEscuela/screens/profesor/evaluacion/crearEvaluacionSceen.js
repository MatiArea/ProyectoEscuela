import React from 'react';
import { View, Text, Button, Image, StyleSheet, AsyncStorage, TouchableOpacity,TextInput } from 'react-native';
import {  Container, Card, CardItem, Body,Form, Item, Label, Spinner, Content  } from 'native-base';
import  HeaderComponent  from '../../../components/header';
import * as axios from 'axios';
import {Url} from '../../../url';
import DatePicker from 'react-native-datepicker';
import { Input } from 'react-native-elements';

class CrearEvaluacionScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fecha:'2019/07/01',
      folio: ' ',
      temas:' ',
      titulo:' ',
      legajoProfesor: ' ',
      division:' ',
      anio:' ',
      materia:' ',
      materias: ' ',
      estado: 0,
    }
    this.generateFolio();
    this.getAllMat();

  }

  volverAtras(){
    this.props.navigation.navigate('menu');
}

volverAtrasMaterias(){
  this.setState({
  estado:1
  });
}

  async getAllMat(){

    var materias;
    const usuario = await AsyncStorage.getItem('usuario');
    const legajo = JSON.parse(usuario).legajo;
    
  
    await axios.get(`${Url}/colegio/profesor/materias/${legajo}`)
    .then( res => {    
      materias=res.data;
    })
    .catch(function (error) {
      console.log(error);
    });
    
    this.setState({
      ...this.state,
      legajoProfesor:legajo,
      materias:materias,
      estado: 1,
    });
      
  }
  
  async generateFolio(){

    var folio;

    await axios.get(`${Url}/evaluacion/folio`)
    .then( res => {    
      folio=res.data;
    })
    .catch(function (error) {
      console.log(error);
    });

    this.setState({
      ...this.state,
      folio:folio,
    })
  }

  changeMat(value){
    this.setState({
      ...this.state,
      materia: value.materia.nombre,
      anio: value.materia.anio.numero,
      division: value.division.nombre,
      estado: 2,
    });
  }

  returnMat(){
    return this.state.materias.map((elem,index)=>{
      return(
        <View key={index}>
          <Card>
            <TouchableOpacity onPress={() => {this.changeMat(elem)}}>
              <CardItem >           
                <Body>                
                  <Text >
                    Anio: {elem.materia.anio.numero}
                  </Text>
                  <Text>
                    Division: {elem.division.nombre}
                  </Text>
                  <Text>
                    Materia: {elem.materia.nombre}
                  </Text>                        
                </Body>
              </CardItem>
            </TouchableOpacity>
          </Card>
        </View>
      );
    })
  }

  async saveNewEval(){
    if(this.state.folio != ' '){
      await axios.post(`${Url}/evaluacion/create`,{
        fecha: this.state.fecha,
        folio: this.state.folio,
        temas: this.state.temas,
        titulo: this.state.titulo,
        legajoProfesor: this.state.legajoProfesor,
        division: this.state.division,
        anio: this.state.anio,
        materia: this.state.materia,
      })
      .catch(function (error) {
        console.log(error);
      }); 
    }
    this.props.navigation.navigate('menu');
        
  }

  createEval(){
    return(
      <View>
      <Form>
        <Item stackedLabel style={[styles.input]} >
          <Label style={[styles.label]}>Fecha</Label>
          <DatePicker
            style={{width: 200}}
            date={this.state.fecha} 
            mode="date" 
            placeholder="Seleccione una fecha"
            format="YYYY-MM-DD"
            minDate="2018-12-31"
            maxDate="2020-01-01"
            confirmBtnText="Aceptar"
            cancelBtnText="Cancelar"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
            }}
            onDateChange={(date) => {this.setState({
              ...this.state,
              fecha: date})}}
          />
        </Item>
        
        <Item stackedLabel style={[styles.input]} >
          <Label style={[styles.label]}>Titulo</Label>
          <Input
            style={styles.input}
            placeholder={'Titulo'}
            placeholderTextColor={'#ffffff'}
            onChangeText={(text) => this.setState({titulo:text})}
            value={this.state.titulo}
          />
        </Item>
      
        <Item stackedLabel style={[styles.input]} >
          <Label style={[styles.label]}>Temas</Label>
          <Input
            style={styles.input}
            placeholder={'Temas'}
            placeholderTextColor={'#ffffff'}
            onChangeText={(text) => this.setState({temas:text})}
            value={this.state.temas}
          />
        </Item> 
      </Form>
      <Text>
        {''}
      </Text>
      <Text>
        {''}
      </Text>  
      <Button 
            style={{marginTop : 15}}
            onPress={()=>{this.saveNewEval()} }
            title="Crear Evaluacion"
            color="#2089DC"
        />   
        </View>
    );
  }


  render() {
    if((this.state.estado == 0 )&&(this.state.materias == ' ')){
      return(<View >
        <HeaderComponent titulo="Listado de Materias" abrirDrawer={this.abrirDrawer}/>
        <View>
        <Card>
          <TouchableOpacity onPress={() => {}}>
            <CardItem>           
            <Body style={{justifyContent:'center', flexDirection:'row'}}>                
                <Spinner color='blue'/>                      
              </Body>
            </CardItem>
          </TouchableOpacity>
        </Card>
        </View>
      </View>
      )}else if ((this.state.estado == 1)&&(this.state.materias != ' ')){
      return(<Container>
        <Content>
          <HeaderComponent titulo="Listado de Materias" abrirDrawer={this.abrirDrawer}/>
          {this.returnMat()}
          </Content>
          <Button
        onPress={  () => {this.volverAtras()}}
        title="Volver"
        color="#2089DC"
          />
      </Container>
      )} else if ((this.state.estado == 2)&&(this.state.materia == ' ')){
      return(<View >
        <HeaderComponent titulo="Crear Evaluación" abrirDrawer={this.abrirDrawer}/>
        <View>
        <Card>
          <TouchableOpacity onPress={() => {}}>
            <CardItem>           
            <Body style={{justifyContent:'center', flexDirection:'row'}}>                
                <Spinner color='blue'/>                      
              </Body>
            </CardItem>
          </TouchableOpacity>
        </Card>
        </View>
      </View>
      )} else if ((this.state.estado == 2)&&(this.state.materia != ' ')){
      return(<Container>
        <Content>
         <HeaderComponent titulo="Crear Evaluación" abrirDrawer={this.abrirDrawer}/>
         {this.createEval()}
         </Content>
         <Button
        onPress={  () => {this.volverAtrasMaterias()}}
        title="Volver"
        color="#2089DC"
          />
      </Container>
      )}
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
    borderBottomColor: '#FFFFFF',
    borderBottomWidth: 2,
  },
  boton:{
    marginTop:20,
    width:50 -0,    
  },
  label:{
    fontWeight: 'bold',    
    fontFamily:'sans-serif-light'
  },
  viewCenter:{
    alignItems:'center',
    justifyContent:'center',
  },
  texto:{
    fontWeight:"bold",
    fontFamily:'sans-serif-light'
},
});

export default CrearEvaluacionScreen;
