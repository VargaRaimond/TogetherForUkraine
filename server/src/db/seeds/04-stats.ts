exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex("stats")
    .del()
    .then(() => {
      // Inserts seed entries
      return knex("stats").insert([
        {
          active_volunteers: 4,
          helped_people: 5,
          active_offers: 4,
          total_offers: 6,
        },
      ]);
    });
};
