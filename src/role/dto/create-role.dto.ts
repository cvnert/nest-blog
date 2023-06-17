import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({
    description: '角色名称',
  })
  name: string;
  @ApiProperty({
    description: '角色描述',
  })
  description: string;
}
