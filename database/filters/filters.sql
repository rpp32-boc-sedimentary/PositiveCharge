CREATE TABLE filterPOIs (
  id SERIAL NOT NULL PRIMARY KEY,
  name VARCHAR (100) NOT NULL,
  yelp_id VARCHAR (30) NOT NULL,
  price VARCHAR(40) NOT NULL,
  distance INT NOT NULL,
  address VARCHAR(200) NOT NULL,
  latitude NUMERIC NOT NULL,
  longitude NUMERIC NOT NULL,
  hours json NOT NULL,
  yelp_rating NUMERIC(2, 1) NULL,
  category VARCHAR(40) NOT NULL,
  id_chargers INT REFERENCES chargers (id)
);