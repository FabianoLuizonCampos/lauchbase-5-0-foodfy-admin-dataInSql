CREATE DATABASE "foodfy"

CREATE TABLE "recipes" (
  "id" SERIAL PRIMARY KEY,
  "chef_id" int NOT NULL,
  "image" text,
  "title" text,
  "ingredients" text[],
  "preparations" text[],
  "information" text,
  "created_at" timestamp NOT NULL
);

CREATE TABLE "chef" (
  "id" SERIAL PRIMARY KEY,
  "name" text,
  "avatar_url" text,
  "created_at" timestamp NOT NULL
);

ALTER TABLE "recipes" ADD FOREIGN KEY ("chef_id") REFERENCES "chef" ("id");
