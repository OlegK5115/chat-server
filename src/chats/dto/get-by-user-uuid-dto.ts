import { IsString } from "class-validator";

export class GetByUserUuidDto {
	@IsString({message : "isn't string"})
	readonly user : string
}