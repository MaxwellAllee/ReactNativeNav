import React from 'react';
import { useContext } from 'react';
import { Platform } from 'react-native';
import styled from 'styled-components/native';
import StyleContext from '../../contexts/StyleContext';

const SunnySlider = () => {
  const styleContext = useContext(StyleContext) 
  return (
    <MainView>
      <Label 
        color={styleContext.primary}>
        Theme Switch
      </Label>
      <ThemeSwitch 
        onValueChange={()=>styleContext.themeSwitcher()}
        style={Platform.OS === "android" && {transform: [{ scaleX: 1.4 }, { scaleY: 1.4 }]}}
        value = {styleContext.currentTheme !== 'lightTheme'}
        trackColor={{ false: styleContext.secondary, true: "#1e1e1e" }}
        thumbColor={styleContext.currentTheme !== 'lightTheme' ? "#f4f3f4":"#f5dd4b"  }
      />
    </MainView>
  );
};

export default SunnySlider;
const MainView = styled.View`
  justifyContent: space-between;
  alignItems: center;
  flexDirection: row;
  padding: 12px;
`;

const Label = styled.Text`
  color: ${({color})=>color};
  fontWeight: 800;
  fontSize: 20px;
  justifyContent: center;
  alignItems: center;
  `;
const ThemeSwitch = styled.Switch`
  
`;