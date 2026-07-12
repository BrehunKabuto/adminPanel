import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createHash, privateDecrypt } from 'crypto';
import { PrismaService } from '@/prisma/prisma.service';
import { UserService } from '@/user/user.service';

@Injectable()
export class TokenService {

    constructor(
        private jwt: JwtService,
        private prisma: PrismaService,
        private userService: UserService
    ){}

    async generateTokens(id: number, role: string){

        const payload = {sub: id, role}

        const accessToken = await this.jwt.signAsync(payload,{
            secret: process.env.JWT_ACCESS_SECRET,
            expiresIn: "15m"
        })

         const refreshToken = await this.jwt.signAsync(payload,{
            secret: process.env.JWT_REFRESH_SECRET,
            expiresIn: "7d"
        })
        await this.saveRefreshToken(id, refreshToken)
        return {accessToken, refreshToken}
    }

      hashToken(token: string){

        return createHash("sha256").update(token).digest("hex")
    }

    async verifyAccessToken(token: string){

        return await this.jwt.verifyAsync(token, {
            secret: process.env.JWT_ACCESS_SECRET
        })
    }

     async verifyRefreshToken(token: string){

        return await this.jwt.verifyAsync(token, {
            secret: process.env.JWT_REFRESH_SECRET
        })
    }

    async getTokenByRaw(refreshToken: string){
        try{

            return this.prisma.refreshToken.findUnique({
                where: {hashedToken: this.hashToken(refreshToken) }
            })
        }
        catch(e){
            console.error(e)
            throw new InternalServerErrorException("token not found")
        }
        
    }

    async saveRefreshToken(userId: number, refreshToken: string){

        try{

            const hashedToken = this.hashToken(refreshToken)
        await this.prisma.refreshToken.create({
            data: {
                userId,
                hashedToken
            }
        })
        }
        catch(e){
            throw new InternalServerErrorException("token not saved")
        }
        
    }
    
       async rotateRefreshToken(incomingToken: string){

            const record =  await this.getTokenByRaw(incomingToken)
        
                if(!record) throw new UnauthorizedException("Invalid token")
                if(record.revokeAt) throw new UnauthorizedException("Token reuse detected")
                await this.prisma.refreshToken.update({
                    where: {id: record.id},
                    data: {revokeAt: new Date()}
                })
                const user =await this.userService.findById(record.userId)
                if(!user) throw new InternalServerErrorException("user with this token don't found")

                return {userId: record.userId, role: user.role}
    }

    async revokeToken(token: string){
        try{
            await this.prisma.refreshToken.update({
                where: { hashedToken: this.hashToken(token)},
                data: {
                    revokeAt: new Date()
                }
            })
        }
        catch(e){
            throw new InternalServerErrorException("token not found")
        }
    }
}
