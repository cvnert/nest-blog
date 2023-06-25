import { ApiProperty } from '@nestjs/swagger';

export class CreateLikeDto {
  @ApiProperty({
    description: '文章id',
  })
  articleId: number;
}
export class QueryInfo {
  @ApiProperty({
    description: '标签名',
    required: false,
  })
  name: string;
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
