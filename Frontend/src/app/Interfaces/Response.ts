export interface responseType{
  message: any | null
}
export interface myBookingTable {
  Boarding: string,
  Destination: string,
  Transport_No: string,
  Fare: string,
  Status: string,
  Booking_Time: string
}
export interface UserTable {
  user_id: string,
  username: string,
  password1: string,
  gender: string,
  role: string,
  altered_user: string,
  create_time: string,
  last_login: string,
  dob: string,
  status: string
}
