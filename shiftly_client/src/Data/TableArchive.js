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
    assignment: [1],
  })
);

tables_map.set(
  112,
  new Table({
    ID: 112,
    name: "week 14",
    date: "08/01/2024",
    starred: false,
    assignment: [],
  })
);

tables_map.set(
  113,
  new Table({
    ID: 113,
    name: "sdsd",
    date: "15/01/2024",
    starred: false,
    assignment: [],
  })
);

tables_map.set(
  211,
  new Table({
    ID: 211,
    name: "week 19",
    date: "28/01/2024",
    starred: true,
    assignment: [2],
  })
);

tables_map.set(
  212,
  new Table({
    ID: 212,
    name: "week 30",
    date: "20/03/2024",
    starred: false,
    assignment: [],
  })
);

tables_map.set(
  311,
  new Table({
    ID: 311,
    name: "a",
    date: "27/03/2024",
    starred: true,
    assignment: [],
  })
);

tables_map.set(
  312,
  new Table({
    ID: 312,
    name: "aaaaaaabb",
    date: "29/03/2024",
    starred: false,
    assignment: [],
  })
);

export default tables_map;
