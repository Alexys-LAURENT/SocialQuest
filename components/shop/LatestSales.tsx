const LatestSales = () => {
  return (
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
  );
};

export default LatestSales;
