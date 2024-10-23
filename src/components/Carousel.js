function Carousel({ product }) {

  // 檢查 product 是否存在
  if (!product) {
    return <div>Loading...</div>; // 或者返回一個替代的 UI
  }

  // 判斷 imagesUrl 是否有圖片，並過濾掉空的 URL
  const images = Array.isArray(product.imagesUrl) ? product.imagesUrl.filter(image => image) : [];
  const hasImages = images.length > 0;

  return (
    <>
      {hasImages ? (
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={product.imageUrl} className="d-block w-100" alt="..." />
            </div>
            {images.map((image, index) => (
              <div className="carousel-item" key={index}>
                <img src={image} className="d-block w-100" alt="..." />
              </div>
            ))}
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      ) : (
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="d-block w-100">
              <img src={product.imageUrl} className="d-block w-100" alt="..." />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Carousel;