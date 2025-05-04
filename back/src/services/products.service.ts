import { Product } from "../entities/Product";
import { ProductRepository } from "../repositories/product.repository";

export const checkProductExists = async (itemId: number): Promise<boolean> => {
  const item: Product | null = await ProductRepository.findOneBy({
    id: itemId,
  });
  return !!item;
};

export const getProductsService = async (): Promise<Product[]> => {
  return await ProductRepository.find();
};

/*
! Revisar flujo para categorias
? organizar productos por categorias, mejorar backend para que acepte multiples peticiones
? aplicar a trabajos de programacion 
* typing test
? terminar crud con insomnia
? ver git desde 0
*/