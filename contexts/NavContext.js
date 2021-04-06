
import React from 'react';

const NavContext = React.createContext({
  list: undefined,
  loading: undefined,
  recent: undefined,
  offline: undefined, 
  addArticle:()=>undefined
})
export default NavContext;