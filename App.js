import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerActions, DrawerContent } from '@react-navigation/drawer';
import NavContext from './contexts/NavContext';
import Home from './components/Home';
import PageTwo from './components/PageTwo';
import styled from 'styled-components/native';
import BurgerMenu from './components/BurgerMenu';
import StyleContext from './contexts/StyleContext';
import { useContext } from 'react';
import StyledDrawer from './components/StyledDrawer';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default App = () => {
  const [openStatus, setOpenStatus] = useState(false);
  const navContext = useContext(NavContext);
  const [context, setContext] = useState({
    open: 1,
    list: ["Name"],
    setOpen: () => setContext(curr => {

      const newName = "name" + curr.open
      let newArr
      if (curr.list.length > 2) newArr = [...curr.list.slice(curr.list.length - 3), newName]
      else newArr = [...curr.list, newName]
      return { ...curr, open: curr.open + 1, list: newArr }
    })

  })
  const [styleCont, setStyleCont] = useState(
    {
      primary: '#FFE66D',
      secondary: '#3190bd',
      link: '#2F3061',
      background: '#F7FFF7',
      text: '#343434',
      darkTheme: {
        primary: '#712F79',
        secondary: '#F7996E',
        link: '#A06B9A',
        background: '#001021',
        text: '#F7FFF7',
      },
      lightTheme: {
        primary: '#FFE66D',
        secondary: '#3190bd',
        link: '#2F3061',
        background: '#F7FFF7',
        text: '#343434',
      },
      currentTheme: 'lightTheme',
      themeSwitcher: () => {
        setStyleCont((curr) => {
          const nextTheme = curr.currentTheme === 'lightTheme' ? 'darkTheme' : 'lightTheme';
          return { ...curr, ...curr[nextTheme], currentTheme: nextTheme };
        });
      },
    },
  );
  return (
    <NavContext.Provider value={context}>
      <StyleContext.Provider value={styleCont}>
        <NavigationContainer>

          <Drawer.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerShown: true,
              headerLeft: () => <View></View>,
              headerStyle: {
                backgroundColor: styleCont.secondary,
              },
              headerTitleStyle: {
                color: styleCont.primary,
              },
              headerTitle: "ReaderApp",
              headerRight: () => <BurgerMenu />
            }}
            drawerPosition="right"
            drawerStyle={{
              backgroundColor: styleCont.secondary
            }}
            drawerType="front"
            drawerContent={(props) => <StyledDrawer {...props}/>}

          >
    
            <Drawer.Screen name="Main" component={Home} />
            <Drawer.Screen name="PageTwo" component={PageTwo} />
            {context.list.map(listName => <Drawer.Screen key={listName} name={listName} component={PageTwo} />)}
          </Drawer.Navigator>
        </NavigationContainer>
      </StyleContext.Provider>
    </NavContext.Provider>
  )
};
