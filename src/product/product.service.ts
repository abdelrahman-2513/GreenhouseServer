// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { ProductDocument } from './schemas/product.schema';
// import { CreateProductDTO } from './dtos/createProduct.dto';
// import { IProduct } from './interfaces/product.interface';
// import { UpdateProductDTO } from './dtos/updateProduct.dto';

// @Injectable()
// export class ProductService {
//   constructor(
//     @InjectModel('Product') private productModel: Model<ProductDocument>,
//   ) {}
//   // Create new Product Function
//   public async createProduct(ProductData: CreateProductDTO): Promise<IProduct> {
//     const newProduct = await this.productModel.create(ProductData);

//     return newProduct;
//   }
//   //Read Product from DB
//   public async findProduct(Product_id: string): Promise<IProduct> {
//     const Product = await this.productModel.findById(Product_id);
//     return Product;
//   }

//   // Read all Products
//   public async findAllProducts(): Promise<IProduct[]> {
//     const Products = await this.productModel.find({});
//     return Products;
//   }
//   // Update Product Data
//   public async updateProduct(
//     Product_id: string,
//     ProductData: UpdateProductDTO,
//   ): Promise<IProduct> {
//     const updatedProduct = await this.productModel.findByIdAndUpdate(
//       Product_id,
//       ProductData,
//     );
//     return updatedProduct;
//   }
//   // Delete Product
//   public async deleteProduct(Product_id: string) {
//     await this.productModel.findByIdAndDelete(Product_id);
//   }
// }
