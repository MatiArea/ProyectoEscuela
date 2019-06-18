import { createStackNavigator } from 'react-navigation';
import  OpcionesScreen  from '../../screens/profesor/evaluacion/opcionesScreen';
import  CrearEvaluacionScreen  from '../../screens/profesor/evaluacion/crearEvaluacionSceen';
import  CargarEvaluacionScreen  from '../../screens/profesor/evaluacion/cargarEvaluacionScreen';
import  ListarEvaluacionScreen  from '../../screens/profesor/evaluacion/listarEvaluacionScreen';

const EvaluacionStack = createStackNavigator(
  {
    menu: {
      screen: OpcionesScreen,
    },
    opcion1: {
      screen: CrearEvaluacionScreen,
    },
    opcion2: {
        screen: CargarEvaluacionScreen,
    },
    opcion3: {
        screen: ListarEvaluacionScreen,
    },
  },
  {
    initialRouteName: 'menu',
    mode: 'card', // 'card' or 'modal'
  },
);

export default EvaluacionStack;
