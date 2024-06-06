class Table {
    constructor(props) {
      this.ID = props.ID;
      this.name = props.name;
      this.date = props.date;
      this.starred = props.starred;
      this.assignment = props.assignment;
    }
  
    getId() {
      return this.ID;
    }
  
    getName() {
      return this.name;
    }
  
    getDate() {
      return this.date;
    }
  
    getStarred() {
      return this.starred;
    }

    getAssignment() {
        return this.assignment;
    }

  }
  
  export default Table;