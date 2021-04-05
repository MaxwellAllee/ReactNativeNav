import React, { useEffect } from 'react';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import SunnySlider from '../SunnySlider';
import styled from 'styled-components/native';
import { useContext } from 'react';
import StyleContext from '../../contexts/StyleContext';


const StyledDrawer = (props) => {
  const styleContext = useContext(StyleContext)
  return (
    <DrawerContentScrollView 
      {...props}
      contentContainerStyle={{flex:1}}
    >
      <StyledView>
       <Header background={styleContext.secondary} />
        <SunnySlider />
        <DrawerItemList 
          labelStyle={{
            color: styleContext.primary
          }}
          {...props} 
        />
      </StyledView>
    </DrawerContentScrollView>
  )
}
export default StyledDrawer;
const StyledView = styled.View`
    flex:1;
    backgroundColor: #A9A9A9
`;
const Header = styled.View`
  height: 20px;
  backgroundColor: ${({background})=>background}
`;