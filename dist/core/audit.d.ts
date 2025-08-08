/**
 *  audit  - Auditoría de seguridad básica
 *
 *  Responsable de:
 *  - Ejecutar `npm audit fix` o `pnpm audit fix` según el gestor de paquetes
 *  - Mostrar advertencias y errores
 *
 *  Nota: En el futuro se puede integrar Socket.dev, Snyk u otras herramientas
 *  para auditorías más avanzadas con autenticación y escaneo profundo.
 */
import { UserAnswers } from '../types';
export declare function runAudit(config: UserAnswers): Promise<void>;
//# sourceMappingURL=audit.d.ts.map