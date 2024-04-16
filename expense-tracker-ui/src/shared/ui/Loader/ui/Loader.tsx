import { FC, memo } from 'react';
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

export default memo(Loader);
