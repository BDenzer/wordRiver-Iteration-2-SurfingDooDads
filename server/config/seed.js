/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Student = require('../api/student/student.model.js');

User.find({}).remove(function() {
  User.create(
    {
      "name": "Maryann Emerson",
      "email": "maryannemerson@puria.com",
      "role": {
        "type": "user"
      },
      "password": "deserunt",
      "provider": "local",
     /* "contextPacks": [{
        "contextName": "verbs",
        "contents":[
          {id: 1},
          //{id: 2},
          //{id: 3},
          //{id: 4},
          {id: 5}
        ]
      },
        {
          "contextName": "animals",
          "contents":[
            {id: 6},
            //{id: 7},
            //{id: 8},
            //{id: 9},
            {id: 10}
          ]
        },
        {
          "contextName": "dinosaurs",
          "contents":[
            {id: 11},
           // {id: 12},
           // {id: 13},
            //{id: 14},
            {id: 15}
          ]
        }]*/

      tileTags: [
        {
        tagName: "Verbs",
        tagType: "WordType",
          "_id" : "5511a5963b3e4c433b21f8e1"
      },
        {
          tagName: "Dinosaur",
          tagType: "Context",
          "_id" : "5511a5963b3e4c433b21f8e0"
        }
      ],

      "tileBucket": [
        {"wordName": "run",
          "tileTags": ["5511a5963b3e4c433b21f8e1", "5511a5963b3e4c433b21f8e0"],
          "_id" : "5511a62046b5a58e3b0271f7"
          //"wordType": "verb",
        },
        {"wordName": "walk",
          "tileTags": ["5511a5963b3e4c433b21f8e1"],
          "_id" : "5511a62046b5a58e3b0271f6"
        },
        {"wordName": "jump",
          "tileTags": ["5511a5963b3e4c433b21f8e1"],
          "_id" : "5511a62046b5a58e3b0271f5"
        },
        //{"wordName": "swim",
        //  "wordType": "noun",
        //  id: 4},
        //{"wordName": "throw",
        //  "wordType": "noun",
        //  id: 5
        //},
        //{"wordName": "dog",
        //  "wordType": "noun",
        //  id: 6
        //},
        //{"wordName": "cat",
        //  "wordType": "noun",
        //  id: 7},
        //{"wordName": "bird",
        //  "wordType": "noun",
        //  id: 8
        //},
        //{"wordName": "fish",
        //  "wordType": "noun",
        //  id: 9
        //},
        //{"wordName": "ferret",
        //  "wordType": "noun",
        //  id: 10},
        //{"wordName": "t-rex",
        //  "wordType": "noun",
        //  id: 11
        //},
        //{"wordName": "velociraptor",
        //  "wordType": "noun",
        //  id: 12
        //},
        {"wordName": "dinosaur",
          "tileTags": ["5511a5963b3e4c433b21f8e0"],
          "_id" : "5511a62046b5a58e3b0271f4",
          img: "http://upload.wikimedia.org/wikipedia/en/d/d7/Walking_with_Dinosaurs_Gorgosaurus.jpg"
        },
        {"wordName": "big",
          "tileTags": ["5511a5963b3e4c433b21f8e0"],
          "_id" : "5511a62046b5a58e3b0271f3"
        },
        {"wordName": "Steven Spielberg",
          "tileTags": ["5511a5963b3e4c433b21f8e0"],
          "_id" : "5511a62046b5a58e3b0271f2",
          img: "http://i3.mirror.co.uk/incoming/article1894860.ece/ALTERNATES/s615/Steven-Spielberg.jpg"
        }
      ],

      "studentList": [
        "551072458e97142166a71951",
        "551072458e97142166a71952",
        "551072458e97142166a71954"
      ],

      "studentGroups": [
        {
          "groupName": "Classroom",
          contextPacks: [""],
          "students": [
            "551072458e97142166a71951",
           // {id: 2},
           // {id: 3},
           // {id: 4},
            "551072458e97142166a71954"
          ]
        },
        {
          "groupName": "Kids that like dinosaurs",
          contextPacks: ["5511a5963b3e4c433b21f8e0"],
          "students": [
            "551072458e97142166a71951",
            "551072458e97142166a71952"
           // {id: 3},
            //{id: 4}
          ]
        }
      ]
    }
    /*,{
      "name": "Lavonne Cochran",
      "email": "lavonnecochran@puria.com",
      "role": {
        "type": "user"
      },
      "password": "nisi",
      "provider": "local",
      contextPacks: [{
        contextName: "Verbs/Actions",
        contents:[
          {wordName: "run",
            wordType: "verb",
            wordColor: "green"},
          {wordName: "jump",
            wordType: "verb",
            wordColor: "green"},
          {wordName: "walk",
            wordType: "verb",
            wordColor: "green"},
          {wordName: "talk",
            wordType: "verb",
            wordColor: "green"},
          {wordName: "swim",
            wordType: "verb",
            wordColor: "green"},
          {wordName: "talk",
            wordType: "verb",
            wordColor: "green"},
          {wordName: "climb",
            wordType: "verb",
            wordColor: "green"}
        ]},
        {
          contextName: "Animals",
          contents:[
            {wordName: "Cat",
              wordType: "noun",
              wordColor: "green"},
            {wordName: "Dog",
              wordType: "noun",
              wordColor: "blue"},
            {wordName: "Zebra",
              wordType: "noun",
              wordColor: "blue"},
            {wordName: "Llama",
              wordType: "noun",
              wordColor: "green"},
            {wordName: "Horse",
              wordType: "noun",
              wordColor: "green"},
            {wordName: "Bird",
              wordType: "noun",
              wordColor: "green"},
            {wordName: "Lizard",
              wordType: "noun",
              wordColor: "green"}
          ]

        }
      ],
      "tileBucket": [
          {"wordName": "run",
            "wordType": "verb",
            "wordColor": "blue"},
          {"wordName": "jump",
            "wordType": "verb",
            "wordColor": "blue"},
          {"wordName": "walk",
            "wordType": "verb",
            "wordColor": "blue"}
      ],

      "studentGroups": [
        {
          "groupName": "aliquip",
          "students": [
            {
              "name": "Banks"
            },
            {
              "name": "Wiley"
            },
            {
              "name": "Juliana"
            },
            {
              "name": "Allen"
            },
            {
              "name": "Mayo"
            },
            {
              "name": "Keller"
            }
          ]
        },
        {
          "groupName": "anim",
          "students": [
            {
              "name": "Cochran"
            },
            {
              "name": "Vasquez"
            },
            {
              "name": "Rose"
            },
            {
              "name": "Lynne"
            },
            {
              "name": "Castillo"
            },
            {
              "name": "Lora"
            }
          ]
        },
        {
          "groupName": "do",
          "students": [
            {
              "name": "Angelica"
            },
            {
              "name": "Slater"
            },
            {
              "name": "Mays"
            },
            {
              "name": "Jean"
            },
            {
              "name": "Mcknight"
            },
            {
              "name": "Mckee"
            }
          ]
        },
        {
          "groupName": "officia",
          "students": [
            {
              "name": "Stafford"
            },
            {
              "name": "Bishop"
            },
            {
              "name": "Liliana"
            },
            {
              "name": "Lloyd"
            },
            {
              "name": "Beasley"
            },
            {
              "name": "Peggy"
            }
          ]
        },
        {
          "groupName": "exercitation",
          "students": [
            {
              "name": "Erickson"
            },
            {
              "name": "Tracie"
            },
            {
              "name": "Leila"
            },
            {
              "name": "Lacy"
            },
            {
              "name": "Jolene"
            },
            {
              "name": "Chen"
            },
            {
              "name": "Hammond"
            }
          ]
        },
        {
          "groupName": "ut",
          "students": [
            {
              "name": "Saunders"
            },
            {
              "name": "Geraldine"
            },
            {
              "name": "Bender"
            },
            {
              "name": "Cantrell"
            },
            {
              "name": "Miles"
            },
            {
              "name": "Gilliam"
            },
            {
              "name": "Mcfadden"
            }
          ]
        }
      ]
    },
    {
      "name": "Evelyn Mayer",
      "email": "evelynmayer@puria.com",
      "role": {
        "type": "user"
      },
      "password": "incididunt",
      "provider": "local",
      "contextPacks": [{
        "contextName": "Verbs",
        "contents":[
          {"wordName": "run",
            "wordType": "verb",
            "wordColor": "blue"},
          {"wordName": "jump",
            "wordType": "verb",
            "wordColor": "blue"},
          {"wordName": "walk",
            "wordType": "verb",
            "wordColor": "blue"}
        ]
      }],
      "tileBucket": [
        {"wordName": "run",
          "wordType": "verb",
          "wordColor": "blue"},
        {"wordName": "jump",
          "wordType": "verb",
          "wordColor": "blue"},
        {"wordName": "walk",
          "wordType": "verb",
          "wordColor": "blue"}
      ],
      "studentGroups": [
        {
          "groupName": "cillum",
          "students": [
            {
              "name": "Harrington"
            }
          ]
        }
      ]
    },
    {
      "name": "Bond Guerrero",
      "email": "bondguerrero@puria.com",
      "role": {
        "type": "user"
      },
      "password": "aliquip",
      "provider": "local",
      "contextPacks": [{
        "contextName": "Verbs",
        "contents":[
          {"wordName": "run",
            "wordType": "verb",
            "wordColor": "blue"},
          {"wordName": "jump",
            "wordType": "verb",
            "wordColor": "blue"},
          {"wordName": "walk",
            "wordType": "verb",
            "wordColor": "blue"}
        ]
      }],
      "tileBucket": [
        {"wordName": "run",
          "wordType": "verb",
          "wordColor": "blue"},
        {"wordName": "jump",
          "wordType": "verb",
          "wordColor": "blue"},
        {"wordName": "walk",
          "wordType": "verb",
          "wordColor": "blue"}
      ],
      "studentGroups": [
        {
          "groupName": "nostrud",
          "students": [
            {
              "name": "Vasquez"
            }
          ]
        }
      ]
    },
    {
      "name": "Ratliff Pitts",
      "email": "ratliffpitts@puria.com",
      "role": {
        "type": "user"
      },
      "password": "pariatur",
      "provider": "local",
      "contextPacks": [{
        "contextName": "Verbs",
        "contents":[
          {"wordName": "run",
            "wordType": "verb",
            "wordColor": "blue"},
          {"wordName": "jump",
            "wordType": "verb",
            "wordColor": "blue"},
          {"wordName": "walk",
            "wordType": "verb",
            "wordColor": "blue"}
        ]
      }],
      "tileBucket": [
        {"wordName": "run",
          "wordType": "verb",
          "wordColor": "blue"},
        {"wordName": "jump",
          "wordType": "verb",
          "wordColor": "blue"},
        {"wordName": "walk",
          "wordType": "verb",
          "wordColor": "blue"}
      ],
      "studentGroups": [
        {
          "groupName": "occaecat",
          "students": [
            {"contextPacks": [
        {
          "wordName": "labore",
          "wordType": "noun",
          "wordColor": "blue"
        }
      ],
              "name": "Good"
            }
          ]
        }
      ]
    },
    {
      "name": "Cathy Burris",
      "email": "cathyburris@puria.com",
      "role": {
        "type": "user"
      },
      "password": "irure",
      "provider": "local",
      "contextPacks": [{
        "contextName": "Verbs",
        "contents":[
          {"wordName": "run",
            "wordType": "verb",
            "wordColor": "blue"},
          {"wordName": "jump",
            "wordType": "verb",
            "wordColor": "blue"},
          {"wordName": "walk",
            "wordType": "verb",
            "wordColor": "blue"}
        ]
      }],
      "tileBucket": [
        {"wordName": "run",
          "wordType": "verb",
          "wordColor": "blue"},
        {"wordName": "jump",
          "wordType": "verb",
          "wordColor": "blue"},
        {"wordName": "walk",
          "wordType": "verb",
          "wordColor": "blue"}
      ],
      "studentGroups": [
        {
          "groupName": "id",
          "students": [
            {
              "name": "Kennedy"
            }
          ]
        }
      ]
    },
    {
      "name": "Mejia Mullen",
      "email": "mejiamullen@puria.com",
      "role": {
        "type": "user"
      },
      "password": "ad",
      "provider": "local",
      "contextPacks": [{
        "contextName": "Verbs",
        "contents":[
          {"wordName": "run",
            "wordType": "verb",
            "wordColor": "blue"},
          {"wordName": "jump",
            "wordType": "verb",
            "wordColor": "blue"},
          {"wordName": "walk",
            "wordType": "verb",
            "wordColor": "blue"}
        ]
      }],
      "tileBucket": [
        {"wordName": "run",
          "wordType": "verb",
          "wordColor": "blue"},
        {"wordName": "jump",
          "wordType": "verb",
          "wordColor": "blue"},
        {"wordName": "walk",
          "wordType": "verb",
          "wordColor": "blue"}
      ],
      "studentGroups": [
        {
          "groupName": "Lorem",
          "students": [
            {
              "name": "Mayer"
            }
          ]
        }
      ]
    }*/
  );
});

console.log("Test");
Student.find({}).remove(function() {
  Student.create(
    {
      "firstName": "Lizard",
      "lastName": "Pratt",
      "_id" : "551072458e97142166a71951"
    },
    {
      "firstName": "Battle",
      "lastName": "Whitaker",
      "_id" : "551072458e97142166a71952"
    },
    {
      "firstName": "Leanna",
      "lastName": "Garrison",
      "_id" : "551072458e97142166a71953"
    },
    {
      "firstName": "Sherman",
      "lastName": "Foster",
      "_id" : "551072458e97142166a71955"
    },
    {
      "firstName": "Cassie",
      "lastName": "Ramos",
      "_id" : "551072458e97142166a71954"
    }
    /*{
      "firstName": "Calderon",
      "lastName": "Daniel"
    },
    {
      "firstName": "Shanna",
      "lastName": "Boyle"
    }*/

  );
});

/*

 [
 '{{repeat(5, 7)}}',
 {
 name: '{{firstName()}} {{surname()}}',
 email: '{{email()}}',
 role: {
 type: 'user'
 },
 password: '{{lorem(1, "words")}}',
 provider: 'local',
 contextPacks: [{
 wordName: '{{lorem(1, "words")}}',
 wordType: 'noun',
 wordColor: 'blue'
 }],
 studentGroups: [
 {
 groupName: '{{lorem(1, "words")}}',
 students: [{
 name: '{{firstName()}}'
 }]
 }
 ]

 }
 ]*/

