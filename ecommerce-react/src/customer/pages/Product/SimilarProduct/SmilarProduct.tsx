import SimilarProductCard from './SimilarProductCard'
//import { useAppSelector } from '../../../../Redux Toolkit/Store'


const SmilarProduct = ({categoryId}:any) => {
  const dummyProduct = {
    id: 1,
    title: "Stylish Running Shoes",
    category: {
        categoryId: 101,
        categoryName: "Shoes"
    },
    images: [
        "https://stylequotient.co.in/cdn/shop/files/AW24SQARTI_GR-1.jpg?v=1729164593"
    ],
    seller: {
        businessDetails: {
            businessName: "Trendy Footwear"
        }
    },
    sellingPrice: 1999,
    mrpPrice: 2999,
    discountPercent: 33
};
  //const { products } = useAppSelector((store) => store);
  return (
    <div>
        <div className='grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 justify-between gap-4 gap-y-8'>

        {/* {products.products.map((item,index) => <div 
            key = {item.id} className=''>
              <SimilarProductCard product={item} />
            </div>)} */}
            {[1,1,1,1,1,1,1].map((item) => <SimilarProductCard product={dummyProduct}/>)}

        </div>
    </div>
  )
}

export default SmilarProduct