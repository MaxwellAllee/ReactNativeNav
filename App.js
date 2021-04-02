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

export default App = () => {
  const [openStatus, setOpenStatus] = useState(false);
  const navContext = useContext(NavContext);
  const [context, setContext] = useState({
    open: 1,
    list:["Name"],
    setOpen: () => setContext(curr => {
      console.log(curr.open)
      const newName = "name"+curr.open
      let newArr
      if(curr.list.length > 2) newArr = [...curr.list.slice(curr.list.length-3), newName]
      else newArr = [...curr.list, newName]
      return { ...curr, open: curr.open + 1, list: newArr }
    })
  })
  return (
    <NavContext.Provider value={context}>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: true,
            headerLeft: () => <View></View>,
            headerRight: () => <BurgerMenu />
          }}
          drawerPosition="right"
          drawerStyle={{
            backgroundColor: "#A9A9A9EF"
          }}
          drawerType="front"
        >
          <Drawer.Screen name="Main" component={Home} />
          <Drawer.Screen name="PageTwo" component={PageTwo} />
          {context.list.map(listName=><Drawer.Screen key={listName} name={listName} component={PageTwo} />)}
        </Drawer.Navigator>
      </NavigationContainer>
    </NavContext.Provider>
  )
};
