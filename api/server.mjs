var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/app.ts
import express3 from "express";

// src/modules/post/post.router.ts
import express from "express";

// generated/prisma/enums.ts
var CommentStatus = {
  APPROVED: "APPROVED",
  REJECTED: "REJECTED"
};
var PostStatus = {
  DRAFT: "DRAFT",
  PUBLISHED: "PUBLISHED",
  ARCHIVED: "ARCHIVED"
};

// src/lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

// generated/prisma/client.ts
import * as path from "path";
import { fileURLToPath } from "url";

// generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.2.0",
  "engineVersion": "0c8ef2ce45c83248ab3df073180d5eda9e8be7a3",
  "activeProvider": "postgresql",
  "inlineSchema": 'model User {\n  id            String    @id\n  name          String\n  email         String\n  emailVerified Boolean   @default(false)\n  image         String?\n  createdAt     DateTime  @default(now())\n  updatedAt     DateTime  @updatedAt\n  sessions      Session[]\n  accounts      Account[]\n\n  role   String? @default("USER")\n  phone  String?\n  status String? @default("ACTIVE")\n\n  @@unique([email])\n  @@map("user")\n}\n\nmodel Session {\n  id        String   @id\n  expiresAt DateTime\n  token     String\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  ipAddress String?\n  userAgent String?\n  userId    String\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@unique([token])\n  @@index([userId])\n  @@map("session")\n}\n\nmodel Account {\n  id                    String    @id\n  accountId             String\n  providerId            String\n  userId                String\n  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)\n  accessToken           String?\n  refreshToken          String?\n  idToken               String?\n  accessTokenExpiresAt  DateTime?\n  refreshTokenExpiresAt DateTime?\n  scope                 String?\n  password              String?\n  createdAt             DateTime  @default(now())\n  updatedAt             DateTime  @updatedAt\n\n  @@index([userId])\n  @@map("account")\n}\n\nmodel Verification {\n  id         String   @id\n  identifier String\n  value      String\n  expiresAt  DateTime\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  @@index([identifier])\n  @@map("verification")\n}\n\n// comment model\n\nmodel Comment {\n  id        String        @id @default(uuid())\n  content   String        @db.Text\n  authorId  String\n  postId    String\n  post      Post          @relation(fields: [postId], references: [id], onDelete: Cascade)\n  parentId  String?\n  parent    Comment?      @relation("CommentReplies", fields: [parentId], references: [id], onDelete: Cascade)\n  replies   Comment[]     @relation("CommentReplies")\n  status    CommentStatus @default(APPROVED)\n  createdAt DateTime      @default(now())\n  updatedAt DateTime      @updatedAt\n\n  @@index([postId])\n  @@index([authorId])\n  @@map("comments")\n}\n\nenum CommentStatus {\n  APPROVED\n  REJECTED\n}\n\n// Post model\n\nmodel Post {\n  id         String     @id @default(uuid())\n  title      String     @db.VarChar(255)\n  content    String     @db.Text\n  thumbnail  String?\n  ifFeatured Boolean    @default(false)\n  status     PostStatus @default(DRAFT)\n  tags       String[]\n  views      Int        @default(0)\n  authorId   String\n  createdAt  DateTime   @default(now())\n  updatedAt  DateTime   @updatedAt\n  comments   Comment[]\n\n  @@index([authorId])\n  @@map("posts")\n}\n\nenum PostStatus {\n  DRAFT\n  PUBLISHED\n  ARCHIVED\n}\n\n// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?\n// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"image","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"},{"name":"role","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"status","kind":"scalar","type":"String"}],"dbName":"user"},"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"token","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"ipAddress","kind":"scalar","type":"String"},{"name":"userAgent","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"}],"dbName":"session"},"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"accountId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"},{"name":"accessToken","kind":"scalar","type":"String"},{"name":"refreshToken","kind":"scalar","type":"String"},{"name":"idToken","kind":"scalar","type":"String"},{"name":"accessTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"refreshTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"scope","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"account"},"Verification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"identifier","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"verification"},"Comment":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"content","kind":"scalar","type":"String"},{"name":"authorId","kind":"scalar","type":"String"},{"name":"postId","kind":"scalar","type":"String"},{"name":"post","kind":"object","type":"Post","relationName":"CommentToPost"},{"name":"parentId","kind":"scalar","type":"String"},{"name":"parent","kind":"object","type":"Comment","relationName":"CommentReplies"},{"name":"replies","kind":"object","type":"Comment","relationName":"CommentReplies"},{"name":"status","kind":"enum","type":"CommentStatus"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"comments"},"Post":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"content","kind":"scalar","type":"String"},{"name":"thumbnail","kind":"scalar","type":"String"},{"name":"ifFeatured","kind":"scalar","type":"Boolean"},{"name":"status","kind":"enum","type":"PostStatus"},{"name":"tags","kind":"scalar","type":"String"},{"name":"views","kind":"scalar","type":"Int"},{"name":"authorId","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"comments","kind":"object","type":"Comment","relationName":"CommentToPost"}],"dbName":"posts"}},"enums":{},"types":{}}');
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer: Buffer2 } = await import("buffer");
  const wasmArray = Buffer2.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  }
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// generated/prisma/internal/prismaNamespace.ts
var prismaNamespace_exports = {};
__export(prismaNamespace_exports, {
  AccountScalarFieldEnum: () => AccountScalarFieldEnum,
  AnyNull: () => AnyNull2,
  CommentScalarFieldEnum: () => CommentScalarFieldEnum,
  DbNull: () => DbNull2,
  Decimal: () => Decimal2,
  JsonNull: () => JsonNull2,
  ModelName: () => ModelName,
  NullTypes: () => NullTypes2,
  NullsOrder: () => NullsOrder,
  PostScalarFieldEnum: () => PostScalarFieldEnum,
  PrismaClientInitializationError: () => PrismaClientInitializationError2,
  PrismaClientKnownRequestError: () => PrismaClientKnownRequestError2,
  PrismaClientRustPanicError: () => PrismaClientRustPanicError2,
  PrismaClientUnknownRequestError: () => PrismaClientUnknownRequestError2,
  PrismaClientValidationError: () => PrismaClientValidationError2,
  QueryMode: () => QueryMode,
  SessionScalarFieldEnum: () => SessionScalarFieldEnum,
  SortOrder: () => SortOrder,
  Sql: () => Sql2,
  TransactionIsolationLevel: () => TransactionIsolationLevel,
  UserScalarFieldEnum: () => UserScalarFieldEnum,
  VerificationScalarFieldEnum: () => VerificationScalarFieldEnum,
  defineExtension: () => defineExtension,
  empty: () => empty2,
  getExtensionContext: () => getExtensionContext,
  join: () => join2,
  prismaVersion: () => prismaVersion,
  raw: () => raw2,
  sql: () => sql
});
import * as runtime2 from "@prisma/client/runtime/client";
var PrismaClientKnownRequestError2 = runtime2.PrismaClientKnownRequestError;
var PrismaClientUnknownRequestError2 = runtime2.PrismaClientUnknownRequestError;
var PrismaClientRustPanicError2 = runtime2.PrismaClientRustPanicError;
var PrismaClientInitializationError2 = runtime2.PrismaClientInitializationError;
var PrismaClientValidationError2 = runtime2.PrismaClientValidationError;
var sql = runtime2.sqltag;
var empty2 = runtime2.empty;
var join2 = runtime2.join;
var raw2 = runtime2.raw;
var Sql2 = runtime2.Sql;
var Decimal2 = runtime2.Decimal;
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var prismaVersion = {
  client: "7.2.0",
  engine: "0c8ef2ce45c83248ab3df073180d5eda9e8be7a3"
};
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var DbNull2 = runtime2.DbNull;
var JsonNull2 = runtime2.JsonNull;
var AnyNull2 = runtime2.AnyNull;
var ModelName = {
  User: "User",
  Session: "Session",
  Account: "Account",
  Verification: "Verification",
  Comment: "Comment",
  Post: "Post"
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var UserScalarFieldEnum = {
  id: "id",
  name: "name",
  email: "email",
  emailVerified: "emailVerified",
  image: "image",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  role: "role",
  phone: "phone",
  status: "status"
};
var SessionScalarFieldEnum = {
  id: "id",
  expiresAt: "expiresAt",
  token: "token",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  ipAddress: "ipAddress",
  userAgent: "userAgent",
  userId: "userId"
};
var AccountScalarFieldEnum = {
  id: "id",
  accountId: "accountId",
  providerId: "providerId",
  userId: "userId",
  accessToken: "accessToken",
  refreshToken: "refreshToken",
  idToken: "idToken",
  accessTokenExpiresAt: "accessTokenExpiresAt",
  refreshTokenExpiresAt: "refreshTokenExpiresAt",
  scope: "scope",
  password: "password",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var VerificationScalarFieldEnum = {
  id: "id",
  identifier: "identifier",
  value: "value",
  expiresAt: "expiresAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var CommentScalarFieldEnum = {
  id: "id",
  content: "content",
  authorId: "authorId",
  postId: "postId",
  parentId: "parentId",
  status: "status",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var PostScalarFieldEnum = {
  id: "id",
  title: "title",
  content: "content",
  thumbnail: "thumbnail",
  ifFeatured: "ifFeatured",
  status: "status",
  tags: "tags",
  views: "views",
  authorId: "authorId",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var SortOrder = {
  asc: "asc",
  desc: "desc"
};
var QueryMode = {
  default: "default",
  insensitive: "insensitive"
};
var NullsOrder = {
  first: "first",
  last: "last"
};
var defineExtension = runtime2.Extensions.defineExtension;

// generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/lib/prisma.ts
var connectionString = `${process.env.DATABASE_URL}`;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// src/modules/post/post.service.ts
var createPost = async (data, id) => {
  const result = await prisma.post.create({
    data: {
      ...data,
      authorId: id
    }
  });
  return result;
};
var getAllPost = async (payload) => {
  const {
    search,
    tags,
    isFeatured,
    status,
    authorId,
    page,
    limit,
    skip,
    sortBy,
    sortOrder
  } = payload;
  const whereConditions = [];
  if (search) {
    whereConditions.push({
      OR: [
        {
          title: {
            contains: search,
            mode: "insensitive"
          }
        },
        {
          content: {
            contains: search,
            mode: "insensitive"
          }
        },
        {
          tags: {
            has: search
          }
        }
      ]
    });
  }
  if (tags && tags.length > 0) {
    whereConditions.push({
      tags: {
        hasEvery: tags
      }
    });
  }
  if (typeof isFeatured === "boolean") {
    whereConditions.push({
      ifFeatured: isFeatured
    });
  }
  if (status) {
    whereConditions.push({
      status
    });
  }
  if (authorId) {
    whereConditions.push({
      authorId
    });
  }
  const allPost = await prisma.post.findMany({
    take: limit,
    skip,
    where: whereConditions.length > 0 ? { AND: whereConditions } : {},
    orderBy: { [sortBy]: sortOrder },
    include: {
      _count: {
        select: {
          comments: true
        }
      }
    }
  });
  const total = await prisma.post.count({
    where: { AND: whereConditions }
  });
  return {
    data: allPost,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  };
};
var getPostById = async (id) => {
  return await prisma.$transaction(async (tx) => {
    const postExists = await tx.post.findUnique({
      where: { id }
    });
    if (!postExists) {
      throw new Error("Post not found");
    }
    await tx.post.update({
      where: { id },
      data: {
        views: { increment: 1 }
      }
    });
    const postData = await tx.post.findUnique({
      where: { id },
      include: {
        comments: {
          where: {
            parentId: null,
            status: CommentStatus.APPROVED
          },
          orderBy: { createdAt: "asc" },
          include: {
            replies: {
              where: { status: CommentStatus.APPROVED },
              orderBy: { createdAt: "asc" },
              include: {
                replies: {
                  where: { status: CommentStatus.APPROVED }
                }
              }
            }
          }
        },
        _count: {
          select: { comments: true }
        }
      }
    });
    return postData;
  });
};
var getMyPosts = async (authorId) => {
  const userInfo = await prisma.user.findUnique({
    where: {
      id: authorId,
      status: "ACTIVE"
    }
  });
  if (!userInfo) {
    throw new Error("You are not an active user");
  }
  const result = await prisma.post.findMany({
    where: {
      authorId
    },
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: {
          comments: true
        }
      }
    }
  });
  const total = await prisma.post.aggregate({
    _count: {
      id: true
    },
    where: {
      authorId
    }
  });
  return {
    data: result,
    total
  };
};
var updatePost = async (postId, data, authorId, isAdmin) => {
  const postData = await prisma.post.findUnique({
    where: {
      id: postId
    },
    select: {
      id: true,
      authorId: true
    }
  });
  if (!isAdmin && postData?.authorId !== authorId) {
    throw new Error("You are not allowed to update this post");
  }
  if (!isAdmin) {
    delete data.ifFeatured;
  }
  if (!postData) {
    throw new Error("Post Data not found");
  }
  const result = await prisma.post.update({
    where: {
      id: postData.id
    },
    data
  });
  return result;
};
var deletePost = async (postId, authorId, isAdmin) => {
  const postData = await prisma.post.findUnique({
    where: {
      id: postId
    },
    select: {
      id: true,
      authorId: true
    }
  });
  if (!postData) {
    throw new Error("Post not found");
  }
  if (!isAdmin && postData?.authorId !== authorId) {
    throw new Error("You are not allowed to update this post");
  }
  return await prisma.post.delete({
    where: {
      id: postId
    }
  });
};
var getStats = async () => {
  return await prisma.$transaction(async (tx) => {
    return await prisma.$transaction(async (tx2) => {
      const [
        totalPosts,
        publishedPosts,
        draftPosts,
        archivedPosts,
        totalComments,
        approvedComments,
        rejectedStatus,
        totalUsers,
        adminCount,
        userCount,
        totalViews
      ] = await Promise.all([
        await tx2.post.count(),
        await tx2.post.count({
          where: {
            status: PostStatus.PUBLISHED
          }
        }),
        await tx2.post.count({
          where: {
            status: PostStatus.DRAFT
          }
        }),
        await tx2.post.count({
          where: {
            status: PostStatus.ARCHIVED
          }
        }),
        await tx2.comment.count(),
        await tx2.comment.count({
          where: {
            status: CommentStatus.APPROVED
          }
        }),
        await tx2.comment.count({
          where: {
            status: CommentStatus.REJECTED
          }
        }),
        await tx2.user.count(),
        await tx2.user.count({
          where: {
            role: "ADMIN" /* ADMIN */
          }
        }),
        await tx2.user.count({
          where: {
            role: "USER" /* USER */
          }
        }),
        await tx2.post.aggregate({
          _sum: {
            views: true
          }
        })
      ]);
      return {
        totalPosts,
        publishedPosts,
        draftPosts,
        archivedPosts,
        totalComments,
        approvedComments,
        rejectedStatus,
        totalUsers,
        adminCount,
        userCount,
        totalViews: totalViews._sum.views
      };
    });
  });
};
var PostService = {
  createPost,
  getAllPost,
  getPostById,
  getMyPosts,
  updatePost,
  deletePost,
  getStats
};

// src/helpers/parigationSortingHelper.ts
var paginationSortinghelper = (options) => {
  console.log("Helper received options:", options);
  console.log("options.limit:", options.limit, "type:", typeof options.limit);
  const page = Number(options?.page) || 1;
  const limit = Number(options?.limit) || 10;
  console.log("Parsed page:", page, "Parsed limit:", limit);
  const skip = (page - 1) * limit;
  const sortBy = options.sortBy || "createdAt";
  const sortOrder = options.sortOrder || "desc";
  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder
  };
};
var parigationSortingHelper_default = paginationSortinghelper;

// src/modules/post/post.controller.ts
var createPost2 = async (req, res, next) => {
  console.log("req from controller", req.user);
  try {
    const user = req.user;
    if (!user) {
      return res.status(400).json({
        error: "Unauthorized"
      });
    }
    const result = await PostService.createPost(req.body, user.id);
    return res.status(201).json({
      message: "Post created successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var getAllPost2 = async (req, res) => {
  try {
    const { search } = req.query;
    const tags = req.query.tags ? req.query.tags.split(",") : [];
    const isFeatured = req.query.isFeatured ? req.query.isFeatured === "true" ? true : req.query.isFeatured === "false" ? false : void 0 : void 0;
    const status = req.query.status && typeof req.query.status === "string" && Object.values(PostStatus).includes(req.query.status) ? req.query.status : void 0;
    const authorId = req.query.authorId ? req.query.authorId : void 0;
    const paginationParams = parigationSortingHelper_default(req.query);
    console.log("Raw query params:", req.query);
    console.log("Pagination params:", paginationParams);
    const { page, limit, skip, sortBy, sortOrder } = paginationParams;
    const result = await PostService.getAllPost({
      search: search || "",
      tags,
      isFeatured,
      status,
      authorId,
      page,
      limit,
      skip,
      sortBy,
      sortOrder
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: "Post data fetch failed",
      error: error instanceof Error ? error.message : String(error)
    });
  }
};
var getPostById2 = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await PostService.getPostById(id);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Post data fetch failed",
      error: error instanceof Error ? error.message : String(error)
    });
  }
};
var getMyPosts2 = async (req, res) => {
  try {
    const user = req.user;
    console.log("user from getMyPost", user);
    if (!user) {
      throw new Error("User informaiton in required");
    }
    const result = await PostService.getMyPosts(user.id);
    res.status(200).json(result);
  } catch (error) {
    console.log(error, "error dekho");
    res.status(500).json({
      message: "My post data fetch failed",
      error: error instanceof Error ? error.message : String(error)
    });
  }
};
var updatePost2 = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("You are unauthorized");
    }
    const isAdmin = user.role === "ADMIN";
    const { postId } = req.params;
    if (!postId) {
      throw new Error("post id is required");
    }
    const result = await PostService.updatePost(
      postId,
      req.body,
      user.id,
      isAdmin
    );
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
var deletePost2 = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("You are unauthorized");
    }
    const isAdmin = user.role === "ADMIN";
    const { postId } = req.params;
    if (!postId) {
      throw new Error("post id is required");
    }
    const result = await PostService.deletePost(
      postId,
      user.id,
      isAdmin
    );
    res.status(200).json({
      message: "post deleted successfully",
      result
    });
  } catch (error) {
    res.status(500).json({
      message: "Post delete failed",
      error: error instanceof Error ? error.message : String(error)
    });
  }
};
var getStats2 = async (req, res) => {
  try {
    const result = await PostService.getStats();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: "Post stat retrived failed",
      error: error instanceof Error ? error.message : String(error)
    });
  }
};
var PostController = {
  createPost: createPost2,
  getAllPost: getAllPost2,
  getPostById: getPostById2,
  getMyPosts: getMyPosts2,
  updatePost: updatePost2,
  deletePost: deletePost2,
  getStats: getStats2
};

// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import nodemailer from "nodemailer";
var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  // Use true for port 465, false for port 587
  auth: {
    user: process.env.APP_USER,
    pass: process.env.APP_PASS
  }
});
var auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"
    // or "mysql", "postgresql", ...etc
  }),
  trustedOrigins: [process.env.APP_URL],
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "USER",
        required: false
      },
      phone: {
        type: "string",
        required: false
      },
      status: {
        type: "string",
        defaultValue: "ACTIVE",
        required: false
      }
    }
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      const verificationURL = `${process.env.APP_URL}/verify-email?token=${token}`;
      try {
        const info = await transporter.sendMail({
          from: '"Prisma Blog" <prisma_blog@gmail.com>',
          to: user.email,
          subject: "Email Verification",
          text: "Hello world?",
          // Plain-text version of the message
          html: `
                <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Verify Your Email</title>

    <style>
      body {
        margin: 0;
        padding: 0;
        background-color: #f4f6f8;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          Helvetica, Arial, sans-serif;
      }

      .container {
        max-width: 520px;
        margin: 40px auto;
        background: #ffffff;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
      }

      .header {
        background: linear-gradient(135deg, #6366f1, #4f46e5);
        padding: 26px;
        text-align: center;
        color: #ffffff;
      }

      .header h1 {
        margin: 0;
        font-size: 22px;
        font-weight: 600;
      }

      .content {
        padding: 30px 28px;
        color: #374151;
      }

      .content p {
        font-size: 15px;
        line-height: 1.6;
        margin: 0 0 16px;
      }

      .verify-btn {
        display: inline-block;
        margin: 26px 0;
        padding: 14px 24px;
        background: #4f46e5;
        color: #ffffff !important;
        text-decoration: none;
        border-radius: 8px;
        font-size: 15px;
        font-weight: 600;
      }

      .link-box {
        margin-top: 20px;
        padding: 14px;
        background: #f9fafb;
        border-radius: 8px;
        font-size: 13px;
        color: #6b7280;
        word-break: break-all;
      }

      .footer {
        background: #f9fafb;
        padding: 18px 24px;
        text-align: center;
        font-size: 13px;
        color: #6b7280;
      }

      .footer span {
        color: #4f46e5;
        font-weight: 600;
      }
    </style>
  </head>

  <body>
    <div class="container">
      <!-- Header -->
      <div class="header">
        <h1>Prisma Blog</h1>
      </div>

      <!-- Content -->
      <div class="content">
        <p>Hi \u{1F44B},${user.name}</p>

        <p>
          Welcome to <strong>Prisma Blog</strong>!  
          Please confirm your email address by clicking the button below.
        </p>

        <a href="${verificationURL}" class="verify-btn">
          Verify Email
        </a>

        <p>
          This verification link will expire in
          <strong>10 minutes</strong> for security reasons.
        </p>

        <p>
          If the button doesn\u2019t work, copy and paste this link into your browser:
        </p>

        <div class="link-box">
          ${verificationURL}
        </div>

        <p style="margin-top: 24px;">
          If you didn\u2019t create an account, you can safely ignore this email.
        </p>

        <p>
          \u2014 <br />
          The <strong>Prisma Blog</strong> Team
        </p>
      </div>

      <!-- Footer -->
      <div class="footer">
        \xA9 2026 <span>Prisma Blog</span>. All rights reserved.
      </div>
    </div>
  </body>
</html>

                `
          // HTML version of the message
        });
        console.log("***** verification email send!");
      } catch (err) {
        console.log("verify email send fail");
        throw err;
      }
    }
  },
  baseURL: process.env.BETTER_AUTH_URL,
  socialProviders: {
    google: {
      prompt: "select_account consent",
      accessType: "offline",
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }
  }
});

// src/middlewares/auth.ts
var auth2 = (...roles) => {
  return async (req, res, next) => {
    try {
      const session = await auth.api.getSession({
        headers: req.headers
      });
      if (!session) {
        return res.status(401).json({
          success: false,
          message: "You are not authorized"
        });
      }
      if (!session.user.emailVerified) {
        return res.status(403).json({
          success: false,
          message: "Email verification required"
        });
      }
      req.user = {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        role: session.user.role,
        emailVerified: session.user.emailVerified
      };
      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden! You don't have the permission"
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
var auth_default = auth2;

// src/modules/post/post.router.ts
var router = express.Router();
router.get(
  "/",
  PostController.getAllPost
);
router.get(
  "/stats",
  auth_default("ADMIN" /* ADMIN */),
  PostController.getStats
);
router.get(
  "/my-posts",
  auth_default("USER" /* USER */, "ADMIN" /* ADMIN */),
  PostController.getMyPosts
);
router.get(
  "/:id",
  PostController.getPostById
);
router.post(
  "/",
  auth_default("USER" /* USER */, "ADMIN" /* ADMIN */),
  PostController.createPost
);
router.patch(
  "/:postId",
  auth_default("ADMIN" /* ADMIN */, "USER" /* USER */),
  PostController.updatePost
);
router.delete(
  "/:postId",
  auth_default("ADMIN" /* ADMIN */, "USER" /* USER */),
  PostController.deletePost
);
var postRouter = router;

// src/app.ts
import { toNodeHandler } from "better-auth/node";
import cors from "cors";

// src/modules/comment/comment.router.ts
import express2 from "express";

// src/modules/comment/comment.service.ts
var createComment = async (payload) => {
  await prisma.post.findUniqueOrThrow({
    where: {
      id: payload.postId
    }
  });
  if (payload.parentId) {
    await prisma.comment.findUniqueOrThrow({
      where: {
        id: payload.parentId
      }
    });
  }
  return await prisma.comment.create({
    data: payload
  });
};
var getCommentById = async (id) => {
  return await prisma.comment.findUnique({
    where: {
      id
    },
    include: {
      post: {
        select: {
          id: true,
          title: true,
          views: true
        }
      }
    }
  });
};
var getCommentsbyAuthor = async (authorId) => {
  return await prisma.comment.findMany({
    where: {
      authorId
    },
    orderBy: { createdAt: "desc" },
    include: {
      post: {
        select: {
          id: true,
          title: true,
          views: true
        }
      }
    }
  });
};
var updateCommentById = async (commentId, data, role, authorId) => {
  const commentData = await prisma.comment.findFirst({
    where: {
      id: commentId,
      authorId
    }
  });
  if (!commentData) {
    throw new Error("Your provided info is invalid");
  }
  const hasPermission = commentData.authorId === authorId || role === "ADMIN" /* ADMIN */;
  if (!hasPermission) {
    throw new Error("You don't have the permission to delete");
  }
  return await prisma.comment.update({
    where: {
      id: commentId
    },
    data
  });
};
var deleteCommentbyId = async (commentId, userId, role) => {
  const commentData = await prisma.comment.findFirst({
    where: {
      id: commentId,
      authorId: userId
    }
  });
  if (!commentData) {
    throw new Error("Your provided info is invalid");
  }
  const hasPermission = commentData.authorId === userId || role === "ADMIN" /* ADMIN */;
  if (!hasPermission) {
    throw new Error("You don't have the permission to delete");
  }
  return await prisma.comment.delete({
    where: {
      id: commentId
    }
  });
};
var moderateComment = async (id, data) => {
  const commentData = await prisma.comment.findUnique({
    where: {
      id
    },
    select: {
      id: true,
      status: true
    }
  });
  if (commentData?.status === data.status) {
    throw new Error(`Your privided status ${data.status} is already exists`);
  }
  return await prisma.comment.update({
    where: {
      id
    },
    data
  });
};
var commentService = {
  createComment,
  getCommentById,
  getCommentsbyAuthor,
  deleteCommentbyId,
  updateCommentById,
  moderateComment
};

// src/modules/comment/comment.controller.ts
var createPost3 = async (req, res) => {
  try {
    const user = req.user;
    req.body.authorId = user?.id;
    const result = await commentService.createComment(req.body);
    return res.status(201).json({
      message: "Comment created successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      message: "Comment creation failed",
      error: error instanceof Error ? error.message : String(error)
    });
  }
};
var getCommentbyId = async (req, res) => {
  try {
    const { commentId } = req.params;
    const result = await commentService.getCommentById(commentId);
    return res.status(200).json({
      message: "Comment retrived successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      message: "Comment retrive failed",
      error: error instanceof Error ? error.message : String(error)
    });
  }
};
var getCommentsbyAuthor2 = async (req, res) => {
  try {
    const { authorId } = req.params;
    const result = await commentService.getCommentsbyAuthor(authorId);
    return res.status(200).json({
      message: "Comment retrived successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      message: "Comment retrive failed",
      error: error instanceof Error ? error.message : String(error)
    });
  }
};
var updateCommentbyId = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({
        message: "User not authenticated"
      });
    }
    const { id, role } = user;
    const { commentId } = req.params;
    const result = await commentService.updateCommentById(
      commentId,
      req.body,
      role,
      id
    );
    return res.status(200).json({
      message: "Comment update successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      message: "Comment update failed",
      error: error instanceof Error ? error.message : String(error)
    });
  }
};
var deleteCommentbyId2 = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({
        message: "User not authenticated"
      });
    }
    const { id, role } = user;
    const { commentId } = req.params;
    const result = await commentService.deleteCommentbyId(commentId, id, role);
    return res.status(200).json({
      message: "Comment deleted successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      message: "Comment delete failed",
      error: error instanceof Error ? error.message : String(error)
    });
  }
};
var moderateComment2 = async (req, res) => {
  try {
    const { commentId } = req.params;
    const result = await commentService.moderateComment(
      commentId,
      req.body
    );
    return res.status(200).json({
      message: "Comment update successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      message: "Comment update failed",
      error: error instanceof Error ? error.message : String(error)
    });
  }
};
var CommentController = {
  createPost: createPost3,
  getCommentbyId,
  getCommentsbyAuthor: getCommentsbyAuthor2,
  deleteCommentbyId: deleteCommentbyId2,
  updateCommentbyId,
  moderateComment: moderateComment2
};

// src/modules/comment/comment.router.ts
var router2 = express2.Router();
router2.get("/:commentId", CommentController.getCommentbyId);
router2.get("/author/:authorId", CommentController.getCommentsbyAuthor);
router2.post("/", auth_default("ADMIN" /* ADMIN */, "USER" /* USER */), CommentController.createPost);
router2.patch("/:commentId", auth_default("ADMIN" /* ADMIN */, "USER" /* USER */), CommentController.updateCommentbyId);
router2.patch("/:commentId/moderate", auth_default("ADMIN" /* ADMIN */), CommentController.moderateComment);
router2.delete("/:commentId", auth_default("USER" /* USER */, "ADMIN" /* ADMIN */), CommentController.deleteCommentbyId);
var commentRouter = router2;

// src/middlewares/globalErrorHandler.ts
function errorHandler(err, req, res, next) {
  let statusCode = 500;
  let errorMessage = "Internal server error";
  let errorDetails = err;
  if (err instanceof prismaNamespace_exports.PrismaClientValidationError) {
    statusCode = 400;
    errorMessage = "You provide incorrect field type or missing fields";
  } else if (err instanceof prismaNamespace_exports.PrismaClientKnownRequestError) {
    if (err.code === "p2025") {
      statusCode = 400;
      errorMessage = "An operation failed because it depends of one or more records that were required but not found";
    } else if (err.code === "p2002") {
      statusCode = 400;
      errorMessage = "Duplicate key error";
    }
  } else if (err instanceof prismaNamespace_exports.PrismaClientKnownRequestError) {
    statusCode = 500;
    errorMessage = "Error occured during execution";
  } else if (err instanceof prismaNamespace_exports.PrismaClientInitializationError) {
    if (err.errorCode === "P1000") {
      statusCode = 401;
      errorMessage = "Authentication failed, please check your credentials";
    } else if (err.errorCode === "P1001") {
      statusCode = 400;
      errorMessage = "Can not reach database server";
    }
  }
  res.status(statusCode);
  res.json({
    message: errorMessage,
    error: errorDetails
  });
}

// src/middlewares/notFound.ts
var notFound = (req, res) => {
  res.status(404).json({
    mesage: "Route not found",
    path: req.originalUrl,
    date: Date()
  });
};
var notFound_default = notFound;

// src/app.ts
var app = express3();
app.use(cors({
  origin: process.env.APP_URL || "http://localhost:3000",
  credentials: true
}));
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(express3.json());
app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.use("/api/v1/post", postRouter);
app.use("/api/v1/comment", commentRouter);
app.use(errorHandler);
app.use(notFound_default);
var app_default = app;

// src/server.ts
var port = process.env.PORT || 5e3;
async function main() {
  try {
    await prisma.$connect();
    app_default.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error during server startup:", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}
main();
