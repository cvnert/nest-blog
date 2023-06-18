import { ApiProperty } from '@nestjs/swagger';

export class CreateFollowDto {
  [x: string]: any;
  @ApiProperty({
    description: '关注者uid',
  })
  followerId: string;
  @ApiProperty({
    description: '被关注者uid',
  })
  followedId: string;
}
