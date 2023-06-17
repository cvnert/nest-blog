import { ApiProperty } from '@nestjs/swagger';

export class CreateTagDto {
  @ApiProperty({
    description: '标签名',
    required: true,
  })
  name: string;
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
