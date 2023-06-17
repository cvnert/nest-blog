import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, QueryInfo } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/roles.decorator';
import { Role } from 'src/utils/role.enum';
import { RolesGuard } from 'src/roles.guard';
import { LoginGuard } from 'src/guard/login.guard';
@ApiTags('登录注册')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * 登录
   * @param user
   * @returns
   */
  @Post('login')
  @ApiOperation({
    summary: '登录',
  })
  login(@Body() user: CreateUserDto) {
    return this.userService.login(user);
  }

  /**
   * 注册
   * @param user
   * @returns
   */
  @Post('register')
  @ApiOperation({
    summary: '注册',
  })
  register(@Body() user: CreateUserDto) {
    console.log(user);
    return this.userService.register(user);
  }
  /**
   * 分页查询用户信息
   * @param query
   * @returns
   */
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @Get()
  @ApiOperation({
    summary: '分页查询用户信息,支持username,nickname,phone,email的模糊查询',
  })
  getUserInfo(@Query() query: QueryInfo) {
    return this.userService.getUserInfo(query);
  }
  /**
   * 修改用户信息 仅在用户登录成功使用
   */
  @ApiOperation({
    summary: '修改用户信息,仅在用户登录成功使用',
  })
  @Patch(':uid')
  @UseGuards(LoginGuard)
  update(@Param('uid') uid: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(uid, updateUserDto);
  }

  @ApiOperation({
    summary: '删除用户信息,仅在用户登录成功使用',
  })
  @Delete(':uid')
  @UseGuards(RolesGuard)
  remove(@Param('uid') uid: string) {
    return this.userService.deleteUser(uid);
  }

  @ApiOperation({
    summary: '查询单个用户信息,仅在用户登录成功使用',
  })
  @Get(':uid')
  @UseGuards(LoginGuard)
  findOne(@Param('uid') uid: string) {
    return this.userService.findOne(uid);
  }
}
