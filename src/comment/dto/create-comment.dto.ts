import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    description: '评论内容',
  })
  content: string;
  @ApiProperty({
    description: '文章id',
  })
  articleId: number;
  @ApiProperty({
    description: '评论父id',
    required: false,
    default: 0,
  })
  partentId?: number;
}
