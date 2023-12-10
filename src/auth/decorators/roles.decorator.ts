import { SetMetadata } from '@nestjs/common';
import { EUserRoles } from '../enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: EUserRoles[]) => SetMetadata(ROLES_KEY, roles);
