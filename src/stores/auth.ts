import { defineStore } from "pinia";

export type UserRole = "admin" | "user";
export type Plan = "none" | "trial" | "monthly" | "yearly";
export type UserStatus = "active" | "blocked";

export type User = {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  balanceRub: number;
  plan: Plan;
  status: UserStatus;
  avatarUrl?: string;
};

type MockUserRecord = User & { password: string };

export type LoginResult =
  | { ok: true; user: User }
  | {
      ok: false;
      code: "NOT_FOUND" | "WRONG_PASSWORD" | "BLOCKED";
      message: string;
    };

const STORAGE_KEY = "wpn_mock_userId";

const MOCK_USERS: MockUserRecord[] = [
  {
    id: "u1",
    username: "Username123",
    email: "username123@mail.ru",
    password: "123456",
    role: "admin",
    balanceRub: 149,
    plan: "monthly",
    status: "active",
  },
  {
    id: "u2",
    username: "NoSubUser",
    email: "nosub@mail.ru",
    password: "123456",
    role: "user",
    balanceRub: 0,
    plan: "none",
    status: "active",
  },
  {
    id: "u3",
    username: "TrialGuy",
    email: "trial@mail.ru",
    password: "123456",
    role: "user",
    balanceRub: 50,
    plan: "trial",
    status: "active",
  },
  {
    id: "u4",
    username: "BannedUser",
    email: "banned@mail.ru",
    password: "123456",
    role: "user",
    balanceRub: 0,
    plan: "none",
    status: "blocked",
  },
  {
    id: "u5",
    username: "YearlyPro",
    email: "yearly@mail.ru",
    password: "123456",
    role: "user",
    balanceRub: 999,
    plan: "yearly",
    status: "active",
  },
];

function toPublicUser(u: MockUserRecord): User {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...rest } = u;
  return rest;
}

function norm(s: string) {
  return s.trim().toLowerCase();
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    users: MOCK_USERS as MockUserRecord[],
    currentUserId: (localStorage.getItem(STORAGE_KEY) || null) as string | null,
    rememberMe: true,
  }),

  getters: {
    currentUser(state): User | null {
      const u = state.users.find((x) => x.id === state.currentUserId);
      return u ? toPublicUser(u) : null;
    },

    isAuthed(): boolean {
      return !!this.currentUserId;
    },

    isBlocked(): boolean {
      return this.currentUser?.status === "blocked";
    },

    roleLabel(): string {
      return this.currentUser?.role === "admin" ? "Admin" : "User";
    },

    hasSubscription(): boolean {
      const p = this.currentUser?.plan ?? "none";
      return p !== "none";
    },

    planLabel(): string {
      const p = this.currentUser?.plan ?? "none";
      if (p === "trial") return "Пробная";
      if (p === "monthly") return "Месячная";
      if (p === "yearly") return "Годовая";
      return "Нет подписки";
    },
  },

  actions: {
    setRememberMe(v: boolean) {
      this.rememberMe = v;

      if (!v) localStorage.removeItem(STORAGE_KEY);
      else if (this.currentUserId) localStorage.setItem(STORAGE_KEY, this.currentUserId);
    },

    /**
     * identifier = username или email
     */
    login(identifier: string, password: string): LoginResult {
      const key = norm(identifier);
      const pass = password ?? "";

      const user =
        this.users.find((u) => norm(u.username) === key) ||
        this.users.find((u) => norm(u.email) === key);

      if (!user) {
        return { ok: false, code: "NOT_FOUND", message: "Пользователь не найден" };
      }

      if (user.password !== pass) {
        return { ok: false, code: "WRONG_PASSWORD", message: "Неверный пароль" };
      }

      // блок: сохраняем userId, чтобы /blocked мог показать данные
      this.currentUserId = user.id;
      if (this.rememberMe) localStorage.setItem(STORAGE_KEY, user.id);

      if (user.status === "blocked") {
        return { ok: false, code: "BLOCKED", message: "Аккаунт заблокирован" };
      }

      return { ok: true, user: toPublicUser(user) };
    },

    logout() {
      this.currentUserId = null;
      localStorage.removeItem(STORAGE_KEY);
    },

    // dev helper (можно удалить)
    devLoginAs(userId: string) {
      const u = this.users.find((x) => x.id === userId);
      if (!u) return false;
      this.currentUserId = u.id;
      if (this.rememberMe) localStorage.setItem(STORAGE_KEY, u.id);
      return true;
    },
  },
});
