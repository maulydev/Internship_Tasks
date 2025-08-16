export type Payload = { name: string; userId: string; role: string };

export type Meta = { id: number, name: string }

export type Employee = {
  id: string;
  empId: string;
  email: string;
  firstName: string;
  joinedDate: string;
  lastName: string;
  phone: string;
  salary: string;
  position: {
    id: string;
    name: string;
  } | null;
  department: {
    id: string;
    name: string;
  } | null;
  status?: string;
  createdAt: string;
};

export type FormData = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  salary: string;
  joinedDate: string;
  position: string;
  department: string;
};
