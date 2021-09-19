//auth/authPubilc.decorator.ts
import { SetMetadata } from "@nestjs/common";

export const IS_PUBLIC = 'isPublic';
export const AuthPublic = () => SetMetadata(IS_PUBLIC, true)