const MainImage = () => {
  return (
    <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 mt-3 mr-3">
      <img
        className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
        src="https://cdn.pixabay.com/photo/2015/01/09/11/11/office-594119_1280.jpg"
        alt="WABS Image"
      />
    </div>
  );
};

export default MainImage;
