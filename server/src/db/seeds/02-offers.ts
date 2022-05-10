exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex("offers")
    .del()
    .then(() => {
      // Inserts seed entries
      return knex("offers").insert([
        {
          id: "8993e8b5-00f5-450b-b2d0-59e523f1280b",
          person_id: "auth0|62751fc94028e4006ffb1ee3",
          title: "Help 1",
          description:
            "Volunteers are individuals who freely offer their time, labor, and expertise. Volunteers often work for schools or NGOs, where they typically receive training and report to designated senior staff. Completely free trial, no card required.",
          location: "Bacau",
          category: "Food",
          max_refugees_count: 10,
          is_anonymous: false,
          preferred_contact_method: "email",
          is_approved: false,
        },
        {
          id: "b5b85423-1687-4d99-ad09-236fd34bff46",
          person_id: "auth0|62751fc94028e4006ffb1ee3",
          title: "Help 2",
          description:
            "Volunteers are individuals who freely offer their time, labor, and expertise. Volunteers often work for schools or NGOs, where they typically receive training and report to designated senior staff. Completely free trial, no card required.",
          location: "Bucuresti",
          category: "Food",
          max_refugees_count: 6,
          current_refugees_count: 1,
          is_anonymous: false,
          preferred_contact_method: "phone",
          is_approved: true,
        },
        {
          id: "0a257be7-dcad-401d-a016-0a658d13cb96",
          person_id: "auth0|627aa072abf40a0069ec99e6",
          title: "Help 3",
          description: "I'll send money.",
          location: "Bucuresti",
          category: "Money",
          max_refugees_count: 20,
          current_refugees_count: 2,
          is_anonymous: true,
          preferred_contact_method: "email",
          is_approved: true,
        },
        {
          id: "045346ca-01fe-4b7a-8384-d2ca0d368738",
          person_id: "auth0|627a9fdfa9bfde006fed8d2b",
          title: "Help 4",
          description: "I have 12 double rooms",
          location: "Botosani",
          category: "Accomodation",
          max_refugees_count: 24,
          is_anonymous: false,
          preferred_contact_method: "phone",
          is_approved: false,
        },
        {
          id: "8f2901de-bb5f-4c86-bea0-f291226d4edf",
          person_id: "auth0|627aa0fafd077c006a2bda42",
          title: "Help 5",
          description: "3 meals a day for at least 3 months",
          location: "Iasi",
          category: "Food",
          max_refugees_count: 3,
          current_refugees_count: 1,
          is_anonymous: false,
          preferred_contact_method: "phone",
          is_approved: true,
        },
        {
          id: "16f269a0-0ade-4b6e-b7a2-44a2fe4eb2f3",
          person_id: "auth0|627a9fdfa9bfde006fed8d2b",
          title: "Help 6",
          description: "I have a house with 5 rooms",
          location: "Iasi",
          category: "Accomodation",
          max_refugees_count: 10,
          current_refugees_count: 1,
          is_anonymous: false,
          preferred_contact_method: "phone",
          is_approved: true,
        },
      ]);
    });
};
