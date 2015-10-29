var utils = {
  /**
   * 時間轉換成完整時間格式
   * hhmm -> hh:mm.
   * 
   * @param timeString the time string
   * @return {string}
  */
  formatTime : function(timeString) {
    if (timeString.length < 3) {
      return timeString;
    }
    if (timeString.length == 3) {
      return timeString.substring(0, 1) + ":" + timeString.substring(1, 3);
    } else {
      return timeString.substring(0, 2) + ":" + timeString.substring(2, 4);
    }
  },

  /**
   * 轉換日期格式
   * yyyy-MM-dd -> yyyyMMdd
   * 
   * @param dateString the date string
   * @return {string}
   */
  formatDateNumOnly : function(dateString) {
    dateString = dateString.split('-');
    return dateString[0] + dateString[1] + dateString[2];
  },

  /**
   * 轉換日期格式
   * yyyyMMdd -> yyyy-MM-dd
   * 
   * @param dateString the date string
   * @return {string}
   */
  formatDateHyphen : function(dateString) {
    if (dateString.length == 8) {
      return dateString.substring(0, 4) + "-" + dateString.substring(4, 6) + '-' + dateString.substring(6, 8);
    } else {
      return dateString;
    }
  },

  /**
   * 轉換日期格式
   * yyyyMMdd -> yyyy/MM/dd
   * 
   * @param dateString the date string
   * @return {string}
   */
  formatDateSlash : function(dateString) {
    if (dateString.length == 8) {
      return dateString.substring(0, 4) + "/" + dateString.substring(4, 6) + '/' + dateString.substring(6, 8);
    } else {
      return dateString;
    }
  },

  /**
   * 轉換日期格式
   * yyyyMMdd -> MM/dd
   * 
   * @param dateString the date string
   * @return {string}
   */
  formatDateSlashShort : function(dateString) {
    if (dateString.length == 8) {
      return dateString.substring(4, 6) + '/' + dateString.substring(6, 8);
    } else {
      return dateString;
    }
  },

  /**
   * 時間轉換成有星期的格式
   * yyyyMMdd -> MM/dd(E)
   * 
   * @param timeString the time string
   * @return {string}
  */
  formatDateWeek : function(timeString) {
    var gsDayNames,d,dayName,timeString1 = "", timeString2 ="";
    gsDayNames = new Array('日','一','二','三','四','五','六');
    //yyyyMMdd -> yyyy/MM/dd Date: slash 支援IE8
    timeString1 = formatDateSlash(timeString);
    d = new Date(timeString1);
    dayName = gsDayNames[d.getDay()];
    // yyyyMMdd -> MM/dd
    timeString2 = formatDateSlashShort(timeString);
    return timeString2 + '(' + dayName + ')';
  },

  /**
   * 檢查字串是否為空
   * 
   * @param string
   * @return {boolean}
   */
  isBlank : function(str) {
    return (!str || /^\s*$/.test(str));
  }

};

module.exports = utils;