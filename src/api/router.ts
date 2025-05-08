import { Hono } from 'hono';
import { UserHandler } from "@/api/user.handler.ts";

export class Router {
  private router;

  constructor(private userHandler: UserHandler) {
    this.router = new Hono();
  }

  registerRoutes() {
    this.router.get('/', (c) => c.text('hello deno'));
  }
}
