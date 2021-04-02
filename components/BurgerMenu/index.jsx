import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { DrawerActions } from '@react-navigation/drawer';
import { useContext } from 'react';
import NavContext from '../../contexts/NavContext';
import { useNavigation } from '@react-navigation/core';

const BurgerMenu = () => {
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const navContext = useContext(NavContext);
  useEffect(() => {
    console.log(navigation);
    return () => {
    }
  }, []);
  return (
    <BurgerStyle
    primary={"black"}
    onPress={()=>{
      navigation.toggleDrawer();
    }}
    open={open}
    >
      <LinkView primary={"black"} open={open} />
      <LinkView primary={"black"} open={open} />
      <LinkView primary={"black"} open={open} />
    </BurgerStyle>
  );
};
export default BurgerMenu;

const BurgerStyle = styled.TouchableOpacity`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 25px;
  background: transparent;
  border: none;
  padding: 0;
  z-index: 10;
  margin-right: 20px;
  `;
const LinkView = styled.View`
    width: 30px;
    height: 4px;
    background: ${({ primary }) => primary};
    border-radius: 10px;
    position: relative;

  `;
