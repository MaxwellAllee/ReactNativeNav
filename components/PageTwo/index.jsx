import React from 'react';
import ButtonStyled from '../ButtonStyled';
import styled from 'styled-components/native'
import { useContext } from 'react/cjs/react.development';
import StyleContext from '../../contexts/StyleContext';
import { useNavigation } from '@react-navigation/core';
const PageTwo = () => {
  const navigation = useNavigation();
  const styleContext = useContext(StyleContext);
  return (
    <MainView background={styleContext.background}>
      <TextLight>
        hello world
      </TextLight>
      <ButtonStyled
        title="Go to Home"
        onPress={() => navigation.navigate('Main')}
      />
      <ButtonStyled
        title="Go back"
        onPress={() => navigation.goBack()}
      />
    </MainView>
  )
};
export default PageTwo;

const MainView = styled.View`
background: ${({ background }) => background};
height: 100%;
display: flex;
justify-content: center;
align-items: center;
`;
const ButtonSpace = styled.Button`
  padding: 40px;
  margin: 20px;
`
const TextLight = styled.Text`
  color: white;
`;