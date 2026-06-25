import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      pan: string;
      role: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    }
  }

  interface User {
    id: string;
    pan: string;
    role: string;
    name?: string | null;
    email?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    pan: string;
    role: string;
  }
}
