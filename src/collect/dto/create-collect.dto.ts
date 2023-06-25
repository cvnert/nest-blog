import { ApiProperty } from '@nestjs/swagger';

export class CreateCollectDto {
  @ApiProperty({
    description: '文章id',
  })
  articleId: number;
}
