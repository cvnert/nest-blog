import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFollowDto } from './dto/create-follow.dto';
import { UpdateFollowDto } from './dto/update-follow.dto';

@Injectable()
export class FollowService {
  constructor(private readonly prisma: PrismaService) {}
  // 用户之间互相关注 传入关注者id和被关注者id
  async create(createFollowDto: CreateFollowDto) {
    try {
      /**
       * 通过传过来的uid和被关注者的uid找到对应的id
       */
      /**
       * 关注者
       */
      const followerInfo = await this.prisma.user.findUnique({
        where: {
          uid: createFollowDto.followerId,
        },
      });
      //判断是否存在关注者
      if (!followerInfo) {
        return {
          code: 400,
          msg: '关注者不存在',
        };
      }
      /**
       * 被关注者
       */
      const followedInfo = await this.prisma.user.findUnique({
        where: {
          uid: createFollowDto.followedId,
        },
      });
      //判断是否存在关注者
      if (!followerInfo) {
        return {
          code: 400,
          msg: '关注者不存在',
        };
      }
      //判断是否已经关注
      const isFollowed = await this.prisma.follow.findFirst({
        where: {
          followerId: followerInfo.id,
          followingId: followedInfo.id,
        },
      });
      if (isFollowed) {
        return {
          code: 400,
          msg: '已经关注过了',
        };
      }

      /**
       * followerId 关注者Id
       * followedId 被关注者Id
       */
      const followerId = followerInfo.id;
      const followedId = followedInfo.id;
      // this.prisma.
      const res = await this.prisma.follow.create({
        data: {
          followerId: followerId,
          followingId: followedId,
        },
      });
      return {
        code: 200,
        msg: '关注成功',
      };
    } catch (error) {
      return {
        code: 400,
        msg: '关注失败',
      };
    }
  }
  // 取消关注
  async remove(createFollowDto: CreateFollowDto) {
    try {
      //通过关注者uid找到对应的id
      const followerInfo = await this.prisma.user.findUnique({
        where: {
          uid: createFollowDto.followerId,
        },
      });
      //判断是否存在关注者
      if (!followerInfo) {
        return {
          code: 400,
          msg: '关注者不存在',
        };
      }
      //通过被关注者uid找到对应的id
      const followedInfo = await this.prisma.user.findUnique({
        where: {
          uid: createFollowDto.followedId,
        },
      });
      //判断是否存在关注者
      if (!followerInfo) {
        return {
          code: 400,
          msg: '关注者不存在',
        };
      }
      //判断是否已经关注
      const isFollowed = await this.prisma.follow.findFirst({
        where: {
          followerId: followerInfo.id,
          followingId: followedInfo.id,
        },
      });
      if (!isFollowed) {
        return {
          code: 400,
          msg: '还没有关注',
        };
      }
      //取消关注
      const res = await this.prisma.follow.delete({
        where: {
          id: isFollowed.id,
        },
      });

      return {
        code: 200,
        msg: '取消关注成功',
      };
    } catch (error) {
      return {
        code: 400,
        msg: '取消关注失败',
      };
    }
  }
  // 获取关注列表
  async getFollowList(uid: string) {
    try {
      //通过uid找到对应的id
      const userInfo = await this.prisma.user.findUnique({
        where: {
          uid: uid,
        },
      });
      console.log(userInfo);
      //判断是否存在关注者
      if (!userInfo) {
        return {
          code: 400,
          msg: '用户不存在',
        };
      }
      //通过id找到关注列表
      const followList = await this.prisma.follow.findMany({
        where: {
          followerId: userInfo.id,
        },
        include: {
          followed: true,
        },
      });
      //删除不需要的字段
      followList.map((item: any) => {
        delete item.id;
        delete item.followerId;
        delete item.followingId;
        return item;
      });
      for (let i = 0; i < followList.length; i++) {
        delete followList[i].followed.id;
        delete followList[i].followed.uid;
        delete followList[i].followed.password;
        delete followList[i].followed.createdAt;
        delete followList[i].followed.roleId;
        delete followList[i].followed.phone;
        delete followList[i].followed.email;
        delete followList[i].followed.updatedAt;
      }

      console.log(followList);
      return {
        code: 200,
        msg: '获取关注列表成功',
        data: followList,
      };
    } catch (error) {
      return {
        code: 400,
        msg: '获取关注列表失败',
      };
    }
  }
  // 获取粉丝列表
  async getFansList(uid: string) {
    try {
      //通过uid找到对应的id
      const userInfo = await this.prisma.user.findUnique({
        where: {
          uid: uid,
        },
      });
      //判断是否存在关注者
      if (!userInfo) {
        return {
          code: 400,
          msg: '用户不存在',
        };
      }
      //通过id找到粉丝列表
      const fansList = await this.prisma.follow.findMany({
        where: {
          followingId: userInfo.id,
        },
        include: {
          follower: true,
        },
      });
      //删除不需要的字段
      fansList.map((item: any) => {
        delete item.id;
        delete item.followerId;
        delete item.followingId;
        return item;
      });
      for (let i = 0; i < fansList.length; i++) {
        delete fansList[i].follower.id;
        delete fansList[i].follower.uid;
        delete fansList[i].follower.password;
        delete fansList[i].follower.createdAt;
        delete fansList[i].follower.roleId;
        delete fansList[i].follower.phone;
        delete fansList[i].follower.email;
        delete fansList[i].follower.updatedAt;
      }

      return {
        code: 200,
        msg: '获取粉丝列表成功',
        data: fansList,
      };
    } catch (error) {
      return {
        code: 400,
        msg: '获取粉丝列表失败',
      };
    }
  }
}
