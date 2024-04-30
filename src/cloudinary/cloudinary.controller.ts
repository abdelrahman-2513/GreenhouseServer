import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';

@Controller('cloudinary')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}
  @Post('upload/single')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadSingleFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any, // Capture the entire request body
  ) {
    const { robots, files } = body; // Extract the robots parameter from the request body
    console.log(file);

    const res = await this.cloudinaryService.createUpdate(
      robots.split(','),
      file,
    );
    return res;
  }

  @Get('update/:id')
  async getUpload(@Param('id') id: string) {
    return await this.cloudinaryService.getUpdateById(id);
  }
  @Get('update/')
  async getUploads() {
    return await this.cloudinaryService.getAllUpdates();
  }
  @Get('update/robot/:id')
  async getRobotUploads(@Param('id') id: string) {
    return await this.cloudinaryService.getRobotUpdates(id);
  }
  @Patch('/update/:updateId/robot/:robotId')
  async updateRobot(
    @Param('updateId') updateId: string,
    @Param('robotId') robotId: string,
  ) {
    return await this.cloudinaryService.updateRobot(updateId, robotId);
  }

  @Delete('/update/:id')
  async deleteUpdate(@Param('id') id: string) {
    return await this.cloudinaryService.deleteUpdate(id);
  }
}
