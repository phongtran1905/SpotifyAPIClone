import { Role } from 'src/modules/roles/entities/role.entity';

export interface AccessTokenPayload {
  id: string;
  role: Role;
  sessionId: string;
}
