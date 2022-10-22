import {Field, ID, ObjectType} from "type-graphql";
import {randomUUID} from "crypto";

@ObjectType()
export class User {
    @Field(_type => ID)
    id!: string;
    @Field()
    name!: string;

    constructor(name: string) {
        this.id = randomUUID();
        this.name = name;
    }
}