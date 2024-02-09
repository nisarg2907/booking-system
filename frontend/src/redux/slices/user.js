// slices.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Auth Slice
const authInitialState = {
  user: null,
  isLoggedIn: false,

};

const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    loginRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    updateBookings: (state, action) => {
      state.user.bookings = action.payload;
    },
    registerRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    registerSuccess: (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user = action.payload;
      },
      registerFailure: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
  clearError,
  updateBookings,
  registerRequest, 
  registerSuccess,
  registerFailure
} = authSlice.actions;

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    const response = await axios.post("http://localhost:3001/api/user/login", {
      email,
      password,
    });
    console.log(response);
    console.log(response.data.user);
    dispatch(loginSuccess(response.data.user));
  } catch (error) {
    dispatch(loginFailure(error.message || "Login failed"));
  }
};



export const registerUser = (username, email, password) => async (dispatch) => {
    try {
      dispatch(registerRequest());
      console.log("Request initiated");
      const response = await axios.post("http://localhost:3001/api/user/register", {
        username,
        email,
        password,
      });
      console.log("Request completed");
      console.log(response);
      const token = response.data.token;
      localStorage.setItem("token", token);
      
      // Dispatch the new action for registering user successfully
      dispatch(registerSuccess(response.data.user));
    } catch (error) {
      console.error('Error during registration:', error);
     dispatch(registerFailure(error.message || "Registration failed"));
    }
  };






  
// Booking Slice
const bookingInitialState = {
  isLoading: false,
  error: null,
  bookingSuccess: false,
  bookings:[],
};


export const bookingSlice = createSlice({
  name: "booking",
  initialState: bookingInitialState,
  reducers: {
    bookRoomRequest: (state) => {
      state.isLoading = true;
      state.error = null;
      state.bookingSuccess = false;
    },
    bookRoomSuccess: (state) => {
      state.isLoading = false;
      state.bookingSuccess = true;
    },
    bookRoomFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    clearBookingError: (state) => {
      state.error = null;
    },
    clearBookingStatus: (state) => {
      state.bookingSuccess = false;
    },
    populateUserBookings:(state,action)=>{
      state.bookings = action.payload;
    }
  },
});

export const {
  bookRoomRequest,
  bookRoomSuccess,
  bookRoomFailure,
  clearBookingError,
  clearBookingStatus,
  populateUserBookings
} = bookingSlice.actions;

export const bookRoom = createAsyncThunk(
  "booking/bookRoom",
  async ({  user_id,room_id, start_time, end_time }, { dispatch }) => {
    try {
      dispatch(bookRoomRequest());
      console.log("booking req reached");
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3001/api/room/book-room",
        { user_id,room_id, start_time, end_time  },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("booking req done");
      console.log(response);
      dispatch(bookRoomSuccess());
      dispatch(updateBookings(response.data.room)); 
    } catch (error) {
      console.log(error.message , "Booking failed Room is already booked");
      dispatch(bookRoomFailure(error));
    }
  }
);


export const getUserRooms = createAsyncThunk("booking/userRooms",
 async({userId},{dispatch})=>{
  try{
    const token = localStorage.getItem("token");
    const userid=userId
    
    
    const response = await axios.get(
      `http://localhost:3001/api/user/bookings/${userid}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    console.log(response);
    dispatch(populateUserBookings(response.data.foundRooms))
  }catch(error){
    throw error.message || "Error Finding your Bookings";
  }
 }
)

// Export both reducers with unique names
export { authSlice, bookingSlice as bookingSliceReducer };
