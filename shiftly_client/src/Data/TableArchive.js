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
    professions: ["Doctor", "Teacher", "Engineer", "Nurse"],
    shifts:[
      {
          "ID": 1,
          "profession": "Doctor",
          "day": "Sunday",
          "start_hour": "16:00",
          "end_hour": "21:00",
          "cost": 80,
          "idList": [],
          "color": false
      },
      {
          "ID": 2,
          "profession": "Doctor",
          "day": "Sunday",
          "start_hour": "10:00",
          "end_hour": "15:00",
          "cost": 80,
          "idList": [],
          "color": false
      },
      {
          "ID": 3,
          "profession": "Doctor",
          "day": "Sunday",
          "start_hour": "08:00",
          "end_hour": "11:00",
          "cost": 60,
          "idList": [],
          "color": false
      },
      {
          "ID": 4,
          "profession": "Doctor",
          "day": "Sunday",
          "start_hour": "12:00",
          "end_hour": "15:00",
          "cost": 60,
          "idList": [],
          "color": false
      },
      {
          "ID": 5,
          "profession": "Doctor",
          "day": "Monday",
          "start_hour": "09:00",
          "end_hour": "14:00",
          "cost": 80,
          "idList": [],
          "color": false
      },
      {
          "ID": 6,
          "profession": "Doctor",
          "day": "Monday",
          "start_hour": "14:00",
          "end_hour": "17:00",
          "cost": 60,
          "idList": [],
          "color": false
      },
      {
          "ID": 7,
          "profession": "Doctor",
          "day": "Monday",
          "start_hour": "16:00",
          "end_hour": "19:00",
          "cost": 60,
          "idList": [],
          "color": false
      },
      {
          "ID": 8,
          "profession": "Doctor",
          "day": "Monday",
          "start_hour": "10:00",
          "end_hour": "13:00",
          "cost": 60,
          "idList": [],
          "color": false
      },
      {
          "ID": 10,
          "profession": "Doctor",
          "day": "Tuesday",
          "start_hour": "14:00",
          "end_hour": "19:00",
          "cost": 80,
          "idList": [],
          "color": false
      },
      {
          "ID": 11,
          "profession": "Doctor",
          "day": "Tuesday",
          "start_hour": "15:00",
          "end_hour": "18:00",
          "cost": 60,
          "idList": [],
          "color": false
      },
      {
          "ID": 12,
          "profession": "Doctor",
          "day": "Tuesday",
          "start_hour": "14:00",
          "end_hour": "17:00",
          "cost": 60,
          "idList": [],
          "color": false
      },
      {
          "ID": 13,
          "profession": "Doctor",
          "day": "Wednesday",
          "start_hour": "14:00",
          "end_hour": "19:00",
          "cost": 80,
          "idList": [],
          "color": false
      },
      {
          "ID": 14,
          "profession": "Doctor",
          "day": "Wednesday",
          "start_hour": "09:00",
          "end_hour": "12:00",
          "cost": 60,
          "idList": [],
          "color": false
      },
      {
          "ID": 15,
          "profession": "Doctor",
          "day": "Wednesday",
          "start_hour": "12:00",
          "end_hour": "17:00",
          "cost": 80,
          "idList": [],
          "color": false
      },
      {
          "ID": 16,
          "profession": "Doctor",
          "day": "Wednesday",
          "start_hour": "11:00",
          "end_hour": "14:00",
          "cost": 60,
          "idList": [],
          "color": false
      },
      {
          "ID": 17,
          "profession": "Doctor",
          "day": "Thursday",
          "start_hour": "14:00",
          "end_hour": "17:00",
          "cost": 60,
          "idList": [],
          "color": false
      },
      {
          "ID": 18,
          "profession": "Doctor",
          "day": "Thursday",
          "start_hour": "09:00",
          "end_hour": "14:00",
          "cost": 80,
          "idList": [],
          "color": false
      },
      {
          "ID": 19,
          "profession": "Doctor",
          "day": "Thursday",
          "start_hour": "09:00",
          "end_hour": "12:00",
          "cost": 60,
          "idList": [],
          "color": false
      },
      {
          "ID": 20,
          "profession": "Doctor",
          "day": "Thursday",
          "start_hour": "10:00",
          "end_hour": "15:00",
          "cost": 80,
          "idList": [],
          "color": false
      },
      {
          "ID": 21,
          "profession": "Doctor",
          "day": "Friday",
          "start_hour": "08:00",
          "end_hour": "13:00",
          "cost": 80,
          "idList": [],
          "color": false
      },
      {
          "ID": 22,
          "profession": "Doctor",
          "day": "Friday",
          "start_hour": "10:00",
          "end_hour": "15:00",
          "cost": 80,
          "idList": [],
          "color": false
      },
      {
          "ID": 23,
          "profession": "Doctor",
          "day": "Friday",
          "start_hour": "14:00",
          "end_hour": "17:00",
          "cost": 60,
          "idList": [],
          "color": false
      },
      {
          "ID": 24,
          "profession": "Doctor",
          "day": "Friday",
          "start_hour": "08:00",
          "end_hour": "11:00",
          "cost": 60,
          "idList": [],
          "color": false
      },
      {
          "ID": 25,
          "profession": "Teacher",
          "day": "Sunday",
          "start_hour": "10:00",
          "end_hour": "13:00",
          "cost": 60,
          "idList": [],
          "color": false
      },
      {
          "ID": 26,
          "profession": "Teacher",
          "day": "Sunday",
          "start_hour": "08:00",
          "end_hour": "13:00",
          "cost": 80,
          "idList": [],
          "color": false
      },
      {
          "ID": 27,
          "profession": "Teacher",
          "day": "Sunday",
          "start_hour": "11:00",
          "end_hour": "14:00",
          "cost": 60,
          "idList": [],
          "color": false
      },
      {
          "ID": 28,
          "profession": "Teacher",
          "day": "Sunday",
          "start_hour": "14:00",
          "end_hour": "17:00",
          "cost": 60,
          "idList": [],
          "color": false
      },
      {
          "ID": 29,
          "profession": "Teacher",
          "day": "Monday",
          "start_hour": "08:00",
          "end_hour": "13:00",
          "cost": 80,
          "idList": [],
          "color": false
      },
      {
          "ID": 30,
          "profession": "Teacher",
          "day": "Monday",
          "start_hour": "07:00",
          "end_hour": "10:00",
          "cost": 60,
          "idList": [],
          "color": false
      },
      {
          "ID": 32,
          "profession": "Teacher",
          "day": "Monday",
          "start_hour": "16:00",
          "end_hour": "21:00",
          "cost": 80,
          "idList": [],
          "color": false
      },
      {
          "ID": 33,
          "profession": "Teacher",
          "day": "Tuesday",
          "start_hour": "07:00",
          "end_hour": "10:00",
          "cost": 60,
          "idList": [],
          "color": false
      },
      {
          "ID": 34,
          "profession": "Teacher",
          "day": "Tuesday",
          "start_hour": "08:00",
          "end_hour": "13:00",
          "cost": 80,
          "idList": [],
          "color": false
      },
      {
          "ID": 35,
          "profession": "Teacher",
          "day": "Tuesday",
          "start_hour": "12:00",
          "end_hour": "17:00",
          "cost": 80,
          "idList": [],
          "color": false
      },
      {
          "ID": 36,
          "profession": "Teacher",
          "day": "Tuesday",
          "start_hour": "10:00",
          "end_hour": "13:00",
          "cost": 60,
          "idList": [],
          "color": false
      },
      {
          "ID": 37,
          "profession": "Teacher",
          "day": "Wednesday",
          "start_hour": "07:00",
          "end_hour": "12:00",
          "cost": 80,
          "idList": [],
          "color": false
      },
      {
          "ID": 38,
          "profession": "Teacher",
          "day": "Wednesday",
          "start_hour": "12:00",
          "end_hour": "15:00",
          "cost": 60,
          "idList": [],
          "color": false
      },
      {
          "ID": 39,
          "profession": "Teacher",
          "day": "Wednesday",
          "start_hour": "10:00",
          "end_hour": "15:00",
          "cost": 80,
          "idList": [],
          "color": false
      },
      {
          "ID": 40,
          "profession": "Teacher",
          "day": "Wednesday",
          "start_hour": "12:00",
          "end_hour": "17:00",
          "cost": 80,
          "idList": [],
          "color": false
      },
      {
          "ID": 41,
          "profession": "Teacher",
          "day": "Thursday",
          "start_hour": "13:00",
          "end_hour": "16:00",
          "cost": 60,
          "idList": [],
          "color": false
      },
      {
          "ID": 42,
          "profession": "Teacher",
          "day": "Thursday",
          "start_hour": "11:00",
          "end_hour": "14:00",
          "cost": 60,
          "idList": [],
          "color": false
      },
      {
          "ID": 43,
          "profession": "Teacher",
          "day": "Thursday",
          "start_hour": "16:00",
          "end_hour": "21:00",
          "cost": 80,
          "idList": [],
          "color": false
      },
      {
          "ID": 44,
          "profession": "Teacher",
          "day": "Thursday",
          "start_hour": "09:00",
          "end_hour": "12:00",
          "cost": 60,
          "idList": [],
          "color": false
      },
      {
          "ID": 45,
          "profession": "Teacher",
          "day": "Friday",
          "start_hour": "14:00",
          "end_hour": "17:00",
          "cost": 60,
          "idList": [],
          "color": false
      },
      {
          "ID": 46,
          "profession": "Teacher",
          "day": "Friday",
          "start_hour": "11:00",
          "end_hour": "14:00",
          "cost": 60,
          "idList": [],
          "color": false
      },
      {
          "ID": 47,
          "profession": "Teacher",
          "day": "Friday",
          "start_hour": "10:00",
          "end_hour": "15:00",
          "cost": 80,
          "idList": [],
          "color": false
      },
      {
          "ID": 48,
          "profession": "Teacher",
          "day": "Friday",
          "start_hour": "10:00",
          "end_hour": "15:00",
          "cost": 80,
          "idList": [],
          "color": false
      },
      {
          "ID": 49,
          "profession": "Nurse",
          "day": "Sunday",
          "start_hour": "09:00",
          "end_hour": "12:00",
          "cost": 60,
          "idList": [],
          "color": false
      },
      {
          "ID": 50,
          "profession": "Nurse",
          "day": "Sunday",
          "start_hour": "11:00",
          "end_hour": "16:00",
          "cost": 80,
          "idList": [],
          "color": false
      },
      {
          "ID": 51,
          "profession": "Nurse",
          "day": "Sunday",
          "start_hour": "09:00",
          "end_hour": "12:00",
          "cost": 60,
          "idList": [],
          "color": false
      },
      {
          "ID": 52,
          "profession": "Nurse",
          "day": "Sunday",
          "start_hour": "08:00",
          "end_hour": "13:00",
          "cost": 80,
          "idList": [],
          "color": false
      },
      {
          "ID": 53,
          "profession": "Nurse",
          "day": "Monday",
          "start_hour": "10:00",
          "end_hour": "15:00",
          "cost": 80,
          "idList": [],
          "color": false
      },
      {
          "ID": 54,
          "profession": "Nurse",
          "day": "Monday",
          "start_hour": "15:00",
          "end_hour": "18:00",
          "cost": 60,
          "idList": [],
          "color": false
      },
      {
          "ID": 55,
          "profession": "Nurse",
          "day": "Monday",
          "start_hour": "10:00",
          "end_hour": "13:00",
          "cost": 60,
          "idList": [],
          "color": false
      },
      {
          "ID": 56,
          "profession": "Nurse",
          "day": "Monday",
          "start_hour": "08:00",
          "end_hour": "13:00",
          "cost": 80,
          "idList": [],
          "color": false
      },
      {
          "ID": 57,
          "profession": "Nurse",
          "day": "Tuesday",
          "start_hour": "13:00",
          "end_hour": "16:00",
          "cost": 60,
          "idList": [],
          "color": false
      },
      {
          "ID": 58,
          "profession": "Nurse",
          "day": "Tuesday",
          "start_hour": "13:00",
          "end_hour": "18:00",
          "cost": 80,
          "idList": [],
          "color": false
      },
      {
          "ID": 59,
          "profession": "Nurse",
          "day": "Tuesday",
          "start_hour": "14:00",
          "end_hour": "19:00",
          "cost": 80,
          "idList": [],
          "color": false
      },
      {
          "ID": 60,
          "profession": "Nurse",
          "day": "Tuesday",
          "start_hour": "09:00",
          "end_hour": "12:00",
          "cost": 60,
          "idList": [],
          "color": false
      },
      {
          "ID": 61,
          "profession": "Nurse",
          "day": "Wednesday",
          "start_hour": "08:00",
          "end_hour": "11:00",
          "cost": 60,
          "idList": [],
          "color": false
      },
      {
          "ID": 62,
          "profession": "Nurse",
          "day": "Wednesday",
          "start_hour": "07:00",
          "end_hour": "10:00",
          "cost": 60,
          "idList": [],
          "color": false
      },
      {
          "ID": 63,
          "profession": "Nurse",
          "day": "Wednesday",
          "start_hour": "14:00",
          "end_hour": "17:00",
          "cost": 60,
          "idList": [],
          "color": false
      },
      {
          "ID": 64,
          "profession": "Nurse",
          "day": "Wednesday",
          "start_hour": "16:00",
          "end_hour": "19:00",
          "cost": 60,
          "idList": [],
          "color": false
      },
      {
          "ID": 65,
          "profession": "Nurse",
          "day": "Thursday",
          "start_hour": "07:00",
          "end_hour": "10:00",
          "cost": 60,
          "idList": [],
          "color": false
      },
      {
          "ID": 66,
          "profession": "Nurse",
          "day": "Thursday",
          "start_hour": "16:00",
          "end_hour": "21:00",
          "cost": 80,
          "idList": [],
          "color": false
      },
      {
          "ID": 67,
          "profession": "Nurse",
          "day": "Thursday",
          "start_hour": "10:00",
          "end_hour": "15:00",
          "cost": 80,
          "idList": [],
          "color": false
      },
      {
          "ID": 68,
          "profession": "Nurse",
          "day": "Thursday",
          "start_hour": "07:00",
          "end_hour": "12:00",
          "cost": 80,
          "idList": [],
          "color": false
      },
      {
          "ID": 69,
          "profession": "Nurse",
          "day": "Friday",
          "start_hour": "11:00",
          "end_hour": "14:00",
          "cost": 60,
          "idList": [],
          "color": false
      },
      {
          "ID": 70,
          "profession": "Nurse",
          "day": "Friday",
          "start_hour": "16:00",
          "end_hour": "19:00",
          "cost": 60,
          "idList": [],
          "color": false
      },
      {
          "ID": 71,
          "profession": "Nurse",
          "day": "Friday",
          "start_hour": "09:00",
          "end_hour": "12:00",
          "cost": 60,
          "idList": [],
          "color": false
      },
      {
          "ID": 72,
          "profession": "Nurse",
          "day": "Friday",
          "start_hour": "10:00",
          "end_hour": "13:00",
          "cost": 60,
          "idList": [],
          "color": false
      },
      {
          "ID": 73,
          "profession": "Engineer",
          "day": "Sunday",
          "start_hour": "16:00",
          "end_hour": "19:00",
          "cost": 60,
          "idList": [],
          "color": false
      },
      {
          "ID": 74,
          "profession": "Engineer",
          "day": "Sunday",
          "start_hour": "16:00",
          "end_hour": "19:00",
          "cost": 60,
          "idList": [],
          "color": false
      },
      {
          "ID": 75,
          "profession": "Engineer",
          "day": "Sunday",
          "start_hour": "10:00",
          "end_hour": "15:00",
          "cost": 80,
          "idList": [],
          "color": false
      },
      {
          "ID": 76,
          "profession": "Engineer",
          "day": "Sunday",
          "start_hour": "11:00",
          "end_hour": "16:00",
          "cost": 80,
          "idList": [],
          "color": false
      },
      {
          "ID": 77,
          "profession": "Engineer",
          "day": "Monday",
          "start_hour": "16:00",
          "end_hour": "19:00",
          "cost": 60,
          "idList": [],
          "color": false
      },
      {
          "ID": 78,
          "profession": "Engineer",
          "day": "Monday",
          "start_hour": "12:00",
          "end_hour": "17:00",
          "cost": 80,
          "idList": [],
          "color": false
      },
      {
          "ID": 79,
          "profession": "Engineer",
          "day": "Monday",
          "start_hour": "15:00",
          "end_hour": "18:00",
          "cost": 60,
          "idList": [],
          "color": false
      },
      {
          "ID": 80,
          "profession": "Engineer",
          "day": "Monday",
          "start_hour": "07:00",
          "end_hour": "10:00",
          "cost": 60,
          "idList": [],
          "color": false
      },
      {
          "ID": 81,
          "profession": "Engineer",
          "day": "Tuesday",
          "start_hour": "12:00",
          "end_hour": "15:00",
          "cost": 60,
          "idList": [],
          "color": false
      },
      {
          "ID": 82,
          "profession": "Engineer",
          "day": "Tuesday",
          "start_hour": "13:00",
          "end_hour": "18:00",
          "cost": 80,
          "idList": [],
          "color": false
      },
      {
          "ID": 83,
          "profession": "Engineer",
          "day": "Tuesday",
          "start_hour": "15:00",
          "end_hour": "20:00",
          "cost": 80,
          "idList": [],
          "color": false
      },
      {
          "ID": 84,
          "profession": "Engineer",
          "day": "Tuesday",
          "start_hour": "11:00",
          "end_hour": "16:00",
          "cost": 80,
          "idList": [],
          "color": false
      },
      {
          "ID": 85,
          "profession": "Engineer",
          "day": "Wednesday",
          "start_hour": "07:00",
          "end_hour": "12:00",
          "cost": 80,
          "idList": [],
          "color": false
      },
      {
          "ID": 86,
          "profession": "Engineer",
          "day": "Wednesday",
          "start_hour": "07:00",
          "end_hour": "10:00",
          "cost": 60,
          "idList": [],
          "color": false
      },
      {
          "ID": 87,
          "profession": "Engineer",
          "day": "Wednesday",
          "start_hour": "07:00",
          "end_hour": "10:00",
          "cost": 60,
          "idList": [],
          "color": false
      },
      {
          "ID": 88,
          "profession": "Engineer",
          "day": "Wednesday",
          "start_hour": "07:00",
          "end_hour": "10:00",
          "cost": 60,
          "idList": [],
          "color": false
      },
      {
          "ID": 89,
          "profession": "Engineer",
          "day": "Thursday",
          "start_hour": "16:00",
          "end_hour": "21:00",
          "cost": 80,
          "idList": [],
          "color": false
      },
      {
          "ID": 90,
          "profession": "Engineer",
          "day": "Thursday",
          "start_hour": "08:00",
          "end_hour": "13:00",
          "cost": 80,
          "idList": [],
          "color": false
      },
      {
          "ID": 91,
          "profession": "Engineer",
          "day": "Thursday",
          "start_hour": "12:00",
          "end_hour": "17:00",
          "cost": 80,
          "idList": [],
          "color": false
      },
      {
          "ID": 92,
          "profession": "Engineer",
          "day": "Thursday",
          "start_hour": "10:00",
          "end_hour": "13:00",
          "cost": 60,
          "idList": [],
          "color": false
      },
      {
          "ID": 93,
          "profession": "Engineer",
          "day": "Friday",
          "start_hour": "14:00",
          "end_hour": "17:00",
          "cost": 60,
          "idList": [],
          "color": false
      },
      {
          "ID": 94,
          "profession": "Engineer",
          "day": "Friday",
          "start_hour": "08:00",
          "end_hour": "11:00",
          "cost": 60,
          "idList": [],
          "color": false
      },
      {
          "ID": 95,
          "profession": "Engineer",
          "day": "Friday",
          "start_hour": "11:00",
          "end_hour": "16:00",
          "cost": 80,
          "idList": [],
          "color": false
      },
      {
          "ID": 96,
          "profession": "Engineer",
          "day": "Friday",
          "start_hour": "11:00",
          "end_hour": "16:00",
          "cost": 80,
          "idList": [],
          "color": false
      }
  ],
  
    // {1: [1, 10, 11, 2], 7: [1, 4, 9], 3: [2], 6: [3, 5, 7, 6], 9: [4, 9], 11: [5, 10, 11, 6], 5: [8], 8: [9, 6, 7], 10: [11, 10], 4: [7, 3, 8]},
    assignment:  {1: [1, 10, 11, 13, 14, 15, 17, 19], 3: [1, 10, 11, 13, 14, 15, 19], 4: [1, 10, 11, 13, 14, 15, 19], 7: [1, 9, 10, 13, 14, 15, 17], 10: [10, 13, 14, 15, 17, 18, 19], 13: [7, 8, 9, 10, 13, 14, 19], 20: [11, 14], 21: [9, 10, 11, 14, 16, 17, 18, 19], 23: [9, 10, 11, 13, 14, 16, 17, 18], 26: [2], 28: [2, 4, 5, 6, 12], 29: [5, 6, 7, 9, 10, 14, 15, 16], 32: [0, 4, 5, 6, 7, 12, 16, 18], 34: [1, 2, 4, 6, 9, 14], 36: [5, 10, 15, 16, 18, 19], 37: [8, 9, 10, 14, 15, 17, 18], 38: [0, 4, 5, 6, 11, 12, 16], 40: [2], 42: [0, 1, 4, 5, 8, 12, 18], 43: [14], 45: [2, 4, 5, 8, 12, 15, 19], 52: [3, 4, 5, 6, 12, 17], 53: [1, 4, 13, 17, 18], 56: [0, 3, 12], 58: [0, 7, 12], 59: [1, 4, 5, 6, 8, 9, 16], 60: [0, 7, 8, 12, 13, 17], 61: [0, 4, 5, 6, 11, 12], 63: [3, 15, 17, 18], 64: [0, 4, 5, 6, 11, 12, 16], 65: [0, 1, 4, 5, 8, 12, 18], 66: [1, 3, 4, 5, 11, 15, 18], 68: [3, 15], 71: [0, 4], 72: [3, 5, 8, 12, 13, 15], 77: [3], 83: [2], 85: [3, 7, 13, 19], 86: [16], 87: [2], 89: [0, 2, 7, 8, 10, 12, 16, 19], 90: [2, 7, 10, 16, 19], 93: [0, 3], 94: [2]}

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
