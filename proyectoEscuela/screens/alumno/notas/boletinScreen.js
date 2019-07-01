import React from 'react';
import { View, Text, Button, Image, StyleSheet, ScrollView, AsyncStorage, TouchableOpacity } from 'react-native';
import  HeaderComponent  from '../../../components/header';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { Container, Content, Card, CardItem, Body } from 'native-base';
import * as axios from 'axios';
import {Url} from '../../../url';

class BoletinScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      boletin:'',
      tableHead: [], 
      widthArr: []      
    }

    this.abrirDrawer = this.abrirDrawer.bind(this);
    this.recuperarBoletin();
  }

    abrirDrawer = () =>{
      this.props.navigation.navigate('DrawerOpen');
    }

    async recuperarBoletin(){
      var bol;
      const usuario = await AsyncStorage.getItem('usuario');      
      const legajo = JSON.parse(usuario).legajo;      

      await axios.get(`${Url}/boletin/display/${legajo}`,)
      .then( res => {    
        bol=res.data;
      })
      .catch(function (error) {
        console.log(error);
      });

      this.setState({
        boletin:bol,
        tableHead: ['Materias', 'Trimestre 1', 'Trimestre 2', 'Trimestre 3', 'Promedio'], 
        widthArr: [200, 80, 80, 80, 80]
      })
    }



  render() {

    if(this.state.boletin == ""){
      return (
        <View>
        <HeaderComponent titulo="Boletin" abrirDrawer={this.abrirDrawer}/>
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
    var estado = this.state;
    var tableData = [];
    var rowData;
    var materia = '';
    var nota = 0;
    var promedio = 0;
    for(let i = 0; i < estado.boletin.notas.length; i++){
      rowData = [];
      for(let j = 0; j <5; j++){
        switch(j){
          case 0: materia = estado.boletin.notas[i].materia.nombre;
          rowData.push(materia);
          break;
          case 1: if(estado.boletin.boletin.trimestre1){
            nota = estado.boletin.notas[i].nota1;
            rowData.push(nota);
          } else {
            rowData.push('-');
          }
          break;
          case 2: if(estado.boletin.boletin.trimestre2){
            nota = estado.boletin.notas[i].nota2;
            rowData.push(nota);
          } else {
            rowData.push('-');
          }
          break;
          case 3: if(estado.boletin.boletin.trimestre3){
            nota = estado.boletin.notas[i].nota3;
            rowData.push(nota);
          } else {
            rowData.push('-');
          }
          break;
          case 4: if(estado.boletin.boletin.trimestre3){
            promedio = estado.boletin.notas[i].nota1 + estado.boletin.notas[i].nota2 + estado.boletin.notas[i].nota3;
            nota = promedio/3;
            rowData.push(nota.toFixed(2));
          } else {
            rowData.push('-');
          }
          break;
        }       
      }
      tableData.push(rowData);
    }

    console.log(tableData);


    return (
      <Container>
      <HeaderComponent titulo="Boletin" abrirDrawer={this.abrirDrawer}/>
      <Content>
      <View style={styles.container}>
      <ScrollView horizontal={true}>
      <View>
      <Table borderStyle={{borderColor: '#C1C0B9'}}>
      <Row data={estado.tableHead} widthArr={estado.widthArr} style={styles.header} textStyle={styles.text}/>
      </Table>
      <ScrollView style={styles.dataWrapper}>
      <Table borderStyle={{borderColor: '#C1C0B9'}}>
      { tableData.map( (rowData, index) => (
        <Row
        key={index}
        data={rowData}
        widthArr={this.state.widthArr}
        style={[styles.row, index%2 && {backgroundColor: '#F7F6E7'}]}
        textStyle={styles.text} /> ) )
      }
      </Table>
      </ScrollView>
      </View>
      </ScrollView>
      </View>
      </Content>
      <Button
        onPress={  () => {this.props.navigation.navigate('menu')} }
        title="Volver"
        color="#2089DC"
          />
      </Container>
    );
  }
}

}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  header: { height: 50, backgroundColor: '#537791' },
  text: { textAlign: 'center', fontWeight: '100' },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: '#E7E6E1' }
});

export default BoletinScreen;
