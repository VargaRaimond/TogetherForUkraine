CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS people (
    id varchar(200),
    name varchar(50) NOT NULL,
    email_contact varchar(50),
    phone_number varchar(20),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (id)
    );

CREATE TABLE IF NOT EXISTS OFFERS (
    id uuid DEFAULT uuid_generate_v4(),
    person_id varchar(200),
    title varchar(50),
    description varchar(200),
    location varchar(50),
    category varchar(50),
    max_refugees_count INT NOT NULL,
    current_refugees_count INT DEFAULT 0,
    is_anonymous BOOLEAN NOT NULL,
    preferred_contact_method varchar(200),
    is_approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (id),
    CONSTRAINT fk_person_id FOREIGN KEY(person_id) REFERENCES people(id)
);

CREATE TABLE IF NOT EXISTS USAGES (
    id uuid DEFAULT uuid_generate_v4(),
    offer_id uuid,
    person_id varchar(200),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (id),
    CONSTRAINT fk_person_id_usage FOREIGN KEY(person_id) REFERENCES people(id),
    CONSTRAINT fk_offer_id_usage FOREIGN KEY(offer_id) REFERENCES offers(id)
);
