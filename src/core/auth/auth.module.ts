import * as passport from 'passport';
import {
    Module,
    NestModule,
    MiddlewaresConsumer,
    RequestMethod,
} from '@nestjs/common';

import { AuthService } from './services/auth.service';
import { JwtStrategy } from './passport/jwt.strategy';
import {UserSchema} from "../user/schemas/users";
import {MongooseModule} from "@nestjs/mongoose";
import {CryptoService} from "./services/crypto.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
    components: [AuthService, JwtStrategy, CryptoService],
    exports: [ MongooseModule, AuthService ]
})
export class AuthModule implements NestModule {
    public configure(consumer: MiddlewaresConsumer) {
        consumer
            .apply(passport.authenticate('jwt', { session: false }))
            .forRoutes(
                { path: '/api/v1/campaigns*', method: RequestMethod.ALL },
                { path: '/api/v1/users', method: RequestMethod.GET },
                { path: '/api/v1/users/*', method: RequestMethod.ALL },
            );
    }
}