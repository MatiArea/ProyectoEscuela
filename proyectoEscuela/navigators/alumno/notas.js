import { createStackNavigator } from 'react-navigation';
import  OpcionesScreen  from '../../screens/alumno/notas/opcionesScreen';
import  EvaluacionScreen  from '../../screens/alumno/notas/evaluacionScreen';
import  BoletinScreen  from '../../screens/alumno/notas//boletinScreen';


const NotasStack = createStackNavigator(
  {
    menu: {
      screen: OpcionesScreen,
    },
    evaluacion: {
      screen: EvaluacionScreen ,
    },
    boletin: {
      screen: BoletinScreen ,
    }
  },
  {
    initialRouteName: 'menu',
    mode: 'card', // 'card' or 'modal'
    headerMode: 'none'
  },
);

export default NotasStack;
