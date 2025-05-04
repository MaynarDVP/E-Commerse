// "use client"

// import { GetCategory, GetProducts } from "@/api/DataFetchs";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import Image from "next/image";
// import { IProduct } from "@/Interfaces/IProduct";



// //! Filter for categories

// const categories: React.FC = () => {


//     const [products, setProducts] = useState<IProduct[]>([]);
//     const [categories, setCategories] = useState([]);
//     const [sCategory, setSCategory] = useState([]);
//      const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const fetchProducts = async () => {
//           try {
//             const fetchedProducts = await GetProducts();
//             setProducts(fetchedProducts);
//           } catch (err) {
//             if (err instanceof Error) {
//               setError(err.message);
//             } else {
//               setError("An unknown error occurred");
//             }
//           }
//         };

//     useEffect(() => {
//         const fetchCategories = async () => {
//             try {
//                 const fetchedCategory = await GetCategory();
//                 setCategories(fetchedCategory);
//             } catch (err) {
//                 if (err instanceof Error) {
//                     setError(err.message);
//                 } else {
//                     setError("An unknown error occurred");
//                 }
//             }
//         };
    
//         fetchCategories();
//     }, []);


//     return (
//         <div className="bg-gray-100 min-h-screen py-8">
//           {error && <p className="text-red-500">{error}</p>} 
    
//           {/* Products Grid */}
//           <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {products.map((product) => (
//               <Link href={`/product/${product.id}`} key={product.id}>
//                 <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer">
//                   {/* Product Image */}
//                   <div className="relative w-full h-48">
//                     <Image
//                       src={product.image}
//                       alt={product.name}
//                       width= {300}
//                       height={300}
//                       className="absolute inset-0 w-full h-full object-cover"
//                     />
//                   </div>
    
//                   {/* Product Details */}
//                   <div className="p-4">
//                     <h2 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h2>
//                     <p className="text-sm text-gray-600 mt-2 line-clamp-2">{product.description}</p>
//                     <p className="text-lg font-bold text-blue-600 mt-4">${product.price}</p>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       );
//     };



// export {categories};



// /*  
// ! Revisar como esta estructurado el cambio de categoria
// ? Investigar Hooks y enterderlos mejor
// ? Ver si se puede separar o no
// ! revisar cpdogp e implementacion de use effect 
// ! conversacion de chatgpt
// */