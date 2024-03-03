//Apply next-auth to whole project
export { default } from "next-auth/middleware";

export const config = { matcher: ["/", "/create-movie"] };