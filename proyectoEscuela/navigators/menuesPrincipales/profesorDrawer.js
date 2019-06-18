import { createDrawerNavigator } from 'react-navigation';
import  AvisoScreen  from '../../screens/preceptor/avisoScreen';
import  EvaluacionStack  from '../profesor/evaluacion'
const ProfesorDrawer = createDrawerNavigator(
  {
    Aviso: {
      screen: AvisoScreen,
    },
    Evaluacion: {
      screen: EvaluacionStack,
    },
    Salir: {
      screen: ()=>{},
    }
  },
  {    
    headerMode: 'none',
    initialRouteName: 'Aviso',
    drawerPosition: 'left',
    contentOptions: {
      activeTintColor: '#e91e63',
      inactiveTintColor: '#CCC',
      activeBackgroundColor: '#EEE',
      inactiveBackgroundColor: '#FFF',
    },
  },
);

export default ProfesorDrawer;
