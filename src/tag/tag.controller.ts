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
import { TagService } from './tag.service';
import { CreateTagDto, QueryInfo } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginGuard } from 'src/guard/login.guard';
@ApiTags('标签')
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}
  @Get()
  @ApiOperation({
    summary: '查询所有的标签',
  })
  findAll(@Query() query: QueryInfo) {
    return this.tagService.getTagInfo(query);
  }

  @Post()
  @ApiOperation({
    summary: '创建标签',
  })
  @UseGuards(LoginGuard)
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagService.createTag(createTagDto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: '修改标签',
  })
  @UseGuards(LoginGuard)
  update(@Param('id') id: number, @Body() updateTagDto: UpdateTagDto) {
    return this.tagService.updateTag(+id, updateTagDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: '删除标签',
  })
  @UseGuards(LoginGuard)
  remove(@Param('id') id: number) {
    return this.tagService.deleteTag(+id);
  }
}
