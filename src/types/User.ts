export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase?: string;
    bs?: string;
  };
}

// For form values, we might want a flattened structure or handle nested company object
export interface UserFormValues {
  name: string;
  email: string;
  phone: string;
  website: string;
  companyName: string; // We will map this to company.name
}
