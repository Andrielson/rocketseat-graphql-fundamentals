import {Arg, Mutation, Query, Resolver} from "type-graphql";
import {User} from "../models/User";

@Resolver()
export class UserResolver {
    private readonly data: User[] = [];

    @Query(() => [User])
    async users() {
        return this.data;
    }

    @Mutation(() => User)
    async createUser(
        @Arg('name') name: string
    ) {
        const user = new User(name);
        this.data.push(user);
        return user;
    }
}