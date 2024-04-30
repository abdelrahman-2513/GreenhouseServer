import { Delete, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import { Model, Types } from 'mongoose';
import { updateDocument } from './schemas/update.schema';
import { CreateUpdateDTO } from './dtos/create.update.dto';
import { IUpdate } from './interfaces/update.interface';
import { UpdateUpdateDTO } from './dtos/update.update.dto';

@Injectable()
export class CloudinaryService {
  constructor(
    @InjectModel('Update') private readonly updateModel: Model<updateDocument>,
  ) {}
  /**
   * This function is used to upload update to database
   * @param updateData CreateUpdateDTO (The data of the uploaded updated)
   * @returns created updated
   */
  async addUpdateToDatabase(updateData: CreateUpdateDTO): Promise<IUpdate> {
    try {
      const newUpdate: IUpdate = await this.updateModel.create(updateData);
      return newUpdate;
    } catch (err) {
      console.log(err);
      throw new Error('Cannot Create update now!');
    }
  }
  /**
   * This function is used to create update
   * @param updateRobots :string[] That includes the robots to be updated
   * @param file :File The file to be uploaded
   * @returns uploaded update
   */
  async createUpdate(
    updateRobots: string[],
    file: Express.Multer.File,
  ): Promise<IUpdate> {
    try {
      const updatedData: CreateUpdateDTO = { url: '', robots: [], updated: [] };
      const result = await this.uploadFile(file);
      const fileUrl: string = result.secure_url;
      console.log(fileUrl);
      updatedData.url = fileUrl;

      updatedData.robots = updateRobots.map(
        (robot) => new Types.ObjectId(robot),
      );
      console.log(updateRobots);
      updatedData.updated = [];
      const newUpdate: IUpdate = await this.addUpdateToDatabase(updatedData);
      return newUpdate;
    } catch (err) {
      console.log(err);
      throw new Error('Error on uploading update!');
    }
  }

  /**
   * This functionis used to upload file to cloudinary
   * @param file :File The file to be uploaded to cloudinary
   * @returns the response of the uploaded file
   */
  async uploadFile(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      v2.uploader
        .upload_stream(
          {
            resource_type: 'auto', // Detect resource type automatically
            format: 'pdf', // Force the file to be treated as a PDF
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          },
        )
        .end(file.buffer);
    });
  }
  /**
   * This function is used to update the update data.
   * @param id :The update id
   * @param updateData :The data updates
   * @returns The updated data
   */
  async updateUpdateById(
    id: string,
    updateData: UpdateUpdateDTO,
  ): Promise<IUpdate> {
    try {
      const updatedUpdate: IUpdate = await this.updateModel.findByIdAndUpdate(
        id,
        updateData,
      );
      return updatedUpdate;
    } catch (err) {
      console.log(err);
      throw new Error('No updates by this Id');
    }
  }

  /**
   * This funciton ius used to get the update by Id
   * @param id :string The id of the update
   * @returns the update data
   */
  async getUpdateById(id: string): Promise<IUpdate> {
    try {
      const update: IUpdate = await this.updateModel.findById(id);
      if (!update) throw new Error('No updates by this id!');
      return update;
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  }
  /**
   * This function in getting updates.
   * @returns all updates
   */
  async getAllUpdates(): Promise<IUpdate[]> {
    try {
      const allUpdates: IUpdate[] = await this.updateModel.find();
      return allUpdates;
    } catch (err) {
      console.log(err);
      throw new Error('Error in getting updates!');
    }
  }
  /**
   * This function is used to get rbot updates
   * @param robotId : The robot id to be checked
   * @returns either robot update or message that rbobt is up bto date
   */
  async getRobotUpdates(robotId: string): Promise<IUpdate | string> {
    try {
      const newrobotId = new Types.ObjectId(robotId);
      const robotUpdates: IUpdate = await this.updateModel
        .findOne({ robots: newrobotId, updated: { $nin: [newrobotId] } })
        .sort({ created_at: -1 })
        .populate('robots');
      if (!robotUpdates) return 'The robot is up to date';
      return robotUpdates;
    } catch (err) {
      console.log(err);
      throw new Error('Cannot get robot Updates!');
    }
  }

  /**
   * This Function is used to delete update!
   * @param updateId : the id of update to be deleted
   * @returns string
   */
  async deleteUpdate(updateId: string): Promise<string> {
    try {
      // Retrieve the update from the database
      const update: IUpdate = await this.updateModel.findById(updateId);
      if (!update) throw new Error('No update found with this id!');

      // Extract the Cloudinary secure URL from the update
      const cloudinaryUrl = update.url;

      // Delete the file from Cloudinary
      if (cloudinaryUrl) {
        // Extract the public ID from the Cloudinary URL
        const publicId = cloudinaryUrl.substring(
          cloudinaryUrl.lastIndexOf('/') + 1,
          cloudinaryUrl.lastIndexOf('.'),
        );

        // Delete the file from Cloudinary using the public ID
        await v2.uploader.destroy(publicId);
      }

      // Delete the update entry from the database
      await this.updateModel.findByIdAndDelete(updateId);

      return 'Deleted Successfully!';
    } catch (err) {
      console.log(err);
      throw new Error('Failed to delete update.');
    }
  }

  /**
   * This function is used to update robot
   * @param updateID :the update id
   * @param robotId : the robot Id
   * @returns updated update
   */
  async updateRobot(updateID: string, robotId: string): Promise<IUpdate> {
    try {
      const newRobotID = new Types.ObjectId(robotId);
      const update: IUpdate = await this.updateModel.findById(updateID);
      if (!update) throw new Error('No update by this Id!');

      if (update.robots.map((elem) => elem.toString()).indexOf(robotId) === -1)
        throw new Error('The robot has no updates!');
      if (update.url) {
        const response = await fetch(update.url);
        if (response.ok) console.log(await response.arrayBuffer());
      }
      update.updated.push(newRobotID);
      return await this.updateModel.findByIdAndUpdate(updateID, {
        updated: update.updated,
      });
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  }
}
