import React from 'react';
import ButtonStyled from '../ButtonStyled';
import styled from 'styled-components/native'
const PageTwo = ({ navigation }) => {
  return (
    <MainView>
      <TextLight>
        hello world
      </TextLight>
      <ButtonStyled
        title="Go to Details... again"
        onPress={() => navigation.push('PageTwo')}
      />
      <ButtonStyled 
        title="Go to Home" 
        onPress={() => navigation.navigate('Home')} 
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
  background: purple;
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