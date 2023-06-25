import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
} from '@nestjs/common';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comment')
@ApiTags('评论')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
  @ApiProperty({
    description: '添加评论',
  })
  @Post()
  create(@Body() createCommentDto: CreateCommentDto, @Headers() res: any) {
    const token = res.token;
    return this.commentService.create(createCommentDto, token);
  }

  @ApiProperty({
    description: '删除评论',
  })
  @Delete(':id')
  remove(@Param('id') id: string, @Headers() res: any) {
    const token = res.token;
    return this.commentService.remove(+id, token);
  }

  @ApiProperty({
    description: '回复评论',
  })
  @Post('reply')
  reply(@Body() createCommentDto: CreateCommentDto, @Headers() res: any) {
    const token = res.token;
    return this.commentService.reply(createCommentDto, token);
  }
}
