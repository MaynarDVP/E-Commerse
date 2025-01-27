import { ILoginForm } from "@/Interfaces/ILoginForm";
import { IRegisterForm } from "@/Interfaces/IRegisterForm";


const ValidateLogingForm = (input: ILoginForm) => {
  const errors: ILoginForm = {
    email: "",
    password: "",
  };

  if (!input.email) {
    errors.email = "Email is required.";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(input.email)) {
      errors.email = "Email must be valid.";
    }
  }

  if (!input.password) {
    errors.password = "Password is required.";
  }

  return errors;
};
const ValidateRegister = (input: IRegisterForm) => {
  const errors:  IRegisterForm = {
    name: "",
    email: "",
    address: "",
    password: "",
    phone: "",
  };


  // Name validation
  if (!input.name) {
    errors.name = "Name is required.";
  } else if (input.name.length < 3) {
    errors.name = "Name must contain at least 3 characters.";
  } else if (input.name.length > 25) {
    errors.name = "Name cannot be more than 25 characters.";
  }

  // Email validation
  if (!input.email) {
    errors.email = "Email is required.";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(input.email)) {
      errors.email = "Email must be a valid email address.";
    }
  }

  // Password validation
  if (!input.password) {
    errors.password = "Password is required.";
  } else if (!/^[A-Za-z0-9]+$/.test(input.password)) {
    errors.password = "Password must only contain letters and numbers.";
  } else if (input.password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  }

  // Address validation
  if (!input.address) {
    errors.address = "Address is required.";
  } else if (input.address.length < 5) {
    errors.address = "Address must be at least 5 characters.";
  } else if (input.address.length > 100) {
    errors.address = "Address cannot be more than 100 characters.";
  }

  // Phone validation
  
  
  if (!input.phone) {
    errors.phone = "Phone number is required.";
  } else {
    const phoneRegex = /^[0-9]{10,15}$/; 
    if (!phoneRegex.test(input.phone)) {
      errors.phone = "Phone number must be between 10 and 15 digits.";
    }
  }

  return errors;
};

export { ValidateLogingForm, ValidateRegister };

