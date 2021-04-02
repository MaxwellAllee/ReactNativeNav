import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import ButtonStyled from '../ButtonStyled';
import BurgerMenu from '../BurgerMenu';
import { useContext } from 'react';
import NavContext from '../../contexts/NavContext';
const Home = ({navigation}) => {
  const navContext = useContext(NavContext)
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
    <ButtonStyled
      title = "add link"
      onPress={()=>navContext.setOpen()}
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