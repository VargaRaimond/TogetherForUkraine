exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex("people")
    .del()
    .then(() => {
      // Inserts seed entries
      return knex("people").insert([
        {
          id: "auth0|62751fc94028e4006ffb1ee3",
          name: "Voluntar",
          email_contact: "volunteer@example.com",
          phone_number: "0742258293",
        },
        {
          id: "auth0|627521204028e4006ffb1f57",
          name: "Gelu Refugelu",
          email_contact: "refugee@example.com",
          phone_number: "0724592843",
        },
        {
          id: "auth0|6275224a4cbfa0006e6f370c",
          name: "Admin",
          email_contact: "admin@example.com",
          phone_number: "0722234274",
        },
        {
          id: "auth0|627a9fdfa9bfde006fed8d2b",
          name: "Lavinia Irina",
          email_contact: "lavinia_irina@volunteer.com",
          phone_number: "0711111111",
        },
        {
          id: "auth0|627aa072abf40a0069ec99e6",
          name: "Cezar Teodor",
          email_contact: "cezar_teodor@volunteer.com",
          phone_number: "0744444444",
        },
        {
          id: "auth0|627aa0fafd077c006a2bda42",
          name: "Carmen Elena",
          email_contact: "carmen_elena@volunteer.com",
          phone_number: "0733333333",
        },
        {
          id: "auth0|627aa11293f62100671c14e0",
          name: "Yaroslava Iolanta",
          email_contact: "yaroslava@refugee.com",
          phone_number: "0722222222",
        },
      ]);
    });
};
