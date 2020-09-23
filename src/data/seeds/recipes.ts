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
        {
            id: "c037034f-3e0b-499f-be87-8e62f63b059e",
            username: "pokemon5",
            password: "$2a$13$qcePjjOx1XG8jaYjV09elukGoVB6d7cRSjH88cc43r/W6mTeVqhRC",
            createdAt: "2020-09-23 22:53:23.848283"
        },
    ]);

    await knex("recipes").insert([
        {id: "2ded4075-ded3-4938-9dae-f81f29c79ec8",
            name: "cookies",
            userId: "797e2a5a-6458-4b37-b0f0-d82e3f430117",
            category: "Dessert",
            source: "Grandma"
        },
        {id: "5305e4b7-82ff-4ff7-b267-d033174048c2",
            name: "bread",
            userId: "797e2a5a-6458-4b37-b0f0-d82e3f430117",
            category: "Side",
            source: "Mesopotamians"
        },
        {id: "02155b98-2022-482c-b6ee-20f0e3d2b58d",
            name: "pancakes",
            userId: "f620415e-7fa8-4d3c-8a43-a0a30e6706b2",
            category: "Breakfast",
            source: "IHOP"
        },
        {
            id: "5997052e-028c-41c4-b2e2-5616f5b7854b",
            name: "chickie nuggies",
            userId: "f620415e-7fa8-4d3c-8a43-a0a30e6706b2",
            category: "Dinner",
            source: "McDonalds"
        },
        {
            id: "df680068-70b9-4b0f-a2cc-f20bc1a62599",
            name: "saucy nugs",
            userId: "f620415e-7fa8-4d3c-8a43-a0a30e6706b2",
            category: "Lunch",
            source: "McDonalds"
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

/*
dummy recipe
{
	"name": "Spaghetti",
	"category": "dinner",
	"source": "My Brain",
	"ingredients": [
		{"amount": "1 cup", "name": "noodle"},
  	{"amount": "2 cups", "name": "sauce"},
  	{"amount": "0.5 cups", "name": "water"},
		{"amount": "1 tbs", "name": "salt"},
		{"amount": "0.5 lbs", "name": "ground beef or sausage"},
		{"amount": "1-2 clove", "name": "garlic"},
		{"amount": "2 cups", "name": "pasta sauce"},
		{"amount": "1 cup", "name": "reserved noodle water"}
	],
	"instructions":[
		{"stepNum": "1", "name":"Bring pot of salted water to boil"},
		{"stepNum": "2", "name":"cook noodles al dente(9-11min)"},
		{"stepNum": "3", "name":"While noodles cook, brown meat in pan"},
		{"stepNum": "4", "name":"mince garlic while everything else cooks"},
		{"stepNum": "5", "name":"once noodles and meat are done, add garlic and pasta sauce to meat and cook 3-4 until sauce reduces slightly"},
		{"stepNum": "6", "name":"drain noodles and add to the other ingredients"},
		{"stepNum": "7", "name":"mix thoroughly until noodles are covered in sauce, adding 1/4 cup at a time of reserved noodle water as needed"},
		{"stepNum": "8", "name":"eat, yumm!"}
	]
}
 */