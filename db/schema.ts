import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const categories = sqliteTable("categories", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  nameKa: text("name_ka").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const products = sqliteTable(
  "products",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    slug: text("slug").notNull().unique(),
    titleKa: text("title_ka").notNull(),
    descriptionKa: text("description_ka"),
    categoryId: integer("category_id")
      .notNull()
      .references(() => categories.id),
    teslaModel: text("tesla_model", {
      enum: ["model_3", "model_y", "model_s", "model_x", "universal"],
    }).notNull(),
    yearFrom: integer("year_from"),
    yearTo: integer("year_to"),
    condition: text("condition", { enum: ["new", "used"] }).notNull(),
    priceTetri: integer("price_tetri").notNull(),
    quantity: integer("quantity").notNull().default(1),
    oemNumber: text("oem_number"),
    status: text("status", { enum: ["active", "sold", "hidden"] })
      .notNull()
      .default("active"),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .$defaultFn(() => new Date()),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .notNull()
      .$defaultFn(() => new Date()),
  },
  (t) => [
    index("idx_products_category").on(t.categoryId),
    index("idx_products_model").on(t.teslaModel),
    index("idx_products_status").on(t.status),
  ],
);

export const productPhotos = sqliteTable(
  "product_photos",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    productId: integer("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    r2Key: text("r2_key").notNull(),
    sortOrder: integer("sort_order").notNull().default(0),
  },
  (t) => [index("idx_photos_product").on(t.productId)],
);

export const adminUsers = sqliteTable("admin_users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
});
