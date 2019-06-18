import { createDrawerNavigator } from 'react-navigation';
import  AvisoScreen  from '../../screens/preceptor/avisoScreen';

const PreceptorDrawer = createDrawerNavigator(
  {
    Aviso: {
      screen: AvisoScreen,
    },
    Salir: {
      screen: ()=>{},
    },
  },
  {
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

export default PreceptorDrawer;
