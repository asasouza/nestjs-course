import { Expose } from "class-transformer";

export class AuthDTO {
    @Expose()
    id: number;

    @Expose()
    email: string;
}