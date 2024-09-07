interface EnDateParser {
     converEnDateToFaDate(): Date
}

interface FaDateParser {
     converFaDateToEnDate(date: Date): Date
}

export class EnDateParserConcrete implements EnDateParser {
     moment = require("jalali-moment");
     date: string;
     constructor(date: string) {
          this.date = date;
     }
     setDate(date: string) {
          this.date = date;
     }
     converEnDateToFaDate(): Date {
          var moment = require("jalali-moment");
          return moment(this.date, "YYYY/MM/DD").locale("fa").format("YYYY/MM/DD");
     }
}

export class FaDateParserConccrete implements FaDateParser {
     moment = require("jalali-moment");
     date: Date;
     constructor(date: Date) {
          this.date = date;
     }
     setDate(date: Date) {
          this.date = date;
     }
     converFaDateToEnDate = () => {
          var moment = require("jalali-moment");
          let x = moment.from(this.date, "fa", "YYYY/M/D");
          return new Date(x);
     };
}