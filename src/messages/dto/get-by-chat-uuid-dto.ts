import { IsString } from "class-validator";

export class GetByChatUuidDto {
	@IsString({message : "isn't string"})
	readonly chat: string
}