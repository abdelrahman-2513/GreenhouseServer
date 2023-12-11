import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Response } from 'express';
import { UpdateProductDTO } from './dtos/updateProduct.dto';
import { CreateProductDTO } from './dtos/createProduct.dto';
import { Roles } from 'auth/decorators';
import { EUserRoles } from 'auth/enum';
@Controller('product')
export class ProductController {
  constructor(private productSVC: ProductService) {}
  // Endpoint for getting all (Products /Product/)
  @Get('')
  private async getAllProducts(@Res() res: Response) {
    try {
      const Products = await this.productSVC.findAllProducts();
      res.status(200).send(Products);
    } catch (err) {
      console.log(err);
      res.status(400).send('Sorry try again later');
    }
  }
  @Get('/:Product_id')
  private async getProduct(
    @Res() res: Response,
    @Param('Product_id') Product_id: string,
  ) {
    try {
      const Product = await this.productSVC.findProduct(Product_id);
      res.status(200).send(Product);
    } catch (err) {
      console.log(err);
      res.status(400).send('Sorry try again later');
    }
  }
  @Patch('/:Product_id')
  private async updateProduct(
    @Res() res: Response,
    @Param('Product_id') Product_id: string,
    @Body() updateProduct: UpdateProductDTO,
  ) {
    try {
      const updatedProduct = await this.productSVC.updateProduct(
        Product_id,
        updateProduct,
      );
      res.status(201).send(updatedProduct);
    } catch (err) {
      console.log(err);
      res
        .status(400)
        .send(
          'Sorry try again later and check ProductId or email and name feilds!',
        );
    }
  }
  @Roles(EUserRoles.ADMIN)
  @Post('/')
  private async createProduct(
    @Res() res: Response,
    @Body() createProduct: CreateProductDTO,
  ) {
    try {
      const newProduct = await this.productSVC.createProduct(createProduct);
      res.status(201).send(newProduct);
    } catch (err) {
      console.log(err);
      res.status(400).send('Sorry try again later OR check Product Feilds!');
    }
  }
  @Delete('/:Product_id')
  private async deleteProduct(
    @Res() res: Response,
    @Param('Product_id') Product_id: string,
  ) {
    try {
      const newProduct = await this.productSVC.deleteProduct(Product_id);
      res.status(204).send('Deleted successfully!');
    } catch (err) {
      console.log(err);
      res.status(400).send('Sorry try again later and check ProductId !');
    }
  }
}
