import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerActions } from '@react-navigation/drawer';
import NavContext from './contexts/NavContext';
import Home from './components/Home';
import PageTwo from './components/PageTwo';
import styled from 'styled-components/native';
import BurgerMenu from './components/BurgerMenu';
import { useContext } from 'react';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeNav = ({ route, navigation }) => {
  const [open, setOpen] = useState(false);

  return (


    <Stack.Navigator
      screenOptions={({ navigation, route }) => ({
        headerRight: props => (
          <BurgerMenu {...props}
            navigation={navigation}
          />)
      })}
    >
      <Stack.Screen name="Main" component={Home} />
      <Stack.Screen name="PageTwo" component={PageTwo} />
      <Stack.Screen
        name="Nav"
        component={HomeNav}
        initialParams={{ open }}
      />
    </Stack.Navigator>

  );

}

export default App = () => {
  const [openStatus, setOpenStatus] = useState(false);
  const navContext = useContext(NavContext);
  useEffect(() => {
    console.log("changed");
    setOpenStatus(true)
  }, [navContext.open])
  return (

    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: true,
          headerLeft:()=><View></View>,
          headerRight: ()=><BurgerMenu/>
        }}
        drawerPosition="right"
        drawerStyle={{
          backgroundColor: "#A9A9A9EF"
        }}
        drawerType="front"
      >
        <Drawer.Screen 
        screenOptions={({ navigation, route }) => ({
          
        })}
          name="Main" component={Home} />
        <Drawer.Screen name="PageTwo" component={PageTwo} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
};
