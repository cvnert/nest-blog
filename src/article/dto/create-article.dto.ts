import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateArticleDto {
  @ApiProperty({
    description: '文章标题',
    required: true,
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: '文章内容',
    required: true,
  })
  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  @ApiProperty({
    description: '文章封面',
    required: true,
  })
  cover: string;

  @IsNotEmpty()
  @ApiProperty({
    description: '文章描述',
    required: true,
  })
  description: string;

  @IsNotEmpty()
  @ApiProperty({
    description: '文章分类Id',
    required: true,
  })
  tag: number;
}
export class QueryInfo {
  @ApiProperty({
    description: '关键词',
    required: false,
  })
  title: string;
  @ApiProperty({
    description: '每页显示的数量',
    required: false,
    default: 10,
  })
  per: number;
  @ApiProperty({
    description: '页码',
    required: false,
    default: 1,
  })
  page: number;
}
