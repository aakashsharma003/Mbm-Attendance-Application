import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";

// import required modules
import { EffectCards } from "swiper/modules";
import { images } from "../../Constants";
import "./Attendence.css";

const Attendence = () => {
  return (
    <div className="t-attendence-container">
      <div className="t-attendence">
        <Swiper
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img src={images.img1} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={images.img2} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={images.img3} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={images.img4} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={images.img5} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={images.img6} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={images.img7} alt="" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Attendence;
