class Assignment {
    constructor(props) {
      this.ID = props.ID;
      this.professions = props.professions;
      this.shifts_list = props.shifts_list;
      this.unselected_shiftsList = props.unselected_shiftsList;
    }

      getId() {
        return this.ID;
      }
    
      getName() {
        return this.professions;
      }
    
      getDate() {
        return this.shifts_list;
      }
    
      getStarred() {
        return this.unselected_shiftsList;
      }
  
  
    }
    
    export default Assignment;