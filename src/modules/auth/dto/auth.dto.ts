import {
    IsDate,
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength,
    MinLength,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AuthDto {
    @ApiProperty()
    @IsOptional()
    @IsString()
    id?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    slugId?: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    @MinLength(5)
    @MaxLength(256)
    email: string;

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

    @ApiProperty()
    @IsOptional()
    @IsString()
    role?: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(56)
    password: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    hash?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    hashedRt?: string;

    @ApiProperty()
    @IsOptional()
    @IsDate()
    created_at?: Date;

    @ApiProperty()
    @IsOptional()
    @IsDate()
    updated_at?: Date;

    @ApiProperty()
    @IsOptional()
    @IsDate()
    deleted?: boolean;
}
