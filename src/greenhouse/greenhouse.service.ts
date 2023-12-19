import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { greenhouseDocument } from './schemas/greenhouse.schema';
import { CreateGreenhouseDTO } from './dtos/createGreenhouse.dto';
import { IGreenhouse } from './interfaces/greenhouse.interface';
import { UpdateGreenhouseDTO } from './dtos/updateGreenhouse.dto';
import { IGStatistics } from './interfaces/greenhouse.stat.interface';

@Injectable()
export class GreenhouseService {
  constructor(
    @InjectModel('Greenhouse')
    private greenHouseModel: Model<greenhouseDocument>,
  ) {}
  // Create new Greenhouse Function
  public async createGreenhouse(
    houseData: CreateGreenhouseDTO,
  ): Promise<IGreenhouse> {
    const newGreenhouseStatistics: IGStatistics = {
      users: 0,
      products: 0,
      processes: 0,
      successedProcesses: 0,
      robots: 0,
    };
    houseData.statistics = newGreenhouseStatistics;
    const newGreenhouse = await this.greenHouseModel.create(houseData);
    return newGreenhouse;
  }
  //Read greenhouse from DB
  public async findGreenhouse(house_id: string): Promise<IGreenhouse> {
    const greenhouse = await this.greenHouseModel.findById(house_id);
    return greenhouse;
  }

  // Read all greenhouses
  public async findAllGreenhouses(): Promise<IGreenhouse[]> {
    const greenhouses = await this.greenHouseModel.find({});
    return greenhouses;
  }
  // Update Greenhouse Data
  public async updateHouse(
    house_id: string,
    houseData: UpdateGreenhouseDTO,
  ): Promise<IGreenhouse> {
    const updatedHouse = await this.greenHouseModel.findByIdAndUpdate(
      house_id,
      houseData,
    );
    return updatedHouse;
  }
  // Delete house
  public async deletehouse(house_id: string) {
    await this.greenHouseModel.findByIdAndDelete(house_id);
  }

  public async addInStats(house_id: string, stat: string) {
    try {
      const updatedGreenhouse = await this.greenHouseModel.updateOne(
        { _id: house_id },
        { $inc: { [`statistics.${stat}`]: 1 } },
        { new: true },
      );
      return updatedGreenhouse;
    } catch (err) {
      console.log(err);
    }
  }
  public async deleteInStats(house_id: string, stat: string) {
    try {
      const updatedGreenhouse = await this.greenHouseModel.updateOne(
        { _id: house_id },
        { $inc: { [`statistics.${stat}`]: -1 } },
        { new: true },
      );
      return updatedGreenhouse;
    } catch (err) {
      console.log(err);
    }
  }
}
