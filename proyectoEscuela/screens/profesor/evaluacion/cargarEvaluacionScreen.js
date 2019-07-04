import React from 'react';
import { View, Text, Button, Image, StyleSheet, AsyncStorage, TouchableOpacity,ScrollView  } from 'react-native';
import {  Container, Card, CardItem, Body,Input, Spinner, Content, Picker, Item } from 'native-base';
import  HeaderComponent  from '../../../components/header';
import * as axios from 'axios';
import {Url} from '../../../url';

class CargarEvaluacionScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      evaluacion: '',
      evaluacionSelec: '',
      materia: '',
      materias: '',
      evaluaciones: '',
      alumnos: '',
      notas: [],
      nota: '',
      estado: 0,
    }
    this.getAllMat();
}

  volverAtras(){
    this.props.navigation.navigate('menu');
}

volverAtrasMaterias(){
  this.setState({
    estado: 0
  });
}

volverAtrasEvaluaciones(){
  this.setState({
   estado:2
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
      materias:materias
    });
      
  }

  onValueChangeNotas(indice, value){
    var vector = this.state.notas;
    vector[indice] = parseInt(value);
    console.log('NOTAS DESPUES')
    console.log(vector);
    this.setState({
       notas:vector
    });
  }

  changeMat(value){
    this.setState({
      ...this.state,
      materia: value,
      estado: 1,
    });
    this.getAllEva(value);
  }

  async getAllEva(datos){

    var evaluaciones;
    const usuario = await AsyncStorage.getItem('usuario');
    const legajo = JSON.parse(usuario).legajo;
    
    //console.log(datos);
  
    await axios.get(`${Url}/evaluacion/cargarNotas/${datos.materia.nombre}/${legajo}/${datos.materia.anio.numero}/${datos.division.nombre}`)
    .then( res => {    
      evaluaciones=res.data;
    })
    .catch(function (error) {
      console.log(error);
    });
    
    this.setState({ 
      ...this.state,
      evaluaciones:evaluaciones,
      estado:2
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
                    Año: {elem.materia.anio.numero}
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

  changeEval(value){
    this.setState({
      ...this.state,
      evaluacionSelec:value,
      estado:3,
    });
    this.getAlumnos(value);
  }

  async getAlumnos(datos){
    var alumnos;
    var vec = [];

    await axios.get(`${Url}/colegio/alumnos/${this.state.materia.materia.anio.numero}/${this.state.materia.division.nombre}`)
    .then( res => {    
      alumnos=res.data;
    })
    .catch(function (error) {
      console.log(error);
    });

    for(let i = 0; i < alumnos.length; i++){
      vec.push(0);
    }   

    this.setState({
      ...this.state,
      alumnos:alumnos,
      notas: vec,
      estado:4
    });
  }

  returnEval(){ 
    return this.state.evaluaciones.map((elem,index)=>{
    return(
    <View key={index}>
      <Card>
        <TouchableOpacity onPress={() => {this.changeEval(elem)}}>
          <CardItem >           
            <Body>                
              <Text>
                Fecha: {elem.fecha}
              </Text>
              <Text>
                Titulo: {elem.titulo}
              </Text>
              <Text>
                Descripcion: {elem.temas}
              </Text>                        
            </Body>
          </CardItem>
        </TouchableOpacity>
      </Card>
    </View>
  );
})
}

cargarNotas(){
  var vector = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  return this.state.alumnos.map((elem,index)=>{
    return(
    <View key={index}>
      <Card>
          <CardItem >           
            <Body>                
              <Text>
                Legajo: {elem.alumno.legajo}
              </Text>
              <Text>
                Nombre: {elem.alumno.nombre}
              </Text>
              <Text>
                Apellido: {elem.alumno.apellido}
              </Text>     
              <Item picker>            
                <Picker
                  mode="dropdown"
                  style={{ width: undefined }}
                  placeholder="Select your SIM"
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff"
                  selectedValue={this.state.notas[index].toString()}
                onValueChange={this.onValueChangeNotas.bind(this, index)}
              >
              <Picker.Item label={"Ingrese la nota..."} value={"0"} /> 
              {
                 vector.map( (element, index) => (
                   <Picker.Item label={element} value={element} key={''} />  
                    ))
              }
              </Picker>
              </Item>
            </Body>
          </CardItem>
      </Card>
    </View>
  );
  })
}

async sendNotification(){
  var profe = await AsyncStorage.getItem('usuario');
  var legajo = JSON.parse(profe).legajo;
  var folio = this.state.evaluacionSelec.folio;
  var anio = this.state.materia.materia.anio.numero;
  var div = this.state.materia.division.nombre;
  var f = new Date();
  f.setMonth(f.getMonth()+1);
  var fe = ''+f.getFullYear()+'/'+f.getMonth()+'/'+f.getDate();

  await axios.post(`${Url}/notificaciones/evaluacion/enviar/division`,{
    legajo:legajo,
    division:div,
    anio:anio,
    folio:folio,
    fecha:fe
  })
  .catch(function (error) {
    console.log(error);
  });
  
  this.props.navigation.navigate('menu');
}


async saveNotEval(){
var vecNotas = [];
var alu = this.state.alumnos;
var not = this.state.notas;

for(let i = 0; i < alu.length; i++){
  var notAlumno = {
    codigoMatricula:alu[i].codigo,
    nota:not[i]
  }
  vecNotas.push(notAlumno);
}
 console.log(this.state.evaluacionSelec);
 console.log(vecNotas);

  await axios.post(`${Url}/evaluacion/cargarNotas/insert`,{
    folioEvaluacion:this.state.evaluacionSelec.folio,
    notas:vecNotas,
  })
  .catch(function (error) {
    console.log(error);
  });

  await axios.put(`${Url}/evaluacion/cargarNotas/update/${this.state.evaluacionSelec.folio}`)
  .catch(function (error) {
    console.log(error);
  });

  this.sendNotification();
}

  render() {
    if((this.state.estado == 0)&&(this.state.materias == '')){
      return(<View>
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
      );
    }else if((this.state.estado == 0)&&(this.state.materias != '')){
      return(<Container>
        <HeaderComponent titulo="Listado de Materias" abrirDrawer={this.abrirDrawer}/>
        <ScrollView>
            {this.returnMat()}
        </ScrollView>
        <Button
        onPress={  () => {this.volverAtras()}}
        title="Volver"
        color="#2089DC"
          />
      </Container>
      );
    }else if (this.state.estado == 1){
      return(<View >
        <HeaderComponent titulo="Listado Evaluaciones" abrirDrawer={this.abrirDrawer}/>
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
      );
    } else if ((this.state.estado == 2)&&(this.state.evaluaciones == '')){
      return(
      <Container>
      <Content>
    <HeaderComponent titulo="Listado Evaluaciones" abrirDrawer={this.abrirDrawer}/>
    <View>
    <Card>
      <TouchableOpacity onPress={() => {}}>
        <CardItem>           
          <Body style={{justifyContent:'center', flexDirection:'row'}}>                
            <Text>
              {'No tiene evaluaciones para cargar de esta materia aun...'}
            </Text>                      
          </Body>
        </CardItem>
      </TouchableOpacity>
    </Card>
    </View>
      </Content>
      <Button
      onPress={  () => {this.volverAtrasMaterias()}}
      title="Volver"
      color="#2089DC"
        />
      </Container>
      );
    } else if((this.state.estado == 2)&&(this.state.evaluaciones != '')){
      return(<Container>
        <Content>
         <HeaderComponent titulo="Listado Evaluaciones" abrirDrawer={this.abrirDrawer}/>
            {this.returnEval()}
            </Content>
            <Button
      onPress={  () => {this.volverAtrasMaterias()}}
      title="Volver"
      color="#2089DC"
        />        
      </Container>
      );
    } else if (this.state.estado == 3){
      return(
      <View>
        <HeaderComponent titulo="Cargar Notas - Evaluacion" abrirDrawer={this.abrirDrawer}/>
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
      );
    } else if (this.state.estado == 4){
        return(
        <Container>
          <Content>
         <HeaderComponent titulo="Cargar Notas - Evaluacion" abrirDrawer={this.abrirDrawer}/>
            {this.cargarNotas()}
         <View style={[styles.viewCenter]}>
          <Button 
              onPress={()=>{this.saveNotEval()} }
              title="Cargar"
              color="#2089DC"
          />
        </View>
        </Content>
        <Button 
              onPress={()=>{this.volverAtrasEvaluaciones()} }
              title="Volver"
              color="#2089DC"
          />
      </Container>
      );}
  }
}

const styles = StyleSheet.create({
  viewCenter:{
    alignItems:'center',
    justifyContent:'center',
  },
   input:{
    borderBottomColor: '#2089DC',
    borderBottomWidth: 2
  },
});

export default CargarEvaluacionScreen;
