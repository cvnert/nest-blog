import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RolesGuard } from 'src/roles.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/roles.decorator';
import { Role } from 'src/utils/role.enum';
@ApiTags('角色管理')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}
  //创建角色
  @Post('create')
  @ApiOperation({
    summary: '创建角色,已创建vip,普通用户,以及管理员',
  })
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get('findAll')
  @Roles(Role.Admin)
  @ApiOperation({
    summary: '查询所有角色',
  })
  @UseGuards(RolesGuard)
  findAll() {
    return this.roleService.findAll();
  }

  @Patch(':uid')
  @Roles(Role.Admin)
  @ApiOperation({
    summary: '修改用户角色权限',
  })
  @UseGuards(RolesGuard)
  update(@Param('uid') uid: string, @Body() roleId: UpdateRoleDto) {
    return this.roleService.updateRole(uid, roleId.roleId);
  }
}
