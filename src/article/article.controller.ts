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
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ArticleService } from './article.service';
import { CreateArticleDto, QueryInfo } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('article')
@ApiTags('文章')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
  @Post()
  create(@Body() createArticleDto: CreateArticleDto, @Headers() res: any) {
    console.log(res);
    const token = res.token;
    return this.articleService.create(createArticleDto, token);
  }

  @Get()
  findAll(@Query() query: QueryInfo) {
    return this.articleService.findAll(query);
  }
}
