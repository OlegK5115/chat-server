import { HttpException, HttpStatus } from "@nestjs/common";

export class ServiceException extends HttpException {
	messages : string

	constructor(responce) {
		super(responce, HttpStatus.BAD_REQUEST)
		this.messages = responce
	}
}