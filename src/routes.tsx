import WinterStudyRoom from './pages/WinterStudyRoom';
import type { ReactNode } from 'react';

interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
}

const routes: RouteConfig[] = [
  {
    name: '冬日书房',
    path: '/',
    element: <WinterStudyRoom />
  }
];

export default routes;
