import { PartialType } from "@nestjs/swagger";
import { CreateUserDto } from "./create-user.dto";
import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength,
    MinLength,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    @IsEmail()
    @MinLength(5)
    @MaxLength(256)
    email?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    @MinLength(5)
    @MaxLength(256)
    name?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    @MinLength(5)
    @MaxLength(1024)
    about?: string;
}
