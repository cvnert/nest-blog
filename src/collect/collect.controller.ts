import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginGuard } from 'src/guard/login.guard';
import { CollectService } from './collect.service';
import { CreateCollectDto } from './dto/create-collect.dto';
import { UpdateCollectDto } from './dto/update-collect.dto';

@Controller('collect')
@ApiTags('收藏')
export class CollectController {
  constructor(private readonly collectService: CollectService) {}

  @Post()
  @UseGuards(LoginGuard)
  @ApiOperation({
    summary: '收藏文章',
  })
  create(@Body() createCollectDto: CreateCollectDto, @Headers() res: any) {
    const token = res.token;
    return this.collectService.create(createCollectDto, token);
  }

  @Delete(':id')
  @ApiOperation({
    summary: '取消收藏',
  })
  @UseGuards(LoginGuard)
  remove(@Param('id') id: string, @Headers() res: any) {
    const token = res.token;
    return this.collectService.remove(+id, token);
  }
}
