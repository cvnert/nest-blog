import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { FollowService } from './follow.service';
import { CreateFollowDto } from './dto/create-follow.dto';
import { UpdateFollowDto } from './dto/update-follow.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('关注')
@Controller('follow')
export class FollowController {
  constructor(private readonly followService: FollowService) {}
  // 用户之间互相关注 传入关注者uid和被关注者uid
  @Post()
  @ApiOperation({
    summary: '关注,传uid',
  })
  create(@Body() createFollowDto: CreateFollowDto) {
    return this.followService.create(createFollowDto);
  }
  // 取消关注
  @Post('cancel')
  @ApiOperation({
    summary: '取消关注',
  })
  cancelFollow(@Body() createFollowDto: CreateFollowDto) {
    return this.followService.remove(createFollowDto);
  }

  // 查询关注列表
  @Get()
  @ApiOperation({
    summary: '查询关注列表',
  })
  findAll(@Query('uid') uid: string) {
    return this.followService.getFollowList(uid);
  }

  // 查询粉丝列表
  @Get('fans')
  @ApiOperation({
    summary: '查询粉丝列表',
  })
  findFans(@Query('uid') uid: string) {
    return this.followService.getFansList(uid);
  }
}
