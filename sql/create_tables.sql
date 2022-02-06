-- Table: system.classroom

CREATE TABLE IF NOT EXISTS system.classroom
(
    code text COLLATE pg_catalog."default" NOT NULL,
    level text COLLATE pg_catalog."default" NOT NULL,
    module text COLLATE pg_catalog."default" NOT NULL,
    capacity integer,
    start_date timestamp without time zone,
    end_date timestamp without time zone,
    CONSTRAINT classroom_pkey PRIMARY KEY (code, level, module)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS system.classroom
    OWNER to postgres;

-- Table: system.enrollment

CREATE TABLE IF NOT EXISTS system.enrollment
(
    code text COLLATE pg_catalog."default" NOT NULL,
    sequence integer,
    level text COLLATE pg_catalog."default",
    module text COLLATE pg_catalog."default",
    classroom text COLLATE pg_catalog."default",
    student text COLLATE pg_catalog."default",
    installments integer,
    issue_date timestamp without time zone,
    status text COLLATE pg_catalog."default",
    CONSTRAINT enrollment_pkey PRIMARY KEY (code)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS system.enrollment
    OWNER to postgres;

-- Table: system.invoice

CREATE TABLE IF NOT EXISTS system.invoice
(
    enrollment text COLLATE pg_catalog."default" NOT NULL,
    month integer NOT NULL,
    year integer NOT NULL,
    due_date timestamp without time zone,
    amount numeric,
    CONSTRAINT invoice_pkey PRIMARY KEY (enrollment, month, year)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS system.invoice
    OWNER to postgres;

-- Table: system.invoice_event

CREATE TABLE IF NOT EXISTS system.invoice_event
(
    enrollment text COLLATE pg_catalog."default",
    month integer,
    year integer,
    type text COLLATE pg_catalog."default",
    amount numeric
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS system.invoice_event
    OWNER to postgres;

-- Table: system.level

CREATE TABLE IF NOT EXISTS system.level
(
    code text COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default",
    CONSTRAINT level_pkey PRIMARY KEY (code)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS system.level
    OWNER to postgres;

-- Table: system.module

CREATE TABLE IF NOT EXISTS system.module
(
    code text COLLATE pg_catalog."default" NOT NULL,
    level text COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default",
    minimum_age integer,
    price integer,
    CONSTRAINT module_pkey PRIMARY KEY (code, level)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS system.module
    OWNER to postgres;

-- Table: system.student

CREATE TABLE IF NOT EXISTS system.student
(
    cpf text COLLATE pg_catalog."default" NOT NULL,
    name text COLLATE pg_catalog."default",
    birth_date timestamp without time zone,
    CONSTRAINT student_pkey PRIMARY KEY (cpf)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS system.student
    OWNER to postgres;