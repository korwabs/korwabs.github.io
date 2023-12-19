const MainImage = () => {
  return (
    <div className="lg:absolute lg:inset-y-0 lg:right-1 lg:w-1/2 mt-40 mr-20">
      <img
        className="h-40 w-full object-cover sm:hidden md:block md:h-45 lg:w-full lg:h-5/6"
        src="https://cdn.pixabay.com/photo/2015/01/09/11/11/office-594119_1280.jpg"
        alt="WABS Image"
      />
    </div>
  );
};

export default MainImage;
