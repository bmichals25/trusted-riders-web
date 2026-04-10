export type RideStatus =
  | "Scheduled"
  | "DriverEnRoute"
  | "PassengerPickedUp"
  | "InTransit"
  | "Arrived"
  | "Completed"
  | "Cancelled"
  | "NoShow";

export type DriverStatus = "Available" | "OnRide" | "OffDuty";
export type ChaperoneStatus = "Available" | "OnAssignment" | "OffDuty";
export type BackgroundCheckStatus = "Verified" | "Pending" | "Expired";

export interface Passenger {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  accessibilityNeeds: string[];
  medicalNotes: string;
}

export interface Vehicle {
  id: string;
  licensePlate: string;
  make: string;
  model: string;
  year: number;
  currentMileage: number;
  lastServiceDate: string;
  inspectionStatus: "Valid" | "Expired";
}

export interface Driver {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  licenseNumber: string;
  licenseExpiration: string;
  backgroundCheckStatus: BackgroundCheckStatus;
  backgroundCheckDate: string;
  medicalTransportCertified: boolean;
  firstAidCertified: boolean;
  firstAidExpirationDate: string | null;
  defensiveDrivingCertified: boolean;
  defensiveDrivingDate: string | null;
  vehicle: Vehicle;
  status: DriverStatus;
  hireDate: string;
  yearsOfService: number;
  totalRidesCompleted: number;
  onTimePercentage: number;
  averageRating: number | null;
  isActive: boolean;
  currentRideId: string | null;
}

export interface Chaperone {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  backgroundCheckStatus: BackgroundCheckStatus;
  backgroundCheckDate: string;
  medicalTransportCertified: boolean;
  medicalTransportExpiration: string | null;
  firstAidCertified: boolean;
  firstAidExpiration: string | null;
  cprCertified: boolean;
  cprExpiration: string | null;
  specializations: string[];
  status: ChaperoneStatus;
  hireDate: string;
  yearsOfService: number;
  totalAssignmentsCompleted: number;
  isActive: boolean;
  currentRideId: string | null;
}

export interface RideTimelineEvent {
  timestamp: string;
  status: RideStatus;
  note?: string;
  changedBy: string;
}

export interface Ride {
  id: string;
  confirmationNumber: string;
  passenger: Passenger;
  driver: Driver | null;
  chaperone: Chaperone | null;
  pickupTime: string;
  estimatedArrivalTime: string;
  actualPickupTime: string | null;
  actualArrivalTime: string | null;
  status: RideStatus;
  pickupAddress: string;
  dropoffAddress: string;
  estimatedDistance: number;
  estimatedDuration: number;
  medicalNotes: string;
  specialInstructions: string;
  accessibilityNeeds: string[];
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  cancelledAt: string | null;
  cancelledBy: string | null;
  cancelReason: string | null;
  timeline: RideTimelineEvent[];
  notes: string[];
}
