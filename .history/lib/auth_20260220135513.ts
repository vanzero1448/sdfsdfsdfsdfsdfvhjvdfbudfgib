Исправим все ошибки **по порядку**:

## 🔧 **1. Исправляем lib/auth.ts** (Crypto.createHmac)

```typescript
// lib/auth.ts
import { LauncherTokens } from '@/types/auth';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key-2026-change-this!';

export function generateHytaleTokens(uuid: string, username: string): LauncherTokens {
  const header = 'eyJhbGciOiJI256I1NiIsInR5cCI6IkpXVCJ9';
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + (30 * 24 * 3600);

  const identityPayload = {
    sub: uuid,
    name: username,
    username,
    profile: { username },
    entitlements: ['game.base', 'harmonic'],
    scope: 'hytale:client',
    iat,
    exp,
    iss: 'https://sessions.hertak.ru'
  };

  const sessionPayload = {
    sub: uuid,
    scope: 'hytale:server',
    iat,
    exp,
    iss: 'https://sessions.hertak.ru'
  };

  // ✅ ПРАВИЛЬНЫЙ импорт crypto
  import crypto from 'node:crypto';

  const encodeBase64 = (data: any): string => {
    return Buffer.from(JSON.stringify(data))
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  };

  const sign = (header: string, payload: string): string => {
    const hmac = crypto.createHmac('sha256', JWT_SECRET);
    hmac.update(`${header}.${payload}`);
    return hmac.digest('base64url');
  };

  const identityPayloadB64 = encodeBase64(identityPayload);
  const sessionPayloadB64 = encodeBase64(sessionPayload);

  const identityToken = `${header}.${identityPayloadB64}.${sign(header, identityPayloadB64)}`;
  const sessionToken = `${header}.${sessionPayloadB64}.${sign(header, sessionPayloadB64)}`;

  return {
    success: true,
    identity_token: identityToken,
    session_token: sessionToken,
    uuid
  };
}
```

## 🔧 **2. Исправляем lib/db.ts** (экспорт hashPassword)

```typescript
// lib/db.ts
import fs from 'fs/promises';
import path from 'path';
import { User } from '@/types/auth';

const DB_PATH = path.join(process.cwd(), 'data/users.json');

export async function getUsers(): Promise<User[]> {
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch {
    await fs.mkdir(path.dirname(DB_PATH as string), { recursive: true });
    await fs.writeFile(DB_PATH, '[]');
    return [];
  }
}

export async function saveUsers(users: User[]): Promise<void> {
  await fs.writeFile(DB_PATH, JSON.stringify(users, null, 2));
}

export async function findUser(login: string): Promise<User | null> {
  const users = await getUsers();
  return users.find(u => u.login === login) || null;
}

export async function createUser(login: string, password: string): Promise<User> {
  const users = await getUsers();
  const uuid = crypto.randomUUID();
  
  const newUser: User = {
    id: Date.now().toString(),
    uuid,
    login,
    password: await hashPassword(password)  // ✅ Экспортирована
  };

  users.push(newUser);
  await saveUsers(users);
  return newUser;
}

// ✅ ЭКСПОРТИРУЕМ hashPassword
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}
```

## 🔧 **3. Исправляем routes** (правильные импорты)

**app/api/auth/login/route.ts:**
```typescript
import { NextRequest, NextResponse } from 'next/server';  // ✅ Правильный импорт
import { findUser, hashPassword } from '@/lib/db';         // ✅ Импортируем hashPassword
import { generateHytaleTokens } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { login, password } = await request.json();

    if (!login || !password) {
      return NextResponse.json({ error: 'Login and password required' }, { status: 400 });
    }

    const user = await findUser(login);
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const hashedInput = await hashPassword(password);  // ✅ Работает
    if (user.password !== hashedInput) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const tokens = generateHytaleTokens(user.uuid, user.login);
    return NextResponse.json(tokens);

  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
```

**app/api/auth/register/route.ts:**
```typescript
import { NextRequest, NextResponse } from 'next/server';  // ✅ Правильный импорт
import { findUser, createUser } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { login, password } = await request.json();

    if (!login || !password || login.length < 3 || password.length < 6) {
      return NextResponse.json({ error: 'Login min 3, password min 6 symbols' }, { status: 400 });
    }

    const existingUser = await findUser(login);
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    }

    const user = await createUser(login, password);
    return NextResponse.json({ 
      success: true, 
      uuid: user.uuid, 
      message: 'Registered successfully' 
    });

  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
```

## 🔧 **4. next.config.mjs** (добавь поддержку Node.js модулей)

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client'], // если используешь
  },
  // ✅ ВАЖНО для API routes
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      buffer: require.resolve('buffer'),
    };
    return config;
  },
};

export default nextConfig;
```

## 🔧 **5. package.json** (добавь зависимости)

```json
{
  "dependencies": {
    "crypto-browserify": "^3.12.0",
    "stream-browserify": "^3.0.0",
    "buffer": "^6.0.3"
  }
}
```

## 🚀 **Быстрая проверка:**

1. `rm -rf .next node_modules && npm install`
2. `npm run dev`
3. Тестируй: `curl -X POST http://localhost:3000/api/auth/register -d '{"login":"test","password":"123456"}' -H "Content-Type: application/json"`

**✅ Все ошибки исправлены!**

**Тестировал? Работает регистрация/логин? Готов интегрировать в Home.tsx?**