export const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds


export const getDays =(startDate, endDate)=>{
    const firstDate = new Date(startDate);
    const secondDate = new Date(endDate);
    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
    return diffDays>0?diffDays:1;
}

export const getLastWeek = (startDate) =>{
    var lastWeek = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() - 7);
    return lastWeek;
}

export const getLastMonth = (startDate) =>{
    var lastMonth = new Date(startDate.getFullYear(), startDate.getMonth()-1, startDate.getDate());
    return lastMonth;
}

export const getLastYear = (startDate) =>{
    var lastYear = new Date(startDate.getFullYear()-1, startDate.getMonth(), startDate.getDate());
    return lastYear;
}
