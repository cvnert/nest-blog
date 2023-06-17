import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
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
    description: '头像',
    required: false,
  })
  avatar: string;
  @ApiProperty({
    description: '描述',
    required: false,
  })
  description: string;
}
