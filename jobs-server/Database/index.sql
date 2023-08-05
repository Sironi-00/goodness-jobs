BEGIN;

CREATE TABLE users
(
    id character varying(50) PRIMARY KEY,
    name character varying(50) NOT NULL UNIQUE,
    password character varying(50) NOT NULL,
    group_role character varying(50),
    active boolean
);

CREATE TABLE flats
(
    flat_code integer PRIMARY KEY,
    address character varying(200)
);

CREATE TABLE jobs
(
    flat_code integer,
    record_no integer PRIMARY KEY,
    date_vacant date,
    date_deadline date,
    instructor character varying(100),
    cleaned boolean,
    processed boolean,
    details character varying(200)
);

CREATE TABLE cleaned
(
    flat_code integer,
    record_no integer,
    PRIMARY KEY (flat_code, record_no),
    date_cleaned date,
    invoiced boolean DEFAULT false,
    date_invoiced date
);
-- ALTER

ALTER TABLE cleaned
    ADD FOREIGN KEY (record_no)
    REFERENCES jobs (record_no)
    ON DELETE CASCADE
    ON UPDATE CASCADE;


END;

-----------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------
-- Trigger
BEGIN;

CREATE FUNCTION add_cleaned() RETURNS TRIGGER AS $$
    BEGIN
        INSERT INTO cleaned (flat_code, record_no, date_cleaned) 
        VALUES (NEW.flat_code, NEW.record_no, NOW());
        RETURN NEW;
    END;
$$ LANGUAGE PLPGSQL;

CREATE TRIGGER log_on_cleaned
    AFTER UPDATE 
    ON jobs
    FOR EACH ROW
    WHEN (NEW.cleaned = true)
    EXECUTE FUNCTION add_cleaned();

END;
-----------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------