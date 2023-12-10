import { IsNumber, IsString } from "class-validator";
import { EProduct } from "src/auth/enum";
import { Greenhouse } from "src/greenhouse/schemas/greenhouse.schema";

export class CreateProductDTO{
    @IsString()
    name: string;
    @IsNumber()
    quantity: number;
    @IsString()
    type: EProduct;
    greenhouse: Greenhouse;
    phases:object[]
}