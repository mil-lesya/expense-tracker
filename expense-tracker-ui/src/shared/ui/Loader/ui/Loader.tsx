import { FC } from 'react';
import './Loader.scss';

const Loader: FC = () => {
  return (
  <div className="lds-roller">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
   </div>
  );
};

export default Loader;
