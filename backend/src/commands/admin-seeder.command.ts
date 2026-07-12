import { AiService } from "@/ai/ai.service";
import { ChatService } from "@/chat/chat.service";
import { PrismaService } from "@/prisma/prisma.service";
import { UserService } from "@/user/user.service";
import { Inject, Injectable } from "@nestjs/common";
import {CommandRunner,Command, Option} from "nest-commander"


interface AdminSeederOptions {
    email: string,
    password: string
}


@Command({name: "seed-admin", description:"create an admin"})
export class AdminSeederCommand extends CommandRunner {

    constructor(
        @Inject(PrismaService) private readonly PrismaService: PrismaService,
        @Inject(AiService) private readonly aiService: AiService,
        private chatService,
        private userService
        
    ){

        super()
        this.chatService = new ChatService(this.PrismaService, aiService)
        this.userService = new UserService(this.PrismaService, this.chatService)
    }

    async run(
        passedParams: string[],
         options: AdminSeederOptions
    ): Promise<void>
        
    {
        await this.userService.createAdmin(options.email, options.password)
        console.log(`user with email: ${options.email} created`)
        process.exit(0)
    }

     @Option({ flags: '-m, --email <email>', description: 'Admin email' })
         parseEmail(val: string) { return val; }

        @Option({ flags: '-p, --password <password>', description: 'Admin password' })
        parsePassword(val: string): string { return val; }
}

 
