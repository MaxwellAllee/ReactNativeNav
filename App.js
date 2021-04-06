import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createDrawerNavigator, DrawerActions, DrawerContent } from '@react-navigation/drawer';
import NavContext from './contexts/NavContext';
import Home from './components/Home';
import PageTwo from './components/PageTwo';
import BurgerMenu from './components/BurgerMenu';
import StyleContext from './contexts/StyleContext';
import StyledDrawer from './components/StyledDrawer';
const Drawer = createDrawerNavigator();

export default App = () => {
  const [navContext, setNavContext] = useState({
    list: [],
    loaded: false,
    recent: [],
    addArticle: (article) => {
      setNavContext(curr => {
          if(JSON.stringify(curr.recent).includes(article.id)){
            return curr
          }
          else{
            let newArr
            if (curr.recent.length > 2) newArr = [...curr.recent.slice(curr.recent.length - 3), article]
            else newArr = [...curr.recent, article]
            return { ...curr, open: curr.open + 1, recent: newArr }
          }
        })
      
    }
  });
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
  useEffect(() => {
    getArticle();
  }, [])
  const getArticle = async () => {
    try {
      const url = 'https://gentle-escarpment-79836.herokuapp.com/';
      const results = await fetch(url);
      const resTxt = await results.json();
      setNavContext(curr => ({ ...curr, list: resTxt, loaded: true }))
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <NavContext.Provider value={navContext}>
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

              headerRight: () => <BurgerMenu />
            }}
            drawerPosition="right"
            drawerStyle={{
              backgroundColor: styleCont.secondary
            }}
            drawerType="front"
            drawerContent={(props) => <StyledDrawer {...props} />}

          >

            <Drawer.Screen name="Main" headerLeft="Latest News" component={Home} />
            <Drawer.Screen name="Article" component={PageTwo} initialParams={navContext.list[0]} />
          </Drawer.Navigator>
        </NavigationContainer>
      </StyleContext.Provider>
    </NavContext.Provider>
  )
};
