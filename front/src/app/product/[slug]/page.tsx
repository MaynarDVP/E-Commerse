
import { GetProductById } from "@/api/DataFetchs";
import AddProduct from "@/components/Product.Buttons";

interface ProductProps {
  params: { slug: string };
}

export default  async function Product({ params }: ProductProps) {
  const { slug } = await params;

  try {
    const product = await GetProductById(slug);
    if (!product) {
      return (
        <div className="max-w-6xl mx-auto p-8">
          <h1 className="text-2xl font-bold text-red-600">Product not found</h1>
        </div>
      );
    }

    return (
      <div className="max-w-6xl mx-auto p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Sección de la imagen */}
        <div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <img
              src={product.image}
              alt={product.name}
              width={400}
              height={400}
              className="w-full h-96 object-contain rounded-lg"
            />
          </div>
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="mt-2 text-lg text-gray-600">{product.description}</p>
          <div className="mt-4 flex items-center space-x-4">
            <p className="text-xl font-bold text-blue-600">${product.price}</p>
            <p className="text-md text-gray-500">Stock: {product.stock}</p>
          </div>
          {/* Add */}
          <AddProduct product={product} />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading product:", error);
    return (
      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-2xl font-bold text-red-600">
          Error loading product. Please try again later.
        </h1>
      </div>
    );
  }
}
