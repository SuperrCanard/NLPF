DROP TABLE IF EXISTS "user";
DROP TABLE IF EXISTS "project";
DROP TABLE IF EXISTS "compensation";
DROP TABLE IF EXISTS contribution;

-- Table: "user"

CREATE TABLE "user"
(
  user_id serial NOT NULL,
  "name" "char"[] NOT NULL,
  "firstname" "char"[] NOT NULL,
  email text NOT NULL,
  password text NOT NULL,
  CONSTRAINT user_id PRIMARY KEY (user_id)
);

-- Table: "project"

CREATE TABLE "project"
(
  project_id serial NOT NULL,
  "name" "char"[] NOT NULL,
  "description" text NOT NULL,
  "contact" text NOT NULL,
  ref_user_id serial NOT NULL,
  "date" date NOT NULL,
  CONSTRAINT project_id PRIMARY KEY (project_id),
  CONSTRAINT ref_user_id FOREIGN KEY (ref_user_id)
      REFERENCES "user" (user_id) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE CASCADE
);

-- Table: "compensation"

CREATE TABLE "compensation"
(
  compensation_id serial NOT NULL,
  "name" "char"[] NOT NULL,
  "description" text,
  amount integer NOT NULL,
  ref_project_id serial NOT NULL,
  CONSTRAINT compensation_id PRIMARY KEY (compensation_id),
  CONSTRAINT ref_project_id FOREIGN KEY (ref_project_id)
      REFERENCES "project" (project_id) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE CASCADE
);

-- Table: contribution

CREATE TABLE contribution
(
  contribution_id serial NOT NULL,
  date date NOT NULL,
  ref_user_id serial NOT NULL,
  ref_compensation_id serial NOT NULL,
  CONSTRAINT contribution_id PRIMARY KEY (contribution_id),
  CONSTRAINT ref_Compensation_id FOREIGN KEY (ref_Compensation_id)
      REFERENCES "compensation" (compensation_id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT ref_user_id FOREIGN KEY (ref_user_id)
      REFERENCES "user" (user_id) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE CASCADE
);