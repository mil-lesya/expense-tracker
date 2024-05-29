/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import styles from './SliderAmount.module.scss';
import Tippy from '@tippyjs/react';

interface SliderAmountProps {
  minAmount: number
  maxAmount: number
  onChange: (values: { minAmount: string, maxAmount: string }) => void
}

const SliderAmount: React.FC<SliderAmountProps> = ({ minAmount, maxAmount, onChange }) => {
  const [values, setValues] = useState<[number, number]>([minAmount, maxAmount]);
  const [tooltipValues, setTooltipValues] = useState<[number, number]>([minAmount, maxAmount]);
  const [focusIndex, setFocusIndex] = useState<number | null>(null);

  const handleSliderChange = (newValues: [number, number]) => {
    setValues(newValues);
    onChange({ minAmount: newValues[0].toString(), maxAmount: newValues[1].toString() });
  };

  const handleBeforeChange = () => {
    setTooltipValues(values);
  };

  const handleFocus = (index: number) => {
    setFocusIndex(index);
  };

  const handleBlur = () => {
    setFocusIndex(null);
  };

  useEffect(() => {
    setTooltipValues(values);
  }, [values]);

  return (
    <div className={styles.sliderContainer}>
      <Slider
        range
        min={0}
        max={1500}
        step={1}
        value={values}
        onChange={handleSliderChange}
        onBeforeChange={handleBeforeChange}
        trackStyle={[{ backgroundColor: '#574ee4' }]}
        handleStyle={[
          { borderColor: '#fff', backgroundColor: '#574ee4' },
          { borderColor: '#fff', backgroundColor: '#574ee4' }
        ]}
        handleRender={(node, props) => (
          <Tippy
            content={
              <div className={styles.labelTooltip}>
                {tooltipValues[props.index]}
              </div>
            }
            visible={focusIndex === props.index}
            placement="bottom"
          >
            {React.cloneElement(node, {
              onFocus: () => { handleFocus(props.index); },
              onBlur: handleBlur
            })}
          </Tippy>
        )}
      />
      <div className={styles.sliderLabels}>
        <span className={styles.label}>{minAmount}</span>
        <span className={styles.label}>{maxAmount}</span>
      </div>
    </div>
  );
};

export default SliderAmount;
