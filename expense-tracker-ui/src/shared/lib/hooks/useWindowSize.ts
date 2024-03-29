import { useState, useEffect } from 'react';

export function useWindowSize () {
// Инициализация состояния с размерами окна
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    // Обработчик изменения размеров окна
    function handleResize () {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }

    // Добавление обработчика события при монтировании компонента
    window.addEventListener('resize', handleResize);

    // Очистка обработчика при размонтировании компонента
    return () => { window.removeEventListener('resize', handleResize); };
  }, []); // Пустой массив зависимостей означает, что эффект выполнится один раз после монтирования компонента

  return windowSize;
}
