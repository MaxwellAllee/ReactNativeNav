import React from 'react';
import { useContext } from 'react';
import styled from 'styled-components/native'
import StyleContext from '../../contexts/StyleContext';
const ButtonStyled = (props) => {
  const styleCont = useContext(StyleContext)
  return (
    <ButtonContainer
      backgroundColor={props.backgroundColor ? props.backgroundColor : styleCont.secondary}
      onPress={() => props.onPress && props.onPress()}
      styles={props.styles}
    >
      <ButtonText
        color={props.color ? props.color : styleCont.primary}
        fontSize={props.fontSize ? props.fontSize : "25px"}
      >
        {props.title}
      </ButtonText>
    </ButtonContainer>
  )
};

export default ButtonStyled;

const ButtonContainer = styled.TouchableOpacity`
padding: 15px;
background-color: ${({ backgroundColor }) => backgroundColor};
border-radius: 8px;
margin-bottom: 5px;
${({ styles }) => styles}
`;
const ButtonText = styled.Text`
  font-size: ${({ fontSize }) => fontSize};
  color: ${({ color }) => color};
  text-align:center;
`;