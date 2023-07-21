import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import * as fs from 'fs';
import * as path from 'path';
import * as multer from 'multer';
import { UploadService } from './upload.service';
import { LoginGuard } from 'src/guard/login.guard';

if (!fs.existsSync('./public/uploads')) {
  fs.mkdirSync('./public/uploads');
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(
      null,
      file?.fieldname + '-' + uniqueSuffix + path.extname(file?.originalname),
    );
  },
});

@Controller('upload')
@UseGuards(LoginGuard)
@ApiTags('文件上传')
export class UploadController {
  constructor(private readonly ossService: UploadService) {}
  @ApiOperation({
    summary: '上传文件(磁盘存储,建议使用)',
  })
  @UseGuards(LoginGuard)
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage,
    }),
  )
  uploadFile(
    @UploadedFile()
    files,
  ) {
    if (files == undefined) {
      throw new BadRequestException('请选择需要上传的文件');
    } else {
      return '/uploads/' + files?.filename;
    }
  }
}
