import featuredImg from '../../../assets/home/featured.jpg'
import SectionTitle from './../../../components/SectionTitle/SectionTitle';
import './featured.css';
const Featured = () => {
  return (
    <div className='featured-item p-10'>
      <SectionTitle heading="Featured Item" subHeading="Check It Out"></SectionTitle>
      <div className='md:flex justify-center bg-slate-500 bg-opacity-40 items-center gap-5 py-8 px-16'>
        <div>
          <img src={featuredImg} alt="" />
        </div>
        <div className='text-white'>
          <p>Aug 20,2025</p>
          <p className="uppercase">Wher can I get</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati iure dolores eum magnam? Odio eaque illo ullam deleniti vitae voluptatum, quasi nobis assumenda sed officia consequatur perspiciatis error fugiat rerum accusantium! Maiores, minus cum consectetur quos quia possimus eaque deleniti, et eligendi temporibus error fuga optio nihil quaerat. Reiciendis, perspiciatis?</p>
          <button className="btn btn-outline text-white my-4 border-0 border-b-4">Order Now</button>
        </div>
      </div>
    </div>
  );
};

export default Featured;