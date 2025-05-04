import { IProduct } from "@/Interfaces/IProduct";

const APIFETCH = process.env.NEXT_PUBLIC_APIFETCH;

const GetProducts = async (): Promise<IProduct[]> => {
  try {
    const res = await fetch(`${APIFETCH}/products`, { next: { revalidate: 1200 } });
    if (!res.ok) {
      throw new Error(`Error fetching products: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      throw new Error(`Error while obtaining products: ${error.message}`);
    } else {
      console.error("An unknown error occurred");
      throw new Error("Error while obtaining products: An unknown error occurred");
    }
  }
};

const GetProductById = async (id: string): Promise<IProduct | null> => {
  try {
    const products: IProduct[] = await GetProducts();
    const productById = products.find((product) => product.id.toString() === id);

    if (!productById) {
      throw new Error(`Product with id ${id} not found`);
    }

    return productById;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error while obtaining product by id: ${error.message}`);
    } else {
      throw new Error("Error while obtaining product by id: An unknown error occurred");
    }
  }
};

const GetCategory = async (CategoryId: string): Promise<IProduct | null> => {
  try {
    const products: IProduct[] = await GetProducts();
    const Category = products.find((product) => product.categoryId.toString() === CategoryId);

    if (!Category) {
      throw new Error(`Product with id ${CategoryId} not found`);
    }

    return Category;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error while obtaining product by id: ${error.message}`);
    } else {
      throw new Error("Error while obtaining product by id: An unknown error occurred");
    }
  }
};


export { GetProducts, GetProductById, GetCategory }