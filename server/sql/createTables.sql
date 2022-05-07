CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS people (
    person_id uuid DEFAULT uuid_generate_v4(),
    auth_id varchar(200),
    name varchar(50) NOT NULL,
    email_contact varchar(50),
    phone_number varchar(20),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (person_id)
    );

CREATE TABLE IF NOT EXISTS OFFERS (
    offer_id uuid DEFAULT uuid_generate_v4(),
    person_id uuid,
    title varchar(50),
    description varchar(200),
    location varchar(50),
    category varchar(50),
    max_refugees_count INT NOT NULL,
    is_anonymous BOOLEAN NOT NULL,
    preffered_contact_method varchar(200),
    is_approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (offer_id),
    CONSTRAINT fk_person_id FOREIGN KEY(person_id) REFERENCES people(person_id)
);

CREATE TABLE IF NOT EXISTS USAGES (
    offer_id uuid,
    person_id uuid,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_person_id_usage FOREIGN KEY(person_id) REFERENCES people(person_id),
    CONSTRAINT fk_offer_id_usage FOREIGN KEY(offer_id) REFERENCES offers(offer_id)
);
