import { useEffect, useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
// import required modules
import { Navigation } from 'swiper/modules';

//react-rating
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

const Testimonials = () => {
  const [reviews,setReviews]=useState([]);

  useEffect(()=>{
    fetch('http://localhost:5000/reviews')
    .then(res=>res.json())
    .then(data=>setReviews(data))
  },[])
  return (
    <section className="my-20">
      <SectionTitle subHeading="What Our Client Say" heading="Testimonials">
      </SectionTitle>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">  
       {
        reviews.map(review =><SwiperSlide key={review._id}>
          <div className="m-24 flex flex-col items-center">
          <Rating
      style={{ maxWidth: 180 }}
      value={review.rating}
    />
            <p className="my-3"> {review.details} </p>
            <h3 className="text-2xl text-orange-400">{review.name}</h3>
          </div>
        </SwiperSlide>)
       }
      </Swiper>
      
    </section>
  );
};

export default Testimonials;