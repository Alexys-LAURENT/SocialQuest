'use client';
import { CheckboxGroup, Checkbox, Slider, Input, Select, SelectItem } from '@nextui-org/react';
const page = () => {
  return (
    <div className={`flex flex-col max-w-[1280px] w-full px-2 md:px-4 py-4 gap-6`}>
      <div className="w-full h-28  dark:bg-tempDarkHover bg-tempDarkHover/20 rounded-md"></div>

      {/* ///////////////items les plus achetés/////////////// */}
      <div>
        <h3>items les plus achetés</h3>
        <div className="flex flex-row items-center max-w-full py-2 gap-2 overflow-x-auto flex-nowrap">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((item, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center justify-center min-w-[150px] w-[150px] min-h-[200px] h-[200px] | md:min-w-[200px] md:w-[200px] md:min-h-[250px] md:h-[250px] p-2 bg-tempBgLightSecondary dark:bg-tempBgDark border border-tempLightBorder dark:border-tempDarkBorder rounded-md"
            >
              <div className="flex w-full h-[70%] dark:bg-tempDarkHover bg-tempDarkHover/20 rounded-md"></div>
              <div className="flex w-full h-[30%]">
                <p>item {item}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* ////////////////////////////// */}

      {/* ///////////////dernires ventes/////////////// */}
      <div>
        <h3>Dernières ventes</h3>
        <div className="flex flex-row items-center max-w-full py-2 gap-2 overflow-x-auto flex-nowrap">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((item, index) => (
            <div
              key={index}
              className="relative flex flex-row items-center justify-center p-1 px-2 gap-2 bg-tempBgLightSecondary dark:bg-tempBgDark border border-tempLightBorder dark:border-tempDarkBorder rounded-md"
            >
              <div className="flex min-w-[40px] w-[40px] max-h-[40px] h-[40px] dark:bg-tempDarkHover bg-tempDarkHover/20 rounded-md"></div>
              <div className="flex flex-col ">
                <p className="text-tiny whitespace-nowrap">Weexo zdad ad z</p>
                <p className="text-tiny">$ {item}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* ////////////////////////////// */}

      {/* /////////////MARKET CONTAINER///////////////// */}
      <div className="flex flex-col sm:flex-row w-full h-auto gap-2">
        {/* /////////////Filter Section///////////////// */}
        <div className="w-full sm:w-4/12 sm:max-w-[250px] h-fit flex flex-col gap-4 rounded-md bg-tempBgLightSecondary dark:bg-tempBgDark border border-tempLightBorder dark:border-tempDarkBorder p-2">
          <div className="flex flex-col w-full gap-2">
            <div>
              <h4>Prix</h4>
              <div className="flex w-full items-center justify-between ">
                <Slider
                  label="‎"
                  isDisabled={false}
                  step={10}
                  defaultValue={[0, 100]}
                  minValue={0}
                  maxValue={1000}
                  formatOptions={{ style: 'currency', currency: 'EUR' }}
                  className="max-w-md"
                />
              </div>
            </div>
            <CheckboxGroup>
              <Checkbox value="0-50">0-50</Checkbox>
              <Checkbox value="50-100">50-100</Checkbox>
              <Checkbox value="100-150">100-150</Checkbox>
              <Checkbox value="150-200">150-200</Checkbox>
            </CheckboxGroup>
          </div>

          <div className="flex flex-col w-full gap-2">
            <h4>Type</h4>
            <CheckboxGroup>
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
        {/* ////////////////////////////// */}

        {/* /////////////Market Section///////////////// */}
        <div className="rounded-md bg-tempBgLightSecondary dark:bg-tempBgDark border border-tempLightBorder dark:border-tempDarkBorder w-full h-fit flex flex-col">
          {/* /////TopROW//////// */}
          <div className="w-full p-4 flex flex-col sm:flex-row items-center justify-between">
            <Input className="w-full sm:w-7/12 !min-h-10 !h-10" classNames={{ inputWrapper: '!min-h-10 !h-10' }} />
            <div className="flex items-center w-full sm:w-3/12">
              <label htmlFor="" className="flex text-tiny w-[80px]">
                Trier par:
              </label>
              <Select
                variant="underlined"
                placeholder="Choisir un filtre"
                classNames={{ trigger: 'border-none py-0' }}
                multiple={false}
              >
                <SelectItem key="prix-croissant" value="prix-croissant">
                  Prix (croissant)
                </SelectItem>
                <SelectItem key="prix-décroissant" value="prix-décroissant">
                  Prix (décroissant)
                </SelectItem>
                <SelectItem key="A-Z" value="A-Z">
                  A-Z
                </SelectItem>
                <SelectItem key="Z-A" value="Z-A">
                  Z-A
                </SelectItem>
              </Select>
            </div>
          </div>
          {/* ////////////////////////////// */}

          {/* /////////ALL Items /////////////// */}
          <div className="flex w-full overflow-hidden gap-2 p-4 flex-wrap">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((item, index) => (
              <div
                key={index + 100}
                className="relative flex flex-col items-center justify-center min-w-[150px] w-[150px] min-h-[200px] h-[200px] | md:min-w-[200px] md:w-[200px] md:min-h-[250px] md:h-[250px] p-2 bg-tempBgLightSecondary dark:bg-tempBgDark border border-tempLightBorder dark:border-tempDarkBorder rounded-md"
              >
                <div className="flex w-full h-[70%] dark:bg-tempDarkHover bg-tempDarkHover/20 rounded-md"></div>
                <div className="flex w-full h-[30%]">
                  <p>item {item}</p>
                </div>
              </div>
            ))}
          </div>
          {/* ////////////////////////////// */}
        </div>
        {/* ////////////////////////////// */}
      </div>
      {/* ////////////////////////////// */}
    </div>
  );
};

export default page;
