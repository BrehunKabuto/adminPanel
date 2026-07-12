import { Body, Controller, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { type Request,type Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { InternalServerError } from 'openai';


@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ){}

    @Post("login")
    async login(
        @Res({passthrough: true}) res: Response,
        @Body() data: LoginDto
    ){
        const {refreshToken, accessToken} = await this.authService.login(data)
          return this.authService.sendTokens(res, refreshToken, accessToken) 
    }

    @Post("refresh")
    async refresh(
        @Res({passthrough: true}) res: Response,
        @Req() req: Request,
    ){
        const token = req.cookies?.["refreshToken"]
        if(!token) throw new UnauthorizedException("No refresh token")
        const {refreshToken, accessToken} = await this.authService.refresh(token)
        
        return await this.authService.sendTokens(res, refreshToken, accessToken)
        
    }
    @UseGuards(AuthGuard("jwt"))
    @Post("logout")
    async logout(
         @Res({passthrough: true}) res: Response,
        @Req() req: Request,
    ){
        const token = req.cookies["refreshToken"]
        if (!token) throw new UnauthorizedException("token not found")
        await this.authService.loguot(token)
        res.clearCookie("refreshToken")
        return {success: true}
    }
    
}
