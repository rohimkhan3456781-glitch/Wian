// 数据库连接模块
// 需要先配置 DATABASE_URL 环境变量，然后运行 npx prisma generate 生成客户端
//
// 使用方法：
// import { db } from "@/lib/db"
// const users = await db.user.findMany()

// 暂时导出空对象，等数据库配置好后取消下面的注释
// import { PrismaClient } from "@/generated/prisma"
//
// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClient | undefined
// }
//
// export const db =
//   globalForPrisma.prisma ??
//   new PrismaClient({
//     log: process.env.NODE_ENV === "development" ? ["query"] : [],
//   })
//
// if (process.env.NODE_ENV !== "production") {
//   globalForPrisma.prisma = db
// }

export {}
