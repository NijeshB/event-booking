export class HttpException extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}
export class BadRequestException extends HttpException {
  constructor(message = 'Bad Request') {
    super(400, message);
  }
}

export class NotFoundException extends HttpException {
  constructor(message = 'Not Found') {
    super(404, message);
  }
}
export class UnauthorizedException extends HttpException {
  constructor(message = 'Unauthorized') {
    super(401, message);
  }
}

export class ConflictError extends HttpException {
  constructor(message: string = 'Conflict: Resource already exists') {
    super(409, message);
  }
}

/*
200 OK	Resource was deleted successfully, and a response body is returned.
204 No Content	Resource was deleted successfully, and no response body is needed. (Preferred for REST APIs)
202 Accepted	Deletion request is accepted but not yet processed (used for async deletions).
404 Not Found	Resource does not exist (safe to return if the resource was already deleted).
403 Forbidden	User is not authorized to delete the resource.
500 Internal Server Error	Something went wrong on the server side.
*/
