import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import ButtonStyled from '../ButtonStyled';
import BurgerMenu from '../BurgerMenu';
const Home = ({navigation}) => {
 return (
  <MainView>
    <TextLight>
      hello world
   </TextLight>
    <ButtonStyled
      title="Click Me" 
      onPress={()=>navigation.navigate('PageTwo')}
    />
    <ButtonStyled 
      title="test" 
      styles="width:200px;"
      fontSize="40px"
      onPress={()=>navigation.toggleDrawer} 
    />
  </MainView>
)};
export default Home;

const MainView = styled.View`
  background: purple;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const TextLight = styled.Text`
  color: white;
`;