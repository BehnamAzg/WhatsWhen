import { useContext } from 'react';
import StateContext from './StateContext';

export default function useStateContext() {
  const context = useContext(StateContext);
  if (context === undefined) throw new Error("StateContext was used outside of the StateProvider.");
  return context;
}