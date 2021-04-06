import React from 'react';
import { TouchableOpacity, View, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import ButtonStyled from '../ButtonStyled';
import { useContext } from 'react';
import NavContext from '../../contexts/NavContext';
import StyleContext from '../../contexts/StyleContext';
import ArticleCard from '../ArticleCard';

// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
const Home = ({ navigation }) => {
  const styleContext = useContext(StyleContext)
  const navContext = useContext(NavContext)
  return (
    <Container>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} >
        <MainView background={styleContext.background}>
          <PicHolder>
            <Logo source={styleContext.currentTheme === 'lightTheme' ?
              require('../../assets/logo.png') :
              require('../../assets/light.png')
            } />
          </PicHolder>
          {!navContext.loaded ? <TextColored color={styleContext.text}>
            Loading new articles
            </TextColored> :
            <View>
              {navContext.list.length ? navContext.list.map(article => (
                <TouchableOpacity
                  onPress={() => {
                    navContext.addArticle(article)
                    navigation.navigate('Article', {...article, offline: navContext.offline})
                  }}
                  activeOpacity={.71}
                  key={article.id}
                >
                  <ArticleCard
                    key={article.id}
                  >
                    <TextColored color={styleContext.text}>
                      {article.title}
                    </TextColored>
                  </ArticleCard>

                </TouchableOpacity>
              )):
              <TextColored color={styleContext.text} styles={"font-size: 30px; textAlign: center"}>
                You are offline and have not recently viewed articles.
              </TextColored>
              }
            </View>
          }
        </MainView>
      </ScrollView>
    </Container>
  )
};
export default Home;

const MainView = styled.View`
  background: ${({ background }) => background};
  flex: 1;
  display: flex;
  align-items: center;
  padding: 0px 10px 0px 10px;
`;
const TextColored = styled.Text`
  color: ${({ color }) => color};
  fontSize: ${({ font }) => font || "15px"}
  ${({styles})=>styles}
`;
const Logo = styled.Image`
  justify-content: center;
  align-items: center;
  height: 100px;
  width:100px;
`;
const PicHolder = styled.View`
  justify-content: center;
  align-items: center;
`;
const Container = styled.SafeAreaView`
  flex: 1
`;