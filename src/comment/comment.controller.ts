import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { LoginGuard } from 'src/guard/login.guard';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comment')
@ApiTags('评论')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
  @ApiOperation({
    summary: '添加评论',
  })
  @Post()
  @UseGuards(LoginGuard)
  create(@Body() createCommentDto: CreateCommentDto, @Headers() res: any) {
    const token = res.token;
    return this.commentService.create(createCommentDto, token);
  }

  @ApiOperation({
    summary: '删除评论',
  })
  @UseGuards(LoginGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Headers() res: any) {
    const token = res.token;
    return this.commentService.remove(+id, token);
  }

  @ApiOperation({
    summary: '回复评论',
  })
  @Post('reply')
  reply(@Body() createCommentDto: CreateCommentDto, @Headers() res: any) {
    const token = res.token;
    return this.commentService.reply(createCommentDto, token);
  }
}
