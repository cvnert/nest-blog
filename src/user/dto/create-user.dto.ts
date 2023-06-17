import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: '账号',
  })
  username: string;
  @ApiProperty({
    description: '密码',
  })
  password: string;
}
export class QueryInfo {
  @ApiProperty({
    description: '关键词',
    required: false,
  })
  username: string;
  @ApiProperty({
    description: '花名',
    required: false,
  })
  nickname: string;
  @ApiProperty({
    description: '手机号',
    required: false,
  })
  phone: string;
  @ApiProperty({
    description: '邮箱',
    required: false,
  })
  email: string;
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
