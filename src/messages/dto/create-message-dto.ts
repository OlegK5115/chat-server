import { IsString, Length } from "class-validator"

export class CreateMessageDto {
	@IsString({message : "isn't string"})
	readonly chat_uuid: string

	@IsString({message : "isn't string"})
	readonly author_uuid: string

	@IsString({message : "isn't string"})
	@Length(1, 256, {message : "wrong length"})
	readonly text: string
}