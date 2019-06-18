import { createDrawerNavigator } from 'react-navigation';
import  NotificacionScreen  from '../../screens/alumno/notificacion/notificacionScreen';
import  NotasStack  from '../alumno/notas';
const AlumnoDrawer = createDrawerNavigator(
  {
    Notificacion: {
      screen: NotificacionScreen,
    },
    Notas: {
      screen: NotasStack,
    },
    Salir: {
      screen: ()=>{},
    }
  },
  {
    headerMode: 'none',
    initialRouteName: 'Notificacion',
    drawerPosition: 'left',
    contentOptions: {
      activeTintColor: '#e91e63',
      inactiveTintColor: '#CCC',
      activeBackgroundColor: '#EEE',
      inactiveBackgroundColor: '#FFF',      
    },
  },
);

export default AlumnoDrawer;
