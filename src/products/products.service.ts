import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  insertProduct(title: string, desc: string, price: number) {
    const rand = Math.floor(100000 + Math.random() * 900000);
    const prodId = `${Date.now()}${rand}`;
    const newProduct = new Product(prodId, title, desc, price);

    this.products.push(newProduct);
    return prodId;
  }

  getProducts() {
    return [...this.products];
  }

  getProduct(productId: string) {
    const product = this.findProduct(productId)[0];
    return { ...product };
  }

  updateProduct(
    productId: string,
    title: string,
    desc: string,
    price: number,
  ) {
    const [product, index] = this.findProduct(productId);
    const updatedProduct = { ...product };
    if (title) updatedProduct.title = title;
    if (price) updatedProduct.price = price;
    if (desc) updatedProduct.desc = desc;
  }

  private findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex((el) => el.id === id);
    const product = this.products[productIndex];

    if (!product) {
      throw new NotFoundException('Could not find Product');
    }

    return [product, productIndex];
  }
}
