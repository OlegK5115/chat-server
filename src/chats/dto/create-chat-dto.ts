import { IsArray, IsString } from "class-validator"

export class CreateChatDto {
	@IsString({message : "isn't string"})
	readonly name : string

	@IsArray({message : "isn't array"})
	readonly users : string[]
}