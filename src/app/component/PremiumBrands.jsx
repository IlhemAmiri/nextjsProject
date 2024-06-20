import Link from 'next/link';

const BrandCard = ({ image, brand }) => (
  <Link href={`/cars/search?marque=${brand}`}>
    <div className="w-[210px] h-[181px] bg-white border border-[#E9E9E9] rounded-lg hover:scale-105 p-6 flex flex-col items-center transition-transform duration-200 cursor-pointer">
      <img src={image} alt={brand} className="w-24 h-24 mb-4" />
      <p className="text-[#050B20] font-dm-sans text-lg font-medium leading-tight text-center">{brand}</p>
    </div>
  </Link>
);

const PremiumBrands = () => (
  <div className="bg-gray-100 py-12">
    <div className="text-center mb-8">
      <h2 className="text-[#050B20] font-dm-sans text-4xl font-bold leading-tight py-12">Explore Our Premium Brands</h2>
    </div>
    <div className="flex flex-wrap justify-center gap-4">
      <BrandCard image="/images/audi.png" brand="Audi" />
      <BrandCard image="/images/bmw.png" brand="BMW" />
      <BrandCard image="/images/ford.png" brand="Ford" />
      <BrandCard image="/images/mercedes.png" brand="Mercedes Benz" />
      <BrandCard image="/images/peugeot.png" brand="Peugeot" />
      <BrandCard image="/images/volkswagen.png" brand="Volkswagen" />
    </div>
  </div>
);

export default PremiumBrands;
