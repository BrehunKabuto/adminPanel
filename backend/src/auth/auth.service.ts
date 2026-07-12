import { HttpException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserService } from '@/user/user.service';
import type { Request, Response } from "express";
import { TokenService } from '@/token/token.service';

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private tokenService: TokenService
    ){}

    async login(userData: LoginDto){

        try{
            const user = await this.userService.findByEmail(userData.email)
            if (!user) throw new UnauthorizedException("user dont found")
            if(await this.userService.verifyPassword(userData.password, user.hashPassword))
            {
                const {hashPassword,...result} = user
                return this.tokenService.generateTokens(user.id, user.role)
            }
            else{
                throw new UnauthorizedException("Invalid password") 
            }
        }
        catch(e){
            if (e instanceof HttpException) throw e;
                throw new InternalServerErrorException('Login failed');
        }
    }
     async refresh(incomingToken: string){  

        const {userId, role} = await this.tokenService.rotateRefreshToken(incomingToken)
        const {refreshToken, accessToken} =await this.tokenService.generateTokens(userId, role)
        return{
            refreshToken,
            accessToken
        }

    }

    async sendTokens(
        res: Response,
         refreshToken: string,
          accessToken: string)
        {
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 30 * 24 * 60 * 60 *1000
        })
        
        return {
             accessToken
        }
    }

    async loguot(token: string){

        await this.tokenService.revokeToken(token)
    }
}
