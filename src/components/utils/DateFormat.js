import moment from 'moment'

export const DateFormat=(date)=>{
  
  let newdate=moment(date)
  
   return (newdate.format('DD/MM/YYYY')) 
}