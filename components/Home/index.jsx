import React from 'react';
import styled from 'styled-components/native';
import ButtonStyled from '../ButtonStyled';
import { useContext } from 'react';
import NavContext from '../../contexts/NavContext';
import StyleContext from '../../contexts/StyleContext';
const Home = ({navigation}) => {
  const styleContext = useContext(StyleContext)
  const navContext = useContext(NavContext)
 return (
  <MainView background={styleContext.background}>
    <TextColored color={styleContext.text}>
      hello world
   </TextColored>
    <ButtonStyled
      title="Click Me" 
      onPress={()=>navigation.navigate('PageTwo')}
      styles={{ width:"200px"}}
    />
    <ButtonStyled
      title = "add link"
      onPress={()=>navContext.setOpen()}
      styles="width: 200px;"
    />
  </MainView>
)};
export default Home;

const MainView = styled.View`
  background: ${({background})=>background};
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const TextColored = styled.Text`
  color: ${({color})=>color};
`;