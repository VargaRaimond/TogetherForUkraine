exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex("usages")
    .del()
    .then(() => {
      // Inserts seed entries
      return knex("usages").insert([
        {
          id: "94f939fa-7495-4f76-8bd0-4bc65adaf8dd",
          offer_id: "8f2901de-bb5f-4c86-bea0-f291226d4edf",
          person_id: "auth0|627521204028e4006ffb1f57",
        },
        {
          id: "e568799e-d27b-416e-9e93-0aea5ee3a0e3",
          offer_id: "0a257be7-dcad-401d-a016-0a658d13cb96",
          person_id: "auth0|627aa11293f62100671c14e0",
        },
        {
          id: "f1ed93fa-3f54-463a-96d9-a8b251669a74",
          offer_id: "0a257be7-dcad-401d-a016-0a658d13cb96",
          person_id: "auth0|627aa11293f62100671c14e0",
        },
        {
          id: "65f38046-aa2e-42f8-9ba5-cefb3d43edcd",
          offer_id: "b5b85423-1687-4d99-ad09-236fd34bff46",
          person_id: "auth0|627aa11293f62100671c14e0",
        },
        {
          id: "54eb833d-16b5-4ba0-9429-252fcc163106",
          offer_id: "b5b85423-1687-4d99-ad09-236fd34bff46",
          person_id: "auth0|62751fc94028e4006ffb1ee3",
        },
      ]);
    });
};
