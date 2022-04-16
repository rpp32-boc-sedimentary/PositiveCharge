CREATE TABLE sponsors (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  poi_id INTEGER NOT NULL,
  start_date DATE NOT NULL,
  months INTEGER NOT NULL
  CONSTRAINT fk_user
    FOREIGN KEY(user_id)
      REFERENCES users(id)
  CONSTRAINT fk_poi
    FOREIGN KEY(poi_id)
      REFERENCES poi(id)
);