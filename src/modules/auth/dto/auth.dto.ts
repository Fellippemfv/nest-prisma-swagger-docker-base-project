import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MaxLength,
    MinLength,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AuthDto {
    @ApiProperty()
    id?: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    @MinLength(5)
    @MaxLength(256)
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(56)
    password: string;

    @ApiProperty()
    name?: string;

    @ApiProperty()
    role?: string;

    @ApiProperty()
    hash?: string;

    @ApiProperty()
    hashedRt?: string;

    @ApiProperty()
    created_at?: Date;

    @ApiProperty()
    updated_at?: Date;
}
