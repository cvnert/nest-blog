import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Headers,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiProduces, ApiTags } from '@nestjs/swagger';
import { LoginGuard } from 'src/guard/login.guard';
import { ArticleService } from './article.service';
import { CreateArticleDto, QueryInfo } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('article')
@ApiTags('文章')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
  @Post()
  @ApiOperation({
    summary: '创建文章',
  })
  @UseGuards(LoginGuard)
  create(@Body() createArticleDto: CreateArticleDto, @Headers() res: any) {
    console.log(res);
    const token = res.token;
    return this.articleService.create(createArticleDto, token);
  }

  @Get()
  @ApiOperation({
    summary: '查询所有的文章',
  })
  findAll(@Query() query: QueryInfo) {
    return this.articleService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({
    summary: '查询单个文章',
  })
  findOne(@Param('id') id: string) {
    return this.articleService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: '修改文章',
  })
  @UseGuards(LoginGuard)
  update(
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto,
    @Headers() res: any,
  ) {
    const token = res.token;
    return this.articleService.update(+id, updateArticleDto, token);
  }

  @Delete(':id')
  @ApiOperation({
    summary: '删除文章',
  })
  @UseGuards(LoginGuard)
  remove(@Param('id') id: string, @Headers() res: any) {
    const token = res.token;
    return this.articleService.remove(+id, token);
  }
}
