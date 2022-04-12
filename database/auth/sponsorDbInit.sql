CREATE TABLE sponsors (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(80) NOT NULL,
  poi_id INTEGER NOT NULL,
  dates DATE NOT NULL
  CONSTRAINT fk_user
    FOREIGN KEY(user_id)
      REFERENCES users(id)
  CONSTRAINT fk_poi
    FOREIGN KEY(poi_id)
      REFERENCES poi(id)
);