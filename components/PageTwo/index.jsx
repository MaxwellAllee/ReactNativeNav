import React from 'react';
import ButtonStyled from '../ButtonStyled';
import styled from 'styled-components/native'
import { useContext } from 'react/cjs/react.development';
import StyleContext from '../../contexts/StyleContext';
import { useNavigation, useRoute } from '@react-navigation/core';
import { ScrollView } from 'react-native-gesture-handler';
const PageTwo = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const styleContext = useContext(StyleContext);
  return (
    <Container>
      <ScrollView contentContainerStyle={{flexGrow: 1}} >
        <MainView background={styleContext.background}>
          <ArticleTitle color={styleContext.secondary} fontSiz="40px">
            {params.title}
          </ArticleTitle>
          <ArticleImage
            source={{ uri: params.media[0]["media-metadata"][2]["url"] }}
          />
          <TextLight
            currentTheme={styleContext.currentTheme}
            font="11px"
            styles={{ padding: "0px 17px", marginBottom: "10px" }}
          >
            {params.media[0].caption}
          </TextLight>
          <TextLight
            currentTheme={styleContext.currentTheme}
            font="20px"
            styles={{ padding: "0px 17px", marginBottom: "10px" }}
          >
            {params.abstract}
          </TextLight>
        </MainView>
      </ScrollView>
    </Container>
  )
};
export default PageTwo;
const Container = styled.SafeAreaView`
  flex: 1
`;
const MainView = styled.View`
  background: ${({ background }) => background};
  height: 100%;
  alignItems: center;
  padding:5px
`;
const ButtonSpace = styled.Button`
  padding: 40px;
  margin: 20px;
`
const TextLight = styled.Text`
  color: ${({ currentTheme }) => currentTheme === "lightTheme" ? "black" : "white"} ;
  fontSize: ${({ font }) => font || "15px"}
  ${({ styles }) => styles}
`;
const ArticleTitle = styled.Text`
  fontSize: 40px;
  color:${({ color }) => color}
  textAlign: center
  margin: 10px 0
`;
const ArticleImage = styled.Image`
  height: 234px;
  width: 352px;
`;
const SmallText = styled(TextLight)`
  fontSize: 11px
  padding: 0px 17px
`;