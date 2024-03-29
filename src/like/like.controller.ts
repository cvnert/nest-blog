import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  Query,
  UseGuards,
} from '@nestjs/common';
import { LikeService } from './like.service';
import { CreateLikeDto, QueryInfo } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginGuard } from 'src/guard/login.guard';

@Controller('like')
@ApiTags('点赞')
@UseGuards(LoginGuard)
export class LikeController {
  constructor(private readonly likeService: LikeService) {}
  @Post()
  @ApiOperation({
    summary: '给文章点赞',
  })
  create(@Body() createLikeDto: CreateLikeDto, @Headers() res: any) {
    const token = res.token;
    return this.likeService.create(createLikeDto, token);
  }

  @Delete(':id')
  @UseGuards(LoginGuard)
  @ApiOperation({
    summary: '取消点赞',
  })
  remove(@Param('id') id: string, @Headers() res: any) {
    const token = res.token;
    return this.likeService.remove(+id, token);
  }
}
