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
import { GreenhouseService } from './greenhouse.service';
import { Response } from 'express';
import { EUserRoles } from 'auth/enum';
import { Roles } from 'auth/decorators';
import { UpdateGreenhouseDTO } from './dtos/updateGreenhouse.dto';
import { CreateGreenhouseDTO } from './dtos/createGreenhouse.dto';
@Controller('greenhouse')
export class GreenhouseController {
  constructor(private greenhouseSVC: GreenhouseService) {}
  // Endpoint for getting all (greenhouses /greenhouse/)
  @Get('')
  private async getAllHouses(@Res() res: Response) {
    try {
      const greenhouses = await this.greenhouseSVC.findAllGreenhouses();
      res.status(200).send(greenhouses);
    } catch (err) {
      console.log(err);
      res.status(400).send('Sorry try again later');
    }
  }
  @Get('/:house_id')
  private async getHouse(
    @Res() res: Response,
    @Param('house_id') house_id: string,
  ) {
    try {
      const house = await this.greenhouseSVC.findGreenhouse(house_id);
      res.status(200).send(house);
    } catch (err) {
      console.log(err);
      res.status(400).send('Sorry try again later');
    }
  }
  @Patch('/:house_id')
  private async updatehouse(
    @Res() res: Response,
    @Param('house_id') house_id: string,
    @Body() updatehouse: UpdateGreenhouseDTO,
  ) {
    try {
      const updatedhouse = await this.greenhouseSVC.updateHouse(
        house_id,
        updatehouse,
      );
      res.status(201).send(updatedhouse);
    } catch (err) {
      console.log(err);
      res
        .status(400)
        .send(
          'Sorry try again later and check houseId or email and name feilds!',
        );
    }
  }
  @Roles(EUserRoles.ADMIN)
  @Post('/')
  private async createhouse(
    @Res() res: Response,
    @Body() createhouse: CreateGreenhouseDTO,
  ) {
    try {
      const newhouse = await this.greenhouseSVC.createGreenhouse(createhouse);
      res.status(201).send(newhouse);
    } catch (err) {
      console.log(err);
      res.status(400).send('Sorry try again later OR check house Feilds!');
    }
  }
  @Delete('/:house_id')
  private async deletehouse(
    @Res() res: Response,
    @Param('house_id') house_id: string,
  ) {
    try {
      const newhouse = await this.greenhouseSVC.deletehouse(house_id);
      res.status(204).send('Deleted successfully!');
    } catch (err) {
      console.log(err);
      res.status(400).send('Sorry try again later and check houseId !');
    }
  }
}
