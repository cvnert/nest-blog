import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FollowService } from './follow.service';
import { CreateFollowDto } from './dto/create-follow.dto';
import { UpdateFollowDto } from './dto/update-follow.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginGuard } from 'src/guard/login.guard';

@ApiTags('关注')
@Controller('follow')
export class FollowController {
  constructor(private readonly followService: FollowService) {}
  // 用户之间互相关注 传入关注者uid和被关注者uid
  @Post()
  @ApiOperation({
    summary: '关注,传uid',
  })
  @UseGuards(LoginGuard)
  create(@Body() createFollowDto: CreateFollowDto) {
    return this.followService.create(createFollowDto);
  }
  // 取消关注
  @Post('cancel')
  @UseGuards(LoginGuard)
  @ApiOperation({
    summary: '取消关注',
  })
  cancelFollow(@Body() createFollowDto: CreateFollowDto) {
    return this.followService.remove(createFollowDto);
  }

  // 查询关注列表
  @Get()
  @UseGuards(LoginGuard)
  @ApiOperation({
    summary: '查询关注列表',
  })
  findAll(@Query('uid') uid: string) {
    return this.followService.getFollowList(uid);
  }

  // 查询粉丝列表
  @Get('fans')
  @UseGuards(LoginGuard)
  @ApiOperation({
    summary: '查询粉丝列表',
  })
  findFans(@Query('uid') uid: string) {
    return this.followService.getFansList(uid);
  }
}
