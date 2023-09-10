// here be the middleware.

// Middleware Route Protection
// The final and most preferable approach to protecting routes is by using middleware. This is the best way because it enables you to protect an entire subdirectory or all pages of your application, rather than adding route protection logic to each individual page.

export { default } from "next-auth/middleware";

// If you need to protect single or multiple pages, or API routes, you can export a config object with a matcher key. The matcher is an array that can contain the routes you want to protect.
export const config = {
  // Protect the /profile page from users who are not logged in.
  matcher: ["/profile"],
  // This would protect any route other than those for the register, login, and api directories:
  //   matcher: ["/((?!register|api|login).*)"],
};
