import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import  Menu  from './navigators/menuesPrincipales/menu';

class App extends React.Component {
  render() {
    return (
      <Menu
        onNavigationStateChange={() => ({ /* don't show navigation change logs */ })}
      />
    );
  }
}



export default App;
