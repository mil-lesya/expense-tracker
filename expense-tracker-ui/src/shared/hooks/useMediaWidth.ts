import { DESKTOP_SIZE, LAPTOP_SIZE, MOBILE_SIZE, TABLET_SIZE } from './../const/windowSizes';
import { useState, useEffect } from 'react';
import { useWindowSize } from './useWindowSize';

type CurrentStyleType = typeof MOBILE_SIZE | typeof TABLET_SIZE | typeof LAPTOP_SIZE | typeof DESKTOP_SIZE;

const MOBILE_BREAKPOINT_WIDTH = 767;
const TABLET_BREAKPOINT_WIDTH = 1023;
const LAPTOP_BREAKPOINT_WIDTH = 1199;

export function useMediaWidth () {
  const { width } = useWindowSize();
  const [currentStyle, setCurrentStyle] = useState<CurrentStyleType>(DESKTOP_SIZE);

  useEffect(() => {
    // Функция для определения текущего стиля
    function getCurrentStyle (width: number): CurrentStyleType {
      if (width <= MOBILE_BREAKPOINT_WIDTH) {
        return MOBILE_SIZE;
      }
      if (width <= TABLET_BREAKPOINT_WIDTH) {
        return TABLET_SIZE;
      }
      if (width <= LAPTOP_BREAKPOINT_WIDTH) {
        return LAPTOP_SIZE;
      }
      return DESKTOP_SIZE;
    }

    // Обновление текущего стиля при изменении ширины окна
    setCurrentStyle(getCurrentStyle(width));
  }, [width]); // Зависимость от ширины окна

  return { currentStyle, width };
}
