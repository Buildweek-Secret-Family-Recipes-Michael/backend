import * as Knex from "knex";
//to generate uuids: https://www.uuidgenerator.net/version4

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("recipes").del();
    await knex("users").del();
    await knex("ingredients").del();

    // Inserts seed entries
    await knex("users").insert([
        {
            id: "868f632e-dffc-41b0-872b-c612525e5651",
            username: "pokemon0",
            password: "$2a$13$h/OXxNKcj4E4ZF1KO5Uzhuh/b38Q57Bh5crgmMA4IgqaSz8rG9mG2",
            createdAt: "2020-09-06 21:09:32.767943"
        },
        {
            id: "f620415e-7fa8-4d3c-8a43-a0a30e6706b2",
            username: "pokemon1",
            password: "$2a$13$kOveZ8/J9HW6r856exCAxeAIGhkROu/tvnrcFUk76YVmzWK.lb7FK",
            createdAt: "2020-09-06 22:31:27.502811"
        },
        {
            id: "797e2a5a-6458-4b37-b0f0-d82e3f430117",
            username: "pokemon2",
            password: "$2a$13$GcChAn481QtEVU7J2c.yQuszYOJ98I0PpOvAf.SZtNXTLIRK8ontS",
            createdAt: "2020-09-06 21:10:56.035211"
        },
    ]);

    await knex("recipes").insert([
        {id: "2ded4075-ded3-4938-9dae-f81f29c79ec8", name: "cookies", userId: "797e2a5a-6458-4b37-b0f0-d82e3f430117"},
        {id: "5305e4b7-82ff-4ff7-b267-d033174048c2", name: "break", userId: "797e2a5a-6458-4b37-b0f0-d82e3f430117"},
        {id: "02155b98-2022-482c-b6ee-20f0e3d2b58d", name: "pancakes", userId: "f620415e-7fa8-4d3c-8a43-a0a30e6706b2"},
        {
            id: "5997052e-028c-41c4-b2e2-5616f5b7854b",
            name: "chickie nuggies",
            userId: "f620415e-7fa8-4d3c-8a43-a0a30e6706b2"
        },
        {
            id: "df680068-70b9-4b0f-a2cc-f20bc1a62599",
            name: "saucy nugs",
            userId: "f620415e-7fa8-4d3c-8a43-a0a30e6706b2"
        },
    ]);

    await knex("ingredients").insert([
        {
            id: "11e5ac5b-5fe1-4bba-8f0f-eebac0ac430a",
            amount: "1 cup",
            name: "nugs"
        },
        {
            id: "e4cd6cf2-4146-4676-a0e1-2dec54c4a9a5",
            amount: "2 cups",
            name: "nugs"
        },
        {
            id: "f71cce18-ebe0-4a64-bd54-a78069b4a630",
            amount: "1 packet",
            name: "yeast"
        },
        {
            id: "4d252b6d-744d-4fd6-9c5b-5a4fc1be3017",
            amount: "2 cups",
            name: "flour"
        },
        {
            id: "5bf86176-ca68-4483-8938-fba3be8c1809",
            amount: "1 cup",
            name: "water"
        },
    ]);
}