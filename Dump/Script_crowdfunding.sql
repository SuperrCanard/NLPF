DROP TABLE IF EXISTS "Crowdfunding"."User";
DROP TABLE IF EXISTS "Crowdfunding"."Project";
DROP TABLE IF EXISTS "Crowdfunding"."Compensation";
DROP TABLE IF EXISTS "Crowdfunding".contribution;

-- Table: "Crowdfunding"."User"

CREATE TABLE "Crowdfunding"."User"
(
  "Name" "char"[] NOT NULL,
  user_id serial NOT NULL,
  "Fisrtname" "char"[] NOT NULL,
  email text NOT NULL,
  CONSTRAINT user_id PRIMARY KEY (user_id)
);

-- Table: "Crowdfunding"."Project"

CREATE TABLE "Crowdfunding"."Project"
(
  project_id serial NOT NULL,
  "Name" "char"[] NOT NULL,
  "Description" text NOT NULL,
  "Contact" text NOT NULL,
  ref_user_id serial NOT NULL,
  "Date" date NOT NULL,
  CONSTRAINT project_id PRIMARY KEY (project_id),
  CONSTRAINT ref_user_id FOREIGN KEY (ref_user_id)
      REFERENCES "Crowdfunding"."User" (user_id) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE CASCADE
);

-- Table: "Crowdfunding"."Compensation"

CREATE TABLE "Crowdfunding"."Compensation"
(
  "Name" "char"[] NOT NULL,
  "Description" text,
  amount integer NOT NULL,
  compensation_id serial NOT NULL,
  ref_project_id serial NOT NULL,
  CONSTRAINT compensation_id PRIMARY KEY (compensation_id),
  CONSTRAINT ref_project_id FOREIGN KEY (ref_project_id)
      REFERENCES "Crowdfunding"."Project" (project_id) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE CASCADE
);

-- Table: "Crowdfunding".contribution

CREATE TABLE "Crowdfunding".contribution
(
  contribution_id serial NOT NULL,
  date date NOT NULL,
  ref_user_id serial NOT NULL,
  ref_compensation_id serial NOT NULL,
  CONSTRAINT contribution_id PRIMARY KEY (contribution_id),
  CONSTRAINT ref_compensation_id FOREIGN KEY (ref_compensation_id)
      REFERENCES "Crowdfunding"."Compensation" (compensation_id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT ref_user_id FOREIGN KEY (ref_user_id)
      REFERENCES "Crowdfunding"."User" (user_id) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE CASCADE
);