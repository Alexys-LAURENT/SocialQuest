'use client';
import { CheckboxGroup, Checkbox, Button } from '@nextui-org/react';
import { shopSearchParmas } from '@/app/types/entities';
import { getCheckboxGroupTypeDefaultValue } from '@/utils/getCheckboxGroupTypeDefaultValue';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCheckboxGroupPriceDefaultValue } from '@/utils/getCheckboxGroupPriceDefaultValue';
const FilterSection = ({ searchParams }: { searchParams: shopSearchParmas }) => {
  const [selectedType, setSelectedType] = useState<string[]>(getCheckboxGroupTypeDefaultValue(searchParams.type));
  const [selectedPrice, setSelectedPrice] = useState<string[]>(getCheckboxGroupPriceDefaultValue(searchParams.price));

  const router = useRouter();

  const handleSubmit = () => {
    var url = '/shop?';
    if (searchParams.name) {
      url += `name=${searchParams.name}&`;
    }
    if (searchParams.order) {
      url += `order=${searchParams.order}&`;
    }
    if (selectedType && selectedType[0] !== '') {
      url += `type=${selectedType.join(',')}&`;
    }
    if (selectedPrice && selectedPrice[0] !== '') {
      url += `price=${selectedPrice.join(',')}&`;
    }
    router.push(url);
  };

  return (
    <div className="w-full sm:w-4/12 sm:max-w-[250px] h-fit flex flex-col gap-4 rounded-md bg-tempBgLightSecondary dark:bg-tempBgDark border border-tempLightBorder dark:border-tempDarkBorder p-2">
      <div className="flex flex-col w-full gap-2">
        <div>
          <h4>Prix</h4>
        </div>
        <CheckboxGroup value={selectedPrice} onChange={(e) => setSelectedPrice(e as string[])}>
          <Checkbox value="0-100">0-100</Checkbox>
          <Checkbox value="100-250">100-250</Checkbox>
          <Checkbox value="250-400">250-400</Checkbox>
          <Checkbox value="400-550">400-550</Checkbox>
          <Checkbox value="gt-550">+550</Checkbox>
        </CheckboxGroup>
      </div>

      <div className="flex flex-col w-full gap-2">
        <h4>Types</h4>
        <CheckboxGroup value={selectedType} onChange={(e) => setSelectedType(e as string[])}>
          <Checkbox value="Banniere">Bannières</Checkbox>
          <Checkbox value="Badge">Badges</Checkbox>
          <Checkbox value="Arme">Armes</Checkbox>
        </CheckboxGroup>
      </div>
      <div className="flex flex-col w-full gap-2">
        <Button
          className="!w-full customButton bg-secondary/70 border-secondary !text-textLight"
          onClick={() => handleSubmit()}
        >
          Filtrer
        </Button>
        <Button className="!w-full customButton bg-transparent"> Supprimer les filtres</Button>
      </div>
    </div>
  );
};

export default FilterSection;
