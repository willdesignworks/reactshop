import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

/* global $ */

function HomeBanner() {
  const [slides, setSlides] = useState([]);

  const slidergetbanner = async (page = 1, category = '輪播') => {
    try {
      const productRes = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/products?page=${page}&category=${category}`);
      setSlides(productRes.data.products);
    } catch (error) {
      console.error('API 請求錯誤:', error);
    }
  };

  useEffect(() => {
    slidergetbanner(1, '輪播');
  }, []);

  useEffect(() => {
    // 在 slides 更新後初始化 Owl Carousel
    if (slides.length > 0) {
      if (window.$) {
        // 初始化 Owl Carousel
        const owl = $('.slider__activation__wrap').owlCarousel({
          items: 1,
          loop: true,
          autoplay: true,
          autoplayTimeout: 5000,
          dots: true,
          nav: true,
          navText: [
            `<div class='owl-prev'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path>
              </svg>
              Prev
            </div>`,
            `<div class='owl-next'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path>
            </svg>
              Next
            </div>`
          ],
        });

        // 添加鼠标悬停事件以暂停轮播
        $('.slider__activation__wrap').on('mouseenter', () => {
          owl.trigger('stop.owl.autoplay');
        });

        $('.slider__activation__wrap').on('mouseleave', () => {
          owl.trigger('play.owl.autoplay', [5000]); // 继续轮播，时间为5000ms
        });

        // 清理 Owl Carousel 实例
        return () => {
          owl.trigger('destroy.owl.carousel');
        };
      }
    }
  }, [slides]);

  return (
    <div className="slider__container slider--one">
      <div className="slider__activation__wrap owl-carousel owl-theme">
        {slides.map((slide, index) => (
          <div key={index} className="slide slider__full--screen" style={{ backgroundImage: `url(${slide.imageUrl})` }}>
            <div className="container">
              <div className="row">
                <div className="col-lg-8">
                  <div className="slider__inner">
                    <h1><span className="text--theme">{slide.title}</span></h1>
                    <div className="slider__btn">
                    <span>{slide.content}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeBanner;