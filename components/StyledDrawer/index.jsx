import React, { useEffect, useState } from 'react';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import SunnySlider from '../SunnySlider';
import styled from 'styled-components/native';
import { useContext } from 'react';
import StyleContext from '../../contexts/StyleContext';
import ButtonStyled from '../ButtonStyled';
import NavContext from '../../contexts/NavContext';


const StyledDrawer = (props) => {
  const styleContext = useContext(StyleContext);
  const navContext = useContext(NavContext);
  const {navigate} = props.navigation;

  return (
    <DrawerContentScrollView 
      {...props}
      contentContainerStyle={{flex:1}}
    >
      <StyledView>
       <Header background={styleContext.secondary} />
        <SunnySlider />
        <ButtonList>
          <ButtonStyled 
            title="Home" 
            onPress={()=>navigate('Main')}
          />
          {navContext.recent.map(article=>( 
            <ButtonStyled 
              key={article.id} 
              title={article.title} 
              backgroundColor={styleContext.primary}
              color={styleContext.secondary}
              fontSize="18px"
              onPress={()=>navigate('Article', article)}
            />)
          )}
        </ButtonList>
      </StyledView>
    </DrawerContentScrollView>
  )
}
export default StyledDrawer;
const StyledView = styled.View`
    flex:1;
    backgroundColor: #A9A9A9
`;
const ButtonList = styled.View`
  padding: 10px
`
const Header = styled.View`
  height: 20px;
  backgroundColor: ${({background})=>background}
`;