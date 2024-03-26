import { FC, useEffect, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './SvgIcon.module.scss';

interface SvgIconProps {
  name: string
  className?: string
}

const SvgIcon: FC<SvgIconProps> = (props) => {
  const { name, className } = props;
  const [SvgIcon, setSvgIcon] = useState(null);

  useEffect(() => {
    let isActive = true;

    const importIcon = async () => {
      try {
        const { default: ImportedIcon } = await import(`../../../assets/icons/${name}.svg`);
        if (isActive) {
          setSvgIcon(() => ImportedIcon);
        }
      } catch (err) {
        console.error(`Ошибка при загрузке иконки ${name}:`, err);
      }
    };

    importIcon();

    return () => {
      isActive = false;
    };
  }, [name]);

  if (!SvgIcon) {
    return null;
  }

  return <SvgIcon className={classNames(cls.svgIcon, {}, [className])} />;
};

export default SvgIcon;
