
import React from 'react';

const NavContext = React.createContext({
  open: undefined,
  setOpen:()=>undefined,
  list: undefined
})
export default NavContext;