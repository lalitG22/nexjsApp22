// next.d.ts (Place this file at the root of your project)

import { NextRequest } from 'next/server';

declare module 'next/server' {
  interface NextRequest {
    context?: {
      messagecode: number;
      message: string;
      data: any[];
    };
  }
}
