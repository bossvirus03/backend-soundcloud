import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
// eslint-disable-next-line prettier/prettier
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);