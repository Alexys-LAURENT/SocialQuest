const MostBuyedItems = () => {
  return (
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
  );
};

export default MostBuyedItems;
