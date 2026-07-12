import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/userCreate.dto';
import { UserService } from './user.service';
import { RolesGuard } from '@/common/guards/roles.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { ROLE } from 'generated/prisma/enums';
import { CurrentUser } from '@/common/decorators/CurrentUser.decorator';
import { type User } from '@/common/types/user.type';
import { getPagesDto } from '@/common/dto/getPages.dto';

@Controller('user')
@UseGuards(JwtAuthGuard,RolesGuard)
export class UserController {

    constructor(
        private readonly userService: UserService
    ){}

    @Post("create")
    @Roles(ROLE.ADMIN)
    async create(@Body() userData: CreateUserDto){
        return this.userService.create(userData)
    }

    @Delete(":id")
    @Roles(ROLE.ADMIN)
    async delete(@Param("id") id: string){
        return this.userService.deleteById(+id)
    }

    @Get("page")
    @Roles(ROLE.ADMIN)
    async getPageManagers(@Query() data: getPagesDto){
        return this.userService.getPageManagers(data.page, data.limit)
    }

    @Get("all")
    @Roles(ROLE.ADMIN)
    async getAllManagers(){
        return this.userService.getAllManagers()
    }

  @Get("myRole")
    async getMyRole(@CurrentUser() user: User){
        return {role: user.role}
    }

    @Get(":id")
    @Roles(ROLE.ADMIN)
    async getUserById(@Param("id") id: string){
        return this.userService.getUserById(+id)
    }

  
}
