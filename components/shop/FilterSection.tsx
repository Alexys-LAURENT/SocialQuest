'use client';
import { CheckboxGroup, Checkbox, Slider, RadioGroup, Radio } from '@nextui-org/react';
import { shopSearchParmas } from '@/app/types/entities';
import { getCheckboxGroupDefaultValue } from '@/utils/getCheckboxGroupDefaultValue';
import { useEffect, useState } from 'react';

const FilterSection = ({ searchParams }: { searchParams: shopSearchParmas }) => {
  const [price, setPrice] = useState({ min: 93, max: 1000 });
  const [selectedRadio, setSelectedRadio] = useState('0-50');

  const handleRadioChange = (value: string) => {
    switch (value) {
      case '0-100':
        setPrice((prev) => ({ ...prev, min: 0, max: 100 }));
        break;
      case '100-250':
        setPrice((prev) => ({ ...prev, min: 100, max: 250 }));
        break;
      case '250-400':
        setPrice((prev) => ({ ...prev, min: 250, max: 400 }));
        break;
      case '400-550':
        setPrice((prev) => ({ ...prev, min: 400, max: 550 }));
        break;
      default:
        break;
    }
    setSelectedRadio(value);
  };

  useEffect(() => {
    console.log(price);
    console.log(document.getElementById('priceSlider'));
  }, [price]);

  const handleSliderChange = (value: number[] | number) => {
    if (Array.isArray(value)) {
      // Mettre à jour la valeur de price avec les nouvelles valeurs min et max
      setPrice((prevPrice) => ({ min: value[0] || prevPrice.min, max: value[1] || prevPrice.max }));

      // Mettre à jour la valeur de selectedRadio en fonction des nouvelles valeurs min et max
      let newSelectedRadio;
      if (value[0] === 0 && value[1] === 100) {
        newSelectedRadio = '0-100';
      } else if (value[0] === 100 && value[1] === 250) {
        newSelectedRadio = '100-250';
      } else if (value[0] === 250 && value[1] === 400) {
        newSelectedRadio = '250-400';
      } else if (value[0] === 400 && value[1] === 550) {
        newSelectedRadio = '400-550';
      } else {
        newSelectedRadio = '';
      }

      setSelectedRadio(newSelectedRadio);
    }
  };

  return (
    <div className="w-full sm:w-4/12 sm:max-w-[250px] h-fit flex flex-col gap-4 rounded-md bg-tempBgLightSecondary dark:bg-tempBgDark border border-tempLightBorder dark:border-tempDarkBorder p-2">
      <div className="flex flex-col w-full gap-2">
        <div>
          <h4>Prix</h4>
          <div className="flex w-full items-center justify-between ">
            <Slider
              id="priceSlider"
              label="‎"
              isDisabled={false}
              step={10}
              onChange={(e) => handleSliderChange(e)}
              defaultValue={[100, 400]}
              value={[price.min, price.max]}
              minValue={0}
              maxValue={1000}
              formatOptions={{ style: 'currency', currency: 'eur' }}
              className="max-w-md"
            />
          </div>
        </div>
        <RadioGroup isDisabled={false} value={selectedRadio} onChange={(e) => handleRadioChange(e.target.value)}>
          <Radio value="0-100">0-100</Radio>
          <Radio value="100-250">100-250</Radio>
          <Radio value="250-400">250-400</Radio>
          <Radio value="400-550">400-550</Radio>
        </RadioGroup>
      </div>

      <div className="flex flex-col w-full gap-2">
        <h4>Type</h4>
        <CheckboxGroup defaultValue={getCheckboxGroupDefaultValue(searchParams.type)}>
          <Checkbox value="Bannières">Bannières</Checkbox>
          <Checkbox value="Badges">Badges</Checkbox>
          <Checkbox value="Armes">Armes</Checkbox>
        </CheckboxGroup>
      </div>
      <div className="flex flex-col w-full gap-2">
        <button className="!w-full customButton bg-secondary !text-textLight"> Confirm</button>
        <button className="!w-full customButton "> Clear all</button>
      </div>
    </div>
  );
};

export default FilterSection;
