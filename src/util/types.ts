
export interface Formation {
  id: string;
  name: string;
  photo?: string;
  startDate: Date;
  endDate: Date;
  price: number;
  address: string;
  phone1: string;
  phone2?: string;
  numberOfDays?: number;
  numberOfHours?: number;
  numberOfSessions?: number;
  sessionDuration?: number;
  remarks?: string;
  isRegistrationAllowed?: boolean;
}
  
  export interface Collaboration {
    id: string;
    name: string;
    photo?: string;
    startDate: Date;
    endDate: Date;
    company: string;
    price: number;
    address: string;
    phone1: string;
    phone2?: string;
    numberOfDays?: number;
    numberOfHours?: number;
    numberOfSessions?: number;
    sessionDuration?: number;
    remarks?: string;
    isRegistrationAllowed?: boolean;
  }

  export interface Message {
    id: string;
    name: string;
    email: string;
    message: string;
    date?: Date;
    open: boolean;
  }

  export type UserInInscription = {
    firstName: string;
    lastName: string;
    birthDate: Date;
    phone: string;
    email: string;
    address?: string; // Optionnel
  };
  
  export type Inscription = {
    id: string;
    entityId: string;
    entityType: "formation" | "collaboration";
    dateInscription: Date;
    status: "pending" | "confirmed" | "cancelled";
    user: UserInInscription;
  };
  