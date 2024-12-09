import { IsString, Length } from "class-validator";

export class CreateUserDto {
	@IsString({message : "isn't string"})
	@Length(2, 26, {message : "wrong size"})
	readonly username : string
}