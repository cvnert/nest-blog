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
  Res,
  Req,
  Headers,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto, QueryInfo } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginGuard } from 'src/guard/login.guard';
import { Roles } from 'src/roles.decorator';
import { Role } from 'src/utils/role.enum';
import { RolesGuard } from 'src/roles.guard';
@ApiTags('标签')
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}
  @Get()
  @ApiOperation({
    summary: '查询所有的标签',
  })
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  findAll(@Query() query: QueryInfo) {
    return this.tagService.getTagInfo(query);
  }

  @Post()
  @ApiOperation({
    summary: '创建标签',
  })
  @UseGuards(LoginGuard)
  create(@Body() createTagDto: CreateTagDto, @Headers() res: any) {
    const token = res.token;
    return this.tagService.createTag(createTagDto, token);
  }

  @Patch(':id')
  @ApiOperation({
    summary: '修改标签',
  })
  @UseGuards(LoginGuard)
  update(
    @Param('id') id: number,
    @Body() updateTagDto: UpdateTagDto,
    @Headers() res: any,
  ) {
    const token = res.token;
    return this.tagService.updateTag(+id, updateTagDto, token);
  }

  @Delete(':id')
  @ApiOperation({
    summary: '删除标签',
  })
  @UseGuards(LoginGuard)
  remove(@Param('id') id: number, @Headers() res: any) {
    const token = res.token;
    return this.tagService.deleteTag(+id, token);
  }

  @Get('one')
  @ApiOperation({
    summary: '查询用户所创建的标签',
  })
  @UseGuards(LoginGuard)
  findOne(@Headers() res: any) {
    const token = res.token;
    return this.tagService.getTagByUserId(token);
  }

  @Delete('admin/:id')
  @ApiOperation({
    summary: '管理员删除标签',
  })
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  adminRemove(@Param('id') id: number) {
    return this.tagService.adminDeleteTag(+id);
  }
}
