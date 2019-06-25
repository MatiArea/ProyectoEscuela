import { createStackNavigator } from 'react-navigation';
import  LoginScreen  from '../../screens/login/loginScreen';
import  AlumnoDrawer  from './alumnoDrawer';
import  ProfesorDrawer  from './profesorDrawer';
import  PreceptorDrawer  from './preceptorDrawer';



const Menu = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
    },
    Alumno: {
      screen: AlumnoDrawer,
    },
    Profesor: {
        screen: ProfesorDrawer,
      },
    Preceptor: {
        screen: PreceptorDrawer,
    },
  },
  {
    headerMode: 'none',
    initialRouteName: 'Login',
    mode: 'card', // 'card' or 'modal',
  },
);

export default Menu;
