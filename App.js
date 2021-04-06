import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { View} from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createDrawerNavigator} from '@react-navigation/drawer';
import NavContext from './contexts/NavContext';
import Home from './components/Home';
import PageTwo from './components/PageTwo';
import BurgerMenu from './components/BurgerMenu';
import StyleContext from './contexts/StyleContext';
import StyledDrawer from './components/StyledDrawer';
import * as SecureStore from 'expo-secure-store';
const Drawer = createDrawerNavigator();

const save = async (key, value)=> {
  try{
    await SecureStore.setItemAsync(key, value);
  } catch (err){
    console.log(err)
  }

}

const getValueFor = async (key)=> {
  return await SecureStore.getItemAsync(key);
}

export default App = () => {
  const [navContext, setNavContext] = useState({
    list: [],
    loaded: false,
    recent: [],
    offline: false,
    addArticle: (article) => {
      setNavContext(curr => {
          if(JSON.stringify(curr.recent).includes(article.id)){
            return curr
          }
          else{
            let newArr
            if (curr.recent.length > 2) newArr = [...curr.recent.slice(curr.recent.length - 3), article]
            else newArr = [...curr.recent, article]
            save("recent", JSON.stringify(newArr))
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
  const getRecent = async ()=>{
    const savedRecent = await getValueFor("recent");
    if(savedRecent) setNavContext(curr=>({...curr, recent: JSON.parse(savedRecent)}))
  }
  const offlineMode = async()=>{
    const offlinePageCount = await getValueFor('pageNumber');
    console.log(offlinePageCount);
    let articleArray = []
    if(offlinePageCount){
      for (let i = 0; i < offlinePageCount; i++) {
        const pageOfArticles = JSON.parse( await getValueFor("page"+i));
        console.log(pageOfArticles)
        articleArray = articleArray.concat(pageOfArticles);
      }
      setNavContext(curr=>({...curr, list: articleArray, loaded: true, offline: true}))
    }
    else{
      setNavContext(curr=>({...curr, loaded: true, offline: true}))
    }
  }
  const saveOfflineData = async offlineData =>{
    try{
      const numberOfPages = Math.ceil(offlineData.length/4);
      const oldPageNumber = await parseInt(getValueFor('pageNumber')) || 0;
      for (let i = 0; i < numberOfPages; i++) {
        save('page' + i, JSON.stringify(offlineData.slice(i*4, 4*(i+1))));
      };
      if(oldPageNumber > numberOfPages){
        for(let i = numberOfPages + 1; i === oldPageNumber; i++){
          SecureStore.deleteItemAsync("page"+i);
        }
      }
      console.log(numberOfPages)
      save("pageNumber", JSON.stringify(numberOfPages));
    } catch (err){
      console.log(err);
    };
  }
  const getArticle = async () => {
    try {
      const url = 'https://gentle-escarpment-79836.herokuapp.com/';
      const online = await fetch(url+"active")
      const statusCode = await online.status
      if(statusCode === 200){
        const results = await fetch(url);
        const resJSON = await results.json();
        const finalJSON = resJSON.map(article=>({
          id: article.id,
          uri: article.media[0]["media-metadata"][2]["url"],
          caption: article.media[0].caption,
          title: article.title,
          abstract: article.abstract
        }))
        saveOfflineData(finalJSON);
        setNavContext(curr => ({ ...curr, list: finalJSON, loaded: true }));
      }else{
        offlineMode()
      }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getRecent();
    getArticle();
  }, [])
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
