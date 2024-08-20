import Assignment from "../Assignment";

const assignments = new Map();



assignments.set(
  1,
  new Assignment({
    ID: 1,
    json: {1: [1, 10, 11, 2], 7: [1, 4, 9], 3: [2], 6: [3, 5, 7, 6], 9: [4, 9], 11: [5, 10, 11, 6], 5: [8], 8: [9, 6, 7], 10: [11, 10], 4: [7, 3, 8]}
    
  })
);

// assignments.set(
//   1,
//   new Assignment({
//     ID: 1,
//     professions: ["Doctor", "Engineer", "Teacher", "Nurse"],
//     shifts_list: [
//       {
//         ID: 1,
//         profession: "Doctor",
//         day: "Sunday",
//         startHour: "10:00",
//         endHour: "17:00",
//         idList: [],
//         color: false,
//       },
//       {
//         ID: 2,
//         profession: "Doctor",
//         day: "Sunday",
//         startHour: "14:00",
//         endHour: "17:00",
//         idList: [],
//         color: false,
//       },
//       {
//         ID: 3,
//         profession: "Doctor",
//         day: "Sunday",
//         startHour: "08:00",
//         endHour: "15:00",
//         idList: [],
//         color: false,
//       },
//       {
//         ID: 4,
//         profession: "Doctor",
//         day: "Tuesday",
//         startHour: "10:00",
//         endHour: "18:00",
//         idList: [],
//         color: false,
//       },
//       {
//         ID: 5,
//         profession: "Doctor",
//         day: "Tuesday",
//         startHour: "10:00",
//         endHour: "19:00",
//         idList: [],
//         color: false,
//       },
//       {
//         ID: 6,
//         profession: "Doctor",
//         day: "Tuesday",
//         startHour: "07:00",
//         endHour: "08:00",
//         idList: [],
//         color: false,
//       },
//       {
//         ID: 7,
//         profession: "Doctor",
//         day: "Wednesday",
//         startHour: "14:00",
//         endHour: "16:00",
//         idList: [],
//         color: false,
//       },
//       {
//         ID: 8,
//         profession: "Doctor",
//         day: "Thursday",
//         startHour: "13:00",
//         endHour: "16:00",
//         idList: [],
//         color: false,
//       },
//       {
//         ID: 9,
//         profession: "Doctor",
//         day: "Thursday",
//         startHour: "14:00",
//         endHour: "16:00",
//         idList: [],
//         color: false,
//       },
//       {
//         ID: 10,
//         profession: "Doctor",
//         day: "Thursday",
//         startHour: "14:00",
//         endHour: "17:00",
//         idList: [],
//         color: false,
//       },
//     ],
//     unselected_shiftsList: [
//       {
//         ID: 11,
//         profession: "Doctor",
//         day: "Monday",
//         startHour: "10:00",
//         endHour: "13:00",
//       },
//       {
//         ID: 12,
//         profession: "Doctor",
//         day: "Monday",
//         startHour: "14:00",
//         endHour: "16:00",
//       },
//       {
//         ID: 13,
//         profession: "Doctor",
//         day: "Wednesday",
//         startHour: "11:00",
//         endHour: "15:00",
//       },
//       {
//         ID: 14,
//         profession: "Doctor",
//         day: "Thursday",
//         startHour: "07:00",
//         endHour: "12:00",
//       },
//       {
//         ID: 15,
//         profession: "Doctor",
//         day: "Friday",
//         startHour: "08:00",
//         endHour: "18:00",
//       },
//       {
//         ID: 16,
//         profession: "Teacher",
//         day: "Friday",
//         startHour: "08:00",
//         endHour: "10:00",
//       },
//     ],
//   })
// );


// assignments.set(
//   2,
//   new Assignment({
//     ID: 2,
//     professions: ["Doctor", "Engineer", "Teacher", "Nurse"],
//     shifts_list: [
//       {
//         ID: 17,
//         profession: "Doctor",
//         day: "Monday",
//         startHour: "10:00",
//         endHour: "13:00",
//         idList: [],
//         color: false,
//       },
//       {
//         ID: 18,
//         profession: "Doctor",
//         day: "Monday",
//         startHour: "14:00",
//         endHour: "16:00",
//         idList: [],
//         color: false,
//       },
//       {
//         ID: 19,
//         profession: "Doctor",
//         day: "Friday",
//         startHour: "08:00",
//         endHour: "18:00",
//         idList: [],
//         color: false,
//       },
//       {
//         ID: 20,
//         profession: "Teacher",
//         day: "Friday",
//         startHour: "08:00",
//         endHour: "10:00",
//         idList: [],
//         color: false,
//       },
//       {
//         ID: 21,
//         profession: "Engineer",
//         day: "Monday",
//         startHour: "09:00",
//         endHour: "12:00",
//         idList: [],
//         color: false,
//       },
//       {
//         ID: 22,
//         profession: "Engineer",
//         day: "Tuesday",
//         startHour: "10:00",
//         endHour: "13:00",
//         idList: [],
//         color: false,
//       },
//       {
//         ID: 23,
//         profession: "Nurse",
//         day: "Monday",
//         startHour: "08:00",
//         endHour: "14:00",
//         idList: [],
//         color: false,
//       },
//       {
//         ID: 24,
//         profession: "Nurse",
//         day: "Thursday",
//         startHour: "09:00",
//         endHour: "16:00",
//         idList: [],
//         color: false,
//       },
//       {
//         ID: 25,
//         profession: "Nurse",
//         day: "Friday",
//         startHour: "10:00",
//         endHour: "18:00",
//         idList: [],
//         color: false,
//       },
//       {
//         ID: 26,
//         profession: "Nurse",
//         day: "Tuesday",
//         startHour: "13:00",
//         endHour: "19:00",
//         idList: [],
//         color: false,
//       },
//       {
//         ID: 27,
//         profession: "Teacher",
//         day: "Friday",
//         startHour: "12:00",
//         endHour: "15:00",
//         idList: [],
//         color: false,
//       },
//       {
//         ID: 28,
//         profession: "Teacher",
//         day: "Monday",
//         startHour: "07:00",
//         endHour: "12:00",
//         idList: [],
//         color: false,
//       },
//       {
//         ID: 29,
//         profession: "Teacher",
//         day: "Tuesday",
//         startHour: "09:00",
//         endHour: "11:00",
//         idList: [],
//         color: false,
//       },
//       {
//         ID: 30,
//         profession: "Teacher",
//         day: "Wednesday",
//         startHour: "10:00",
//         endHour: "13:00",
//         idList: [],
//         color: false,
//       },
//     ],
//     unselected_shiftsList: [
//       {
//         ID: 31,
//         profession: "Teacher",
//         day: "Thursday",
//         startHour: "14:00",
//         endHour: "17:00",
//       },
//       {
//         ID: 32,
//         profession: "Nurse",
//         day: "Wednesday",
//         startHour: "07:00",
//         endHour: "12:00",
//       },
//       {
//         ID: 33,
//         profession: "Engineer",
//         day: "Wednesday",
//         startHour: "14:00",
//         endHour: "17:00",
//       },
//       {
//         ID: 34,
//         profession: "Engineer",
//         day: "Thursday",
//         startHour: "11:00",
//         endHour: "15:00",
//       },
//       {
//         ID: 35,
//         profession: "Engineer",
//         day: "Friday",
//         startHour: "12:00",
//         endHour: "20:00",
//       },
//       {
//         ID: 36,
//         profession: "Doctor",
//         day: "Wednesday",
//         startHour: "11:00",
//         endHour: "15:00",
//       },
//       {
//         ID: 37,
//         profession: "Doctor",
//         day: "Thursday",
//         startHour: "07:00",
//         endHour: "12:00",
//       },
//     ],
//   })
// );

export default assignments;
