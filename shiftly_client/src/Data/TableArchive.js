import assignments from "./Assignments";
import Table from "../Tables";
const tables_map = new Map();

tables_map.set(
  111,
  new Table({
    ID: 111,
    name: "week 13",
    date: "01/01/2024",
    starred: true,
    professions: ["Doctor", "Teacher"],
    shifts:[
      // Doctor Shifts
      {
        ID: 1,
        profession: "Doctor",
        day: "Sunday",
        startHour: "08:00",
        endHour: "13:00",
        cost: 50,
        idList: [],
        color: false,
      },
      {
        ID: 2,
        profession: "Doctor",
        day: "Sunday",
        startHour: "13:00",
        endHour: "16:00",
        cost: 50,
        idList: [],
        color: false,
      },
      {
        ID: 3,
        profession: "Doctor",
        day: "Sunday",
        startHour: "16:00",
        endHour: "19:00",
        cost: 50,
        idList: [],
        color: false,
      },
      {
        ID: 4,
        profession: "Doctor",
        day: "Sunday",
        startHour: "19:00",
        endHour: "21:00",
        cost: 50,
        idList: [],
        color: false,
      },
      {
        ID: 5,
        profession: "Doctor",
        day: "Sunday",
        startHour: "09:00",
        endHour: "16:00",
        cost: 50,
        idList: [],
        color: false,
      },
      {
        ID: 6,
        profession: "Doctor",
        day: "Sunday",
        startHour: "12:00",
        endHour: "17:00",
        cost: 50,
        idList: [],
        color: false,
      },
      {
        ID: 7,
        profession: "Doctor",
        day: "Sunday",
        startHour: "15:00",
        endHour: "20:00",
        cost: 50,
        idList: [],
        color: false,
      },

      // Teacher Shifts
      {
        ID: 8,
        profession: "Teacher",
        day: "Sunday",
        startHour: "08:00",
        endHour: "10:00",
        cost: 50,
        idList: [],
        color: false,
      },
      {
        ID: 9,
        profession: "Teacher",
        day: "Sunday",
        startHour: "11:00",
        endHour: "14:00",
        cost: 50,
        idList: [],
        color: false,
      },
      {
        ID: 10,
        profession: "Teacher",
        day: "Sunday",
        startHour: "14:00",
        endHour: "16:00",
        cost: 50,
        idList: [],
        color: false,
      },
      {
        ID: 11,
        profession: "Teacher",
        day: "Sunday",
        startHour: "18:00",
        endHour: "22:00",
        cost: 50,
        idList: [],
        color: false,
      },
    ],   
    assignment: {1: [1, 10, 11, 2], 7: [1, 4, 9], 3: [2], 6: [3, 5, 7, 6], 9: [4, 9], 11: [5, 10, 11, 6], 5: [8], 8: [9, 6, 7], 10: [11, 10], 4: [7, 3, 8]},

  })
);

// tables_map.set(
//   112,
//   new Table({
//     ID: 112,
//     name: "week 14",
//     date: "08/01/2024",
//     starred: false,
//     assignment: null,
//   })
// );

// tables_map.set(
//   113,
//   new Table({
//     ID: 113,
//     name: "sdsd",
//     date: "15/01/2024",
//     starred: false,
//     assignment: null,
//   })
// );

// tables_map.set(
//   211,
//   new Table({
//     ID: 211,
//     name: "week 19",
//     date: "28/01/2024",
//     starred: true,
//     assignment: 2,
//   })
// );

// tables_map.set(
//   212,
//   new Table({
//     ID: 212,
//     name: "week 30",
//     date: "20/03/2024",
//     starred: false,
//     assignment: null,
//   })
// );

// tables_map.set(
//   311,
//   new Table({
//     ID: 311,
//     name: "a",
//     date: "27/03/2024",
//     starred: true,
//     assignment: null,
//   })
// );

// tables_map.set(
//   312,
//   new Table({
//     ID: 312,
//     name: "aaaaaaabb",
//     date: "29/03/2024",
//     starred: false,
//     assignment: null,
//   })
// );

export default tables_map;
