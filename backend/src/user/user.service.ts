import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/userCreate.dto';
import { PrismaService } from '@/prisma/prisma.service';
import * as argon2  from "argon2";
import { ROLE } from '@prisma/client';
import { ChatService } from '@/chat/chat.service';


@Injectable()
export class UserService {

    constructor(

        private readonly prisma: PrismaService,
        private readonly chatService: ChatService
    ){}

    async create(userData: CreateUserDto ){

        try{

            const user = this.prisma.user.create({
                data: {
                    email: userData.email,
                    role: "MANAGER",
                    hashPassword:  await this.hashingPassword(userData.password),
                    name: userData.name
                },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    role: true,
                    createdAt: true,
                 }
            })

           return user
        }
        catch(e: any){

           if (e.code === 'P2002') {
             throw new ConflictException('User with this email already exists');
           }
           throw new InternalServerErrorException("Can't create user");
        }
    }

    async createAdmin(email: string, password: string){
         const hashPassword = await this.hashingPassword(password)
        
         try{

             const user = await this.prisma.user.upsert({
                 where: {email},
                 update: {hashPassword, role : ROLE.ADMIN},
                 create: {
                     email,
                     hashPassword,
                     name: "Admin",
                     role: ROLE.ADMIN
                    }
                    
                })

                await this.chatService.create(user.id)
            }
            catch(e){
                console.log("admin create error:", e)
                throw new InternalServerErrorException("faied to create admin")
            }
    }

    async deleteByEmail(email:string ){

        try{

            this.prisma.user.delete({
                where: {email: email}
            })

            return true
        }
        catch(e){
            throw new InternalServerErrorException("failed user delate")
        }
    }

    async deleteById(userId: number){

        try{
            await this.prisma.user.delete({
                where: {id :userId}
            })
            return true
        }
        catch(e){
            throw new InternalServerErrorException("failed user delate")
        }
    }
    async findByEmail(email: string){

        try{
           return await  this.prisma.user.findUnique({
                where: {email}
            }) 
        }
        catch(e: any){
            throw new InternalServerErrorException("user not found")
        }
        
    }
     async findById(userid: number){

        try{

           return await  this.prisma.user.findUnique({
                where: {id: userid}
            }) 
        }
        catch(e: any){
            throw new InternalServerErrorException("user not found")
        }
        
    }

    async getPageManagers(page: number, limit: number){
        try{
            const skip = (page -1) * limit
            const managers = await this.prisma.user.findMany({
                where: {role: 'MANAGER'},
                skip,
                take: limit +1,
                orderBy: {createdAt: "desc"},
                select: {
                    id: true,
                    email: true,
                    name: true,
                    role: true
                }
            })

            return {
                hasMore: managers.length > limit,
                managers: managers.slice(0, limit)
            }
        }
        catch(e){
            throw new InternalServerErrorException("failed to find managers")
        }
    }

    async getAllManagers() {

        try{
            return await this.prisma.user.findMany({
                where: {role: "MANAGER"},
                select: {
                      id: true,
                    email: true,
                    name: true,
                    role: true
                }
            })
        }
        catch(e){
            throw new InternalServerErrorException("failed get all managers")
        }
    }

    async getUserById(userId: number){
        try{

            return await this.prisma.user.findUnique({
                where: {id: userId},
                select: {
                    id: true,
                    email: true,
                    name: true,
                    role: true,
                    orders: {
                        select: {
                            id: true,
                            status: true,
                            clientName: true,
                            createAt: true,
                            items: {
                                select: {
                                    name: true,
                                    count: true,
                                    price: true
                                }
                            }
                            }
                        }
                    }
                })
            }
        
        catch(e){

            throw new InternalServerErrorException("user not found")
        }
    }
    async hashingPassword(password: string){
        return argon2.hash(password)
    }

    async verifyPassword(password: string, hash: string){
        return argon2.verify(hash, password)
    }
}
