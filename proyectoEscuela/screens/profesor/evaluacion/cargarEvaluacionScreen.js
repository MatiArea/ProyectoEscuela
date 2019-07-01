import React from 'react';
import { View, Text, Button, Image, StyleSheet, AsyncStorage, TouchableOpacity,ScrollView  } from 'react-native';
import {  Container, Card, CardItem, Body,Input, Spinner } from 'native-base';
import  HeaderComponent  from '../../../components/header';
import * as axios from 'axios';
import {Url} from '../../../url';

class CargarEvaluacionScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      evaluacion: ' ',
      evaluacionSelec: ' ',
      materia: ' ',
      materias: ' ',
      evaluaciones: ' ',
      alumnos: ' ',
      notas: [ ],
      nota: ' ',
      estado: 0,
    }
    this.getAllMat();

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
      materias:materias,
      estado: 1,
    });
      
  }

  changeMat(value){
    this.setState({
      ...this.state,
      materia: value,
      estado: 2,
    });
    this.getAllEva(value);
  }

  async getAllEva(datos){

    var evaluaciones;
    const usuario = await AsyncStorage.getItem('usuario');
    const legajo = JSON.parse(usuario).legajo;
    
    console.log(datos);
  
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
    this.getEval(value);
  }

  async getEval(datos){
    var evaluacion;
    var alumnos;

    await axios.get(`${Url}/evaluacion/display/${datos.folio}`)
    .then( res => {    
      evaluacion=res.data;
    })
    .catch(function (error) {
      console.log(error);
    });

    await axios.get(`${Url}/colegio/alumnos/${this.state.materia.materia.anio.numero}/${this.state.materia.division.nombre}`)
    .then( res => {    
      alumnos=res.data;
    })
    .catch(function (error) {
      console.log(error);
    });

    this.setState({
      ...this.state,
      evaluacion:evaluacion,
      alumnos:alumnos,
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

saveNot(nota,matricula){
  this.setState = ({
    ...this.state,
    notas: [...this.state.notas, {
    codigoMatricula:matricula,
    nota:nota
  }]
  }
  );
}

cargarNotas(){
  return this.state.alumnos.map((elem,index)=>{
    return(
    <View key={index}>
      <Card>
          <CardItem >           
            <Body> 
              {console.log(elem)}               
              <Text>
                Legajo: {elem.alumno.legajo}
              </Text>
              <Text>
                nombre: {elem.alumno.nombre}
              </Text>
              <Text>
                Apellido: {elem.alumno.apellido}
              </Text>                   
              <Input
                style={styles.input}
                placeholder={'Nota'}
                placeholderTextColor={'#ffffff'}
                onChangeText={(text) => {this.saveNot(text,elem.codigo)}}
                value={this.state.nota}
              />
            </Body>
          </CardItem>
      </Card>
    </View>
  );
  })
}

async saveNotEval(){
  await axios.post(`${Url}/evaluacion/cargarNotas/insert`,{
    folioEvaluacion:this.state.evaluacion.folio,
    notas:this.state.notas,
  })
  .catch(function (error) {
    console.log(error);
  });

  await axios.put(`${Url}/cargarNotas/update/${this.state.evaluacion.folio}`)
  .catch(function (error) {
    console.log(error);
  });

  this.props.navigation.navigate('menu');


}


  render() {
    if((this.state.estado == 0)&&(this.state.materias == ' ')){
      return(<View >
        <HeaderComponent titulo="Cargar Evaluación" abrirDrawer={this.abrirDrawer}/>
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
      )}else if((this.state.estado == 1)&&(this.state.materias != ' ')){
      return(<Container>
        <HeaderComponent titulo="Cargar Evaluación" abrirDrawer={this.abrirDrawer}/>
        <ScrollView>
            {this.returnMat()}
        </ScrollView>
      </Container>
      )}else if ((this.state.estado == 2)&&(this.state.evaluaciones == ' ')){
      return(<View >
        <HeaderComponent titulo="Cargar Evaluación" abrirDrawer={this.abrirDrawer}/>
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
      )} else if ((this.state.estado == 2)&&(this.state.evaluaciones != ' ')){
      return(<Container>
         <HeaderComponent titulo="Cargar Evaluación" abrirDrawer={this.abrirDrawer}/>
         <ScrollView>
            {this.returnEval()}
         </ScrollView>         
      </Container>
      )} else if ((this.state.estado == 3)&&(this.state.evaluacion == ' ')){
      return(
      <View>
        <HeaderComponent titulo="Cargar Evaluación" abrirDrawer={this.abrirDrawer}/>
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
      )} else if ((this.state.estado == 3)&&(this.state.evaluacion != ' ')&&(this.state.alumnos != ' ')){
        return(
        <Container>
         <HeaderComponent titulo="Cargar Evaluación" abrirDrawer={this.abrirDrawer}/>
         <ScrollView>
            {this.cargarNotas()}
         </ScrollView>
         <View style={[styles.viewCenter]}>
          <Button 
              onPress={()=>{this.saveNotEval()} }
              title="Cargar Notas"
              color="#2089DC"
          />
        </View>
      </Container>
      )}
  }
}

const styles = StyleSheet.create({
  
});

export default CargarEvaluacionScreen;
